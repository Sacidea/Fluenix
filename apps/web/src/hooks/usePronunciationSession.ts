import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useLevel } from '@/context/LevelContext'
import { useAuth, useUser } from '@clerk/nextjs'

export type Word = {
  id: string
  word: string
  category: string
  phonetic: string
}

export type PronunciationResult = {
  accuracy_score: number
  is_correct: boolean
  feedback: string
  tip: string
}

export function usePronunciationSession() {
  const { level: userLevel } = useLevel()
  const { getToken } = useAuth()
  const { user } = useUser()
  
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState<PronunciationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [supported, setSupported] = useState(true)
  
  const recognitionRef = useRef<any>(null)

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 20

  useEffect(() => {
    // Fetch Words
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pronunciation/words`)
      .then(res => {
        setWords(res.data)
        localStorage.setItem('fluenix_words_cache', JSON.stringify(res.data))
      })
      .catch(() => {
        const cached = localStorage.getItem('fluenix_words_cache')
        if (cached) setWords(JSON.parse(cached))
      })

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) setSupported(false)
    }
  }, [])

  const filteredWords = words.filter(w => selectedCategory === 'All' || w.category === selectedCategory)
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredWords.length / pageSize) || 1
  const paginatedWords = filteredWords.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  
  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  // Update currentIndex if category changes and current word is filtered out
  useEffect(() => {
    if (filteredWords.length > 0 && !filteredWords.find(w => w.id === words[currentIndex]?.id)) {
      const newIndex = words.findIndex(w => w.id === filteredWords[0].id)
      setCurrentIndex(newIndex >= 0 ? newIndex : 0)
    }
  }, [selectedCategory, filteredWords, words, currentIndex])

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)
    recognition.onresult = async (event: any) => {
      const heard = event.results[0][0].transcript
      setTranscript(heard)
      setListening(false)
      await analyzeResult(heard)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const analyzeResult = async (heard: string) => {
    if (!words[currentIndex]) return
    setLoading(true)
    setResult(null)
    try {
      // 1. Get AI Analysis
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/pronunciation/analyze`, {
        transcript: heard,
        target_word: words[currentIndex].word,
        level: userLevel
      })
      const raw = res.data.result
      const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsedResult = JSON.parse(clean)
      setResult(parsedResult)

      // 2. Save Session to Backend (if user is logged in)
      if (user) {
        const token = await getToken()
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sessions`,
          {
            userId: user.id,
            type: 'pronunciation',
            scenario: words[currentIndex].word, // Storing target word as scenario
            duration: 1, // Placeholder duration
            score: parsedResult.accuracy_score,
            feedback: { 
              feedback: parsedResult.feedback, 
              tip: parsedResult.tip,
              heard_transcript: heard 
            }
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
      }

    } catch (err) {
      console.error('Failed to analyze or save pronunciation session:', err)
    } finally {
      setLoading(false)
    }
  }

  const speakWord = () => {
    if (!words[currentIndex]) return
    
    // Chrome/Safari Quirk Fix: Cancel any stuck queue before speaking
    window.speechSynthesis.cancel()
    
    // Wrap in a tiny timeout to ensure the cancel operation completes 
    // before we queue the new utterance. This prevents race conditions.
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(words[currentIndex].word)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      
      // Try to explicitly set an English voice if loaded, improves reliability
      const voices = window.speechSynthesis.getVoices()
      const usVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en_US')
      if (usVoice) utterance.voice = usVoice

      // Assign to window so it doesn't get garbage collected mid-speech
      // (Another notorious Chrome bug where speech abruptly fails)
      ;(window as any)._fluenixActiveUtterance = utterance

      window.speechSynthesis.speak(utterance)
    }, 50)
  }

  const nextWord = () => {
    if (filteredWords.length === 0) return
    const currentFilteredIndex = filteredWords.findIndex(w => w.id === words[currentIndex]?.id)
    const nextFilteredIndex = (currentFilteredIndex + 1) % filteredWords.length
    
    // Check if the next word falls onto a different page
    const nextWordPage = Math.floor(nextFilteredIndex / pageSize) + 1
    if (nextWordPage !== currentPage) {
      setCurrentPage(nextWordPage)
    }

    const globalNextIndex = words.findIndex(w => w.id === filteredWords[nextFilteredIndex].id)
    setCurrentIndex(globalNextIndex >= 0 ? globalNextIndex : 0)
    resetSession()
  }

  const setWordByIndex = (index: number) => {
    setCurrentIndex(index)
    resetSession()
  }

  const resetSession = () => {
    setTranscript('')
    setResult(null)
  }

  // Derive categories from fetched words
  const categories = ['All', ...Array.from(new Set(words.map(w => w.category)))]

  return {
    words,
    filteredWords,
    paginatedWords,
    categories,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    totalPages,
    currentIndex,
    currentWord: words[currentIndex] || null,
    listening,
    transcript,
    result,
    loading,
    supported,
    startListening,
    stopListening,
    speakWord,
    nextWord,
    setWordByIndex
  }
}
