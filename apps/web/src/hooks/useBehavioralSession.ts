import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiClient, aiClient } from '@/lib/apiClient'
import { useAuth } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'

export interface BehavioralQuestion {
  id: string
  category: string
  context: string
  question: string
}

export type StarFeedback = {
  overall_score: number
  leadership_alignment: number
  english_quality: number
  strengths: string[]
  improvements: string[]
  detailed_analysis: {
    situation: string
    task: string
    action: string
    result: string
  }
}

export function useBehavioralSession() {
  const { getToken } = useAuth()
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
      console.log("Token:", token)
      console.log("Level:", level)
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)
      
      const res = await apiClient.post(
        '/api/behavioral/next',
        { level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) {
        setActiveQuestion(res.data.data)
      } else {
        throw new Error('Failed to load next question')
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("Axios Error Data:", err.response?.data)
        console.log("Axios Error Status:", err.response?.status)
        console.log("Axios Error Message:", err.message)
      } else {
        console.error(err)
      }
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
      const res = await aiClient.post('/behavioral/analyze', {
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
      const parsed = JSON.parse(rawFeedback.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()) as StarFeedback
      setFeedback(parsed)
      
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
