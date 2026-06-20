import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiClient, aiClient } from '@/lib/apiClient'
import { useAuth, useUser } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'
import type { BehavioralQuestion, StarFeedback } from '@fluenix/shared'
import { parseAIResponse, createSessionPayload, API_ROUTES, AI_ROUTES } from '@fluenix/shared'

export function useBehavioralSession() {
  const { getToken } = useAuth()
  const { user } = useUser()
  const { level } = useLevel()
  const [activeQuestion, setActiveQuestion] = useState<BehavioralQuestion | null>(null)
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)
  
  const [situation, setSituation] = useState('')
  const [task, setTask] = useState('')
  const [action, setAction] = useState('')
  const [result, setResult] = useState('')
  
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState<StarFeedback | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadNextQuestion = async () => {
    setIsLoadingQuestion(true)
    setError(null)
    setSituation('')
    setTask('')
    setAction('')
    setResult('')
    setFeedback(null)
    try {
      const token = await getToken()
      
      const res = await apiClient.post(
        API_ROUTES.BEHAVIORAL_NEXT,
        { level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) {
        setActiveQuestion(res.data.data)
      } else {
        throw new Error('Failed to load next question')
      }
    } catch (err: unknown) {
      // Error handled via UI state
      setError("Failed to fetch next question. Please try again.")
    } finally {
      setIsLoadingQuestion(false)
    }
  }

  // Load question on mount or level change
  useEffect(() => {
    loadNextQuestion()
  }, [level])

  const analyzeAnswer = async (userLevel: string) => {
    if (!activeQuestion) return
    if (!situation.trim() || !task.trim() || !action.trim() || !result.trim()) {
      setError("Please fill out all 4 sections (S, T, A, R) before submitting.")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setFeedback(null)

    try {
      const token = await getToken()
      const res = await aiClient.post(AI_ROUTES.BEHAVIORAL_ANALYZE, {
        question: activeQuestion.question,
        category: activeQuestion.category,
        context: activeQuestion.context,
        level: userLevel,
        star: {
          situation,
          task,
          action,
          result
        }
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const rawFeedback = res.data.analysis
      const parsed = parseAIResponse<StarFeedback>(rawFeedback)
      setFeedback(parsed)
      
      // 2. Save Session to Backend
      if (user) {
        await apiClient.post(API_ROUTES.SESSIONS, createSessionPayload({
          userId: user.id,
          type: 'behavioral',
          scenario: activeQuestion.category,
          duration: 0, // Could add a timer here if needed
          score: parsed.overall_score ?? 0,
          feedback: parsed 
        }), {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        })
      }
      
    } catch (err) {
      console.error(err)
      setError("Failed to analyze response. Ensure the AI service is running.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    activeQuestion,
    isLoadingQuestion,
    loadNextQuestion,
    situation, setSituation,
    task, setTask,
    action, setAction,
    result, setResult,
    isAnalyzing,
    feedback,
    error,
    analyzeAnswer
  }
}
