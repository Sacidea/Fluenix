'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/nextjs'
import { apiClient, aiClient } from '@/lib/apiClient'
import { useLevel } from '@/context/LevelContext'
import { WritingExerciseId, writingExercises } from '@fluenix/shared'

export interface WritingMission {
  id: string
  category: string
  level: string
  title: string
  context: string
  referenceData: string
}

export interface WritingFeedback {
  overall_score: number
  tone_alignment: number
  technical_accuracy: number
  strengths: string[]
  improvements: string[]
  revised_text: string
}

export function useWritingSession() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const { level } = useLevel()
  
  const [exerciseId, setExerciseId] = useState<WritingExerciseId | null>(null)
  const [activeMission, setActiveMission] = useState<WritingMission | null>(null)
  const [isLoadingMission, setIsLoadingMission] = useState(false)

  const [userText, setUserText] = useState('')
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentExercise = exerciseId ? writingExercises.find(e => e.id === exerciseId) : null

  const loadNextMission = async (category: WritingExerciseId) => {
    if (!category) return
    setIsLoadingMission(true)
    setError(null)
    setUserText('')
    setFeedback(null)
    try {
      const token = await getToken()
      console.log("Token:", token)
      console.log("Level:", level)
      const res = await apiClient.post(
        '/api/writing/next',
        { level, category },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) {
        setActiveMission(res.data.data)
      } else {
        throw new Error('Failed to load next mission')
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log("Axios Error:", err.response?.data)
      } else {
        console.error(err)
      }
      setError("Failed to fetch next writing task. Please try again.")
    } finally {
      setIsLoadingMission(false)
    }
  }

  // Load mission when category or level changes
  useEffect(() => {
    if (exerciseId) {
      loadNextMission(exerciseId)
    }
  }, [exerciseId, level])

  const changeExercise = (id: WritingExerciseId | null) => {
    setExerciseId(id)
  }

  const analyzeWriting = async () => {
    if (!userText.trim() || !activeMission) return
    setLoading(true)
    setFeedback(null)
    setError(null)

    try {
      const token = await getToken()
      // 1. Analyze with AI
      const res = await aiClient.post('/writing/analyze', {
        exercise: exerciseId,
        text: userText,
        context: activeMission.context,
        referenceData: activeMission.referenceData,
        level: level 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const raw = res.data.feedback
      const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = (typeof clean === 'string' ? JSON.parse(clean) : clean) as WritingFeedback
      setFeedback(parsed)

      // 2. Save Session to Backend
      if (user) {
        await apiClient.post('/api/sessions', {
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
    } catch (err: unknown) {
      console.error('Writing analysis failed:', err)
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'Analysis failed. Please try again.')
      } else {
        setError('Analysis failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    exercise: currentExercise,
    activeMission,
    isLoadingMission,
    loadNextMission,
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
