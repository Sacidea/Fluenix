'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/apiClient'
import { useAuth, useUser } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'
import { API_ROUTES } from '@fluenix/shared'

// TODO: Local ListeningScenario has more specific sub-types than shared ListeningScenario (which uses unknown[])
export interface ListeningScenario {
  id: string
  level: string
  title: string
  context: string
  dialogue: { speaker: string, gender?: string, text: string, translation: string, startTime?: number, endTime?: number }[]
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
        API_ROUTES.LISTENING_NEXT,
        { level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data.success) {
        const scenario = res.data.data;
        if (scenario && scenario.questions) {
          scenario.questions.forEach((q: any) => {
            if (q.options) {
              q.options = [...q.options].sort(() => Math.random() - 0.5);
            }
          });
        }
        setActiveScenario(scenario)
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

  const saveSession = async (score: number) => {
    if (!user || !activeScenario) return;
    try {
      const token = await getToken();
      await apiClient.post(API_ROUTES.SESSIONS, {
        userId: user.id,
        type: 'listening',
        scenario: activeScenario.title,
        duration: 0,
        score: score,
        feedback: null
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Failed to save session", err);
    }
  }

  return {
    activeScenario,
    isLoadingScenario,
    loadNextScenario,
    saveSession,
    error
  }
}
