import { useState } from 'react'
import axios from 'axios'
import { behavioralQuestions, BehavioralQuestion } from '@/data/behavioralQuestions'

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
  const [activeQuestion, setActiveQuestion] = useState<BehavioralQuestion>(behavioralQuestions[0])
  const [situation, setSituation] = useState('')
  const [task, setTask] = useState('')
  const [action, setAction] = useState('')
  const [result, setResult] = useState('')
  
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [feedback, setFeedback] = useState<StarFeedback | null>(null)
  const [error, setError] = useState<string | null>(null)

  const changeQuestion = (qId: string) => {
    const q = behavioralQuestions.find(x => x.id === qId)
    if (q) {
      setActiveQuestion(q)
      setSituation('')
      setTask('')
      setAction('')
      setResult('')
      setFeedback(null)
      setError(null)
    }
  }

  const analyzeAnswer = async (level: string) => {
    if (!situation.trim() || !task.trim() || !action.trim() || !result.trim()) {
      setError("Please fill out all 4 sections (S, T, A, R) before submitting.")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setFeedback(null)

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8000'}/behavioral/analyze`, {
        question: activeQuestion.question,
        category: activeQuestion.category,
        context: activeQuestion.context,
        level: level,
        star: {
          situation,
          task,
          action,
          result
        }
      })
      
      const rawFeedback = res.data.analysis
      const parsed = JSON.parse(rawFeedback) as StarFeedback
      setFeedback(parsed)
      
    } catch (err) {
      console.error(err)
      setError("Failed to analyze response. Ensure the AI service is running.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    questions: behavioralQuestions,
    activeQuestion,
    changeQuestion,
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
