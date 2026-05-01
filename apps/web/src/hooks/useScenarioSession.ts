import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useUser, useAuth } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'

export type Message = {
  role: 'user' | 'assistant'
  content: string
}

export type ScenarioType = 'interview' | 'standup' | 'code_review'

export const scenarios = [
  { id: 'interview', label: 'Technical Interview', icon: 'Terminal', desc: 'FAANG-style technical questions', color: '#6366f1' },
  { id: 'standup', label: 'Daily Standup', icon: 'Users', desc: 'Agile team communication', color: '#0ea5e9' },
  { id: 'code_review', label: 'Code Review', icon: 'FileCode', desc: 'Explain your code decisions', color: '#10b981' },
]

export const missionPool: Record<ScenarioType, string[]> = {
  interview: [
    "System Design: Design a highly available, scalable rate limiter for an API gateway.",
    "Architecture: Explain the tradeoffs between microservices and a monolithic architecture for a fast-growing startup.",
    "Algorithms: Optimize a Python function that finds the top K frequent elements in a massive 50GB log file."
  ],
  standup: [
    "Backend Sync: You are migrating a legacy payment service to Stripe. You are blocked by a CORS issue on the staging environment.",
    "Frontend Sync: You just finished implementing React Server Components, but the build time increased by 40%. Explain your next steps.",
    "DevOps Sync: The production Kubernetes cluster is experiencing OOM (Out of Memory) kills. Give a concise update on your investigation."
  ],
  code_review: [
    "Database Migration: You wrote a PR to add a new column to a 50GB PostgreSQL table, but you didn't include CONCURRENTLY in your index creation.",
    "Security Flaw: The Senior Architect noticed your new API endpoint doesn't validate user roles before returning sensitive PII data.",
    "Performance Issue: You used an O(N^2) nested loop to process a dataset of 100,000 records. The reviewer rejected the PR."
  ]
}

export function useScenarioSession() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const { level } = useLevel()
  const [scenario, setScenario] = useState<ScenarioType>('interview')
  const [activeMission, setActiveMission] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [durationStr, setDurationStr] = useState('00:00')
  const [listening, setListening] = useState(false)
  
  // Voice Selection State
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('')
  
  const bottomRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Unmount Cleanup & Load Voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'))
      setAvailableVoices(voices)
      if (voices.length > 0 && !selectedVoiceURI) {
        // Default to a Google US voice if available, else first english voice
        const defaultVoice = voices.find(v => v.name.includes('Google') && v.lang === 'en-US') || voices[0]
        setSelectedVoiceURI(defaultVoice.voiceURI)
      }
    }

    loadVoices()
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, []) // Remove dependencies to only run on mount/unmount

  useEffect(() => {
    if (started) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, started, input])

  // Timer Effect
  useEffect(() => {
    if (!started || !startTime) return
    const interval = setInterval(() => {
      const diff = Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
      const m = String(Math.floor(diff / 60)).padStart(2, '0')
      const s = String(diff % 60).padStart(2, '0')
      setDurationStr(`${m}:${s}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [started, startTime])

  // Web Speech AI Helper
  const speakAIResponse = (text: string) => {
    window.speechSynthesis.cancel()
    setTimeout(() => {
      const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`/g, '')
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = 'en-US'
      utterance.rate = 0.95
      
      const voices = window.speechSynthesis.getVoices()
      const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI)
      if (selectedVoice) {
        utterance.voice = selectedVoice
      } else {
        const fallback = voices.find(v => v.lang === 'en-US' || v.lang === 'en_US')
        if (fallback) utterance.voice = fallback
      }
      
      ;(window as any)._fluenixActiveUtterance = utterance
      window.speechSynthesis.speak(utterance)
    }, 50)
  }

  const startScenario = async () => {
    const missions = missionPool[scenario]
    const selectedMission = missions[Math.floor(Math.random() * missions.length)]
    setActiveMission(selectedMission)

    setStarted(true)
    setLoading(true)
    setMessages([])
    setStartTime(new Date())
    setDurationStr('00:00')
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/scenario/chat`, {
        scenario,
        level,
        context: selectedMission,
        messages: [{ role: 'user', content: 'Begin terminal session.' }]
      })
      const reply = res.data.reply
      setMessages([
        { role: 'assistant', content: reply }
      ])
      speakAIResponse(reply)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (overrideInput?: string) => {
    const textToSend = overrideInput || input
    if (!textToSend.trim() || loading) return
    
    const newMessages: Message[] = [...messages, { role: 'user', content: textToSend }]
    setMessages(newMessages)
    if (!overrideInput) setInput('') 
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/scenario/chat`, {
        scenario,
        level,
        context: activeMission,
        messages: newMessages
      })
      const reply = res.data.reply
      setMessages([...newMessages, { role: 'assistant', content: reply }])
      speakAIResponse(reply)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      window.speechSynthesis.cancel()
      setListening(true)
    }
    
    recognition.onresult = (event: any) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          interimTranscript += event.results[i][0].transcript
        }
      }

      if (finalTranscript) {
        setInput(prev => (prev + ' ' + finalTranscript).trim())
      }
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

  const endSession = () => {
    setStarted(false)
    setMessages([])
    setStartTime(null)
    setActiveMission('')
    window.speechSynthesis.cancel()
    if (listening) stopListening()
  }

  const endAndAnalyzeSession = async () => {
    if (!started || messages.length === 0) {
      endSession()
      return
    }

    setLoading(true)
    window.speechSynthesis.cancel()
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/scenario/analyze`, {
        scenario,
        level,
        messages
      })
      const raw = res.data.analysis
      const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsedAnalysis = JSON.parse(clean)

      if (user) {
        const token = await getToken()
        const diffSeconds = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sessions`,
          {
            userId: user.id,
            type: 'scenario',
            scenario: scenario,
            duration: diffSeconds,
            score: parsedAnalysis.overall_score || 0,
            feedback: {
              fluency: parsedAnalysis.fluency_score,
              vocabulary: parsedAnalysis.vocabulary_score,
              technical: parsedAnalysis.technical_accuracy,
              strengths: parsedAnalysis.strengths,
              improvements: parsedAnalysis.improvements,
              overall: parsedAnalysis.overall_feedback,
              context: activeMission
            }
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
      }

      alert(`Simulation Analyzed! Overall Score: ${parsedAnalysis.overall_score}/100. Check 'My Progress' for details.`)
      endSession()

    } catch (err) {
      console.error('Failed to analyze/save session:', err)
      endSession()
    } finally {
      setLoading(false)
    }
  }

  return {
    scenario,
    setScenario,
    activeMission,
    messages,
    input,
    setInput,
    loading,
    started,
    startScenario,
    sendMessage,
    endSession,
    endAndAnalyzeSession,
    bottomRef,
    activeScenario: scenarios.find(s => s.id === scenario)!,
    durationStr,
    listening,
    startListening,
    stopListening,
    availableVoices,
    selectedVoiceURI,
    setSelectedVoiceURI
  }
}
