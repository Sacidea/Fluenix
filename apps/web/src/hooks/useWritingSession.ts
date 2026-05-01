'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'
import { WritingExercise, WritingExerciseId, WritingMission, writingExercises } from '@/data/writingExercises'

export function useWritingSession() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const { level } = useLevel()
  
  const [exerciseId, setExerciseId] = useState<WritingExerciseId>('pr_description')
  const [activeMission, setActiveMission] = useState<WritingMission | null>(null)
  const [userText, setUserText] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentExercise = writingExercises.find(e => e.id === exerciseId)!

  // Pick a random mission when the exercise changes
  useEffect(() => {
    const missions = currentExercise.missions
    if (missions && missions.length > 0) {
      const randomMission = missions[Math.floor(Math.random() * missions.length)]
      setActiveMission(randomMission)
    }
  }, [exerciseId, currentExercise])

  const analyzeWriting = async () => {
    if (!userText.trim() || !activeMission) return
    setLoading(true)
    setFeedback(null)
    setError(null)

    try {
      // 1. Analyze with AI
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/writing/analyze`, {
        exercise: exerciseId,
        text: userText,
        context: activeMission.context,
        referenceData: activeMission.referenceData,
        level: level 
      })

      const raw = res.data.feedback
      const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = typeof clean === 'string' ? JSON.parse(clean) : clean
      setFeedback(parsed)

      // 2. Save Session to Backend
      if (user) {
        const token = await getToken()
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions`, {
          userId: user.id,
          type: 'writing',
          scenario: activeMission.title, // Store the specific mission title
          duration: 0,
          score: parsed.overall_score ?? null,
          feedback: parsed // Store the full feedback json
        }, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
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
    activeMission,
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
