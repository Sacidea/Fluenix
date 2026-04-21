'use client'

import { useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'
import { WritingExercise, WritingExerciseId, writingExercises } from '@/data/writingExercises'

export function useWritingSession() {
  const { user } = useUser()
  const { level } = useLevel()
  
  const [exerciseId, setExerciseId] = useState<WritingExerciseId>('pr_description')
  const [userText, setUserText] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentExercise = writingExercises.find(e => e.id === exerciseId)!

  const analyzeWriting = async () => {
    if (!userText.trim()) return
    setLoading(true)
    setFeedback(null)
    setError(null)

    try {
      // 1. Analyze with AI
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/writing/analyze`, {
        exercise: exerciseId,
        text: userText,
        prompt: currentExercise.prompt,
        level: level // Send CEFR level for tailored feedback
      })

      const raw = res.data.feedback
      const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = typeof clean === 'string' ? JSON.parse(clean) : clean
      setFeedback(parsed)

      // 2. Save Session to Backend
      if (user) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions`, {
          userId: user.id,
          type: 'writing',
          scenario: exerciseId,
          duration: 0,
          score: parsed.overall_score ?? null
        })
      }
    } catch (err: any) {
      console.error('Writing analysis failed:', err)
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const changeExercise = (id: WritingExerciseId) => {
    setExerciseId(id)
    setUserText('')
    setFeedback(null)
    setError(null)
  }

  return {
    exercise: currentExercise,
    userText,
    setUserText,
    feedback,
    loading,
    error,
    analyzeWriting,
    changeExercise,
    exerciseId
  }
}
