import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useUser, useAuth } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'

import { Message, ScenarioType, scenarios, ScenarioMission } from '@fluenix/shared'

export function useScenarioSession() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const { level } = useLevel()
  const [scenario, setScenario] = useState<ScenarioType>('interview')
  const [activeMission, setActiveMission] = useState<ScenarioMission | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [durationStr, setDurationStr] = useState('00:00')
  const [listening, setListening] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isLoadingMission, setIsLoadingMission] = useState(false)
  
  // Voice Selection State
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('')
  
  const bottomRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Unmount Cleanup & Load Voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices().filter(v => {
        // Sadece İngilizce sesleri al, fakat "US English" isimli jenerik/kalitesiz sesi filtrele
        return v.lang.startsWith('en') && !v.name.toLowerCase().includes('us english')
      })
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
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold asterisks
        .replace(/`/g, '')               // Remove backticks
        .replace(/[-*_]{3,}/g, '')       // Remove horizontal rules (---, ***, ___)
        .replace(/^#+\s+/gm, '')         // Remove heading hashes (###)
        .replace(/^[-*]\s+/gm, '')       // Remove bullet points (- or *)
        .replace(/\[([^\]]+)\]/g, '$1')  // Remove brackets but keep text inside
        .trim()
        
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
    setStarted(true)
    setLoading(true)
    setMessages([])
    setStartTime(new Date())
    setDurationStr('00:00')
    setIsLoadingMission(true)
    
    try {
      const token = await getToken()
      const missionRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/scenario/next`,
        { category: scenario, level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      let missionContent = ''
      if (missionRes.data.success && missionRes.data.data) {
        setActiveMission(missionRes.data.data)
        missionContent = missionRes.data.data.content
      } else {
        throw new Error('Failed to load mission')
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000'}/scenario/chat`, {
        scenario,
        level,
        context: missionContent,
        messages: [{ role: 'user', content: 'Begin terminal session.' }]
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const reply = res.data.reply
      setMessages([
        { role: 'assistant', content: reply }
      ])
      speakAIResponse(reply)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Message:', err.message);
        if (!err.response) {
          console.error('Network error - backend çalışmıyor olabilir');
        }
      }
      console.error(err)
    } finally {
      setLoading(false)
      setIsLoadingMission(false)
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
      const token = await getToken()
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000'}/scenario/chat`, {
        scenario,
        level,
        context: activeMission?.content || '',
        messages: newMessages
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const reply = res.data.reply
      setMessages([...newMessages, { role: 'assistant', content: reply }])
      speakAIResponse(reply)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Status:', err.response?.status);
        console.error('Data:', err.response?.data);
        console.error('Message:', err.message);
        if (!err.response) {
          console.error('Network error - backend çalışmıyor olabilir');
        }
      }
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
    setActiveMission(null)
    setAnalysisResult(null)
    window.speechSynthesis.cancel()
    if (listening) stopListening()
  }

  const endAndAnalyzeSession = async () => {
    // If the user hasn't said anything (messages only contains the AI's first greeting), don't analyze
    if (!started || messages.length <= 1) {
      alert("Not enough conversation to analyze. Session ended.")
      endSession()
      return
    }

    setLoading(true)
    window.speechSynthesis.cancel()
    try {
      const token = await getToken()
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000'}/scenario/analyze`, {
        scenario,
        level,
        messages
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const raw = res.data.analysis
      const match = raw.match(/\{[\s\S]*\}/)
      const clean = match ? match[0] : raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      
      let parsedAnalysis;
      try {
        parsedAnalysis = JSON.parse(clean)
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Raw text:", raw)
        // Fallback analysis object so the app doesn't crash
        parsedAnalysis = {
          overall_score: 0,
          fluency_score: 0,
          vocabulary_score: 0,
          technical_accuracy: 0,
          strengths: [],
          improvements: ["Not enough data or AI failed to format response."],
          overall_feedback: "The simulation was incomplete or the AI encountered an error while formatting the analysis."
        }
      }

      if (user) {
        const token = await getToken()
        const diffSeconds = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/sessions`,
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
              context: activeMission?.content || ''
            }
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )

        if (activeMission?.id) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/scenario/complete`,
            {
              userId: user.id,
              missionId: activeMission.id
            },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          )
        }
      }

      // Store the analysis result in state instead of alerting
      setAnalysisResult(parsedAnalysis)
      // Stop the simulation from continuing, but don't clear the messages yet so we can show feedback
      setStarted(false)

    } catch (err) {
      console.error('Failed to analyze/save session:', err)
      alert("Failed to analyze session. Please check console.")
      endSession()
    } finally {
      setLoading(false)
    }
  }

  return {
    scenario,
    setScenario,
    activeMission,
    isLoadingMission,
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
    setSelectedVoiceURI,
    analysisResult,
    setAnalysisResult
  }
}
