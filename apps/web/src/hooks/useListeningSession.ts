'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/apiClient'
import { useAuth, useUser } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'

export interface ListeningScenario {
  id: string
  level: string
  title: string
  context: string
  dialogue: { speaker: string, text: string, translation: string, startTime?: number, endTime?: number }[]
  questions: { id: string, text: string, options: { id: string, text: string, isCorrect: boolean, explanation: string }[], correctAnswer: string, explanation: string }[]
  dictation: { audioUrl?: string, correctText: string, answers: string[], textWithBlanks: string }
  shadowing: { audioUrl?: string, text: string, translation: string, targetText: string }
}

export function useListeningSession() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const { level } = useLevel()
  
  const [activeScenario, setActiveScenario] = useState<ListeningScenario | null>(null)
  const [isLoadingScenario, setIsLoadingScenario] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadNextScenario = async () => {
    setIsLoadingScenario(true)
    setError(null)
    try {
      const token = await getToken()
      const res = await apiClient.post(
        '/api/listening/next',
        { level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) {
        setActiveScenario(res.data.data)
      } else {
        throw new Error('Failed to load next scenario')
      }
    } catch (err: unknown) {
      console.error(err)
      setError("Failed to fetch next listening task. Please try again.")
    } finally {
      setIsLoadingScenario(false)
    }
  }

  // Load scenario when level changes
  useEffect(() => {
    loadNextScenario()
  }, [level])

  return {
    activeScenario,
    isLoadingScenario,
    loadNextScenario,
    error
  }
}
