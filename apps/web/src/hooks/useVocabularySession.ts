import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/nextjs'
import { VocabWord } from '@/data/vocabulary'

export function useVocabularySession(sessionSize: number = 10) {
  const { getToken } = useAuth()
  const { user } = useUser()
  
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSession = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken()
      const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/vocabulary/session?count=${sessionSize}`
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSessionWords(res.data)
    } catch (err: any) {
      console.error('Failed to fetch vocabulary session:', err)
      setError(err.message || 'Error fetching words')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSession()
  }, [user?.id, sessionSize])

  const completeSession = async (masteredWords: string[], needsReviewWords: string[]) => {
    if (!user) return

    try {
      const token = await getToken()
      
      // 1. Mark all words as seen in the vocabulary table
      const allWordIds = [...masteredWords, ...needsReviewWords]
      if (allWordIds.length > 0) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/vocabulary/complete`,
          {
            userId: user.id,
            wordIds: allWordIds
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }

      // 2. Save session stats
      const score = Math.round((masteredWords.length / sessionSize) * 100)
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/sessions`,
        {
          userId: user.id,
          type: 'vocabulary',
          scenario: 'Flashcard Review',
          duration: 1, // Optional: tracking duration could be added
          score: score,
          feedback: {
            mastered: masteredWords.length,
            needsReview: needsReviewWords.length
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (err) {
      console.error('Failed to save session:', err)
    }
  }

  return {
    sessionWords,
    loading,
    error,
    fetchSession,
    completeSession
  }
}
