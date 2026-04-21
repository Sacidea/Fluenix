import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useLevel } from '@/context/LevelContext'

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
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState<PronunciationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [supported, setSupported] = useState(true)
  
  const recognitionRef = useRef<any>(null)

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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/pronunciation/analyze`, {
        transcript: heard,
        target_word: words[currentIndex].word,
        level: userLevel
      })
      const raw = res.data.result
      const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      setResult(JSON.parse(clean))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const speakWord = () => {
    if (!words[currentIndex]) return
    const utterance = new SpeechSynthesisUtterance(words[currentIndex].word)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }

  const nextWord = () => {
    setCurrentIndex(i => (i + 1) % words.length)
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

  return {
    words,
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
