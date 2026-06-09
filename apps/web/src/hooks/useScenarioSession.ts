import { useState, useRef, useEffect } from 'react'
import { apiClient, aiClient } from '@/lib/apiClient'
import axios from 'axios'
import { useUser, useAuth } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'
import { useScenarioAudio } from './useScenarioAudio'

import { Message, ScenarioType, scenarios, ScenarioMission } from '@fluenix/shared'

export interface ScenarioAnalysisResult {
  overall_score: number
  fluency_score: number
  vocabulary_score: number
  technical_accuracy: number
  strengths: string[]
  improvements: string[]
  overall_feedback: string
}

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
  const [analysisResult, setAnalysisResult] = useState<ScenarioAnalysisResult | null>(null)
  const [isLoadingMission, setIsLoadingMission] = useState(false)
  
  const bottomRef = useRef<HTMLDivElement>(null)

  const {
    availableVoices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    listening,
    startListening: startAudioListening,
    stopListening,
    speakAIResponse
  } = useScenarioAudio()

  const startListening = () => {
    startAudioListening((text) => setInput(prev => (prev + ' ' + text).trim()))
  }

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


  const startScenario = async () => {
    setStarted(true)
    setLoading(true)
    setMessages([])
    setStartTime(new Date())
    setDurationStr('00:00')
    setIsLoadingMission(true)
    
    try {
      const token = await getToken()
      const missionRes = await apiClient.post(
        '/api/scenario/next',
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

      const res = await aiClient.post('/scenario/chat', {
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
      const res = await aiClient.post('/scenario/chat', {
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
    } catch (err: unknown) {
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
      const res = await aiClient.post('/scenario/analyze', {
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

        await apiClient.post(
          '/api/sessions',
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
          await apiClient.post(
            '/api/scenario/complete',
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

    } catch (err: unknown) {
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
