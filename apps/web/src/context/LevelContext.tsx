'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/apiClient'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/nextjs'

interface LevelContextType {
  level: string
  setLevel: (level: string) => Promise<void>
  loading: boolean
}

const LevelContext = createContext<LevelContextType | undefined>(undefined)

export function LevelProvider({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const { getToken } = useAuth()
  const [level, setInternalLevel] = useState('B2')
  const [loading, setLoading] = useState(true)

  // Fetch initial level on mount
  useEffect(() => {
    if (!user) return

    const fetchUserLevel = async () => {
      try {
        const token = await getToken()
        if (!token) {
          console.warn('No token available from Clerk yet.')
          return
        }
        const res = await apiClient.get(`/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data?.level) {
          setInternalLevel(res.data.level)
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.code === 'ERR_NETWORK') {
          console.warn('[Fluenix] Backend unavailable — using default level (B2).')
        } else {
          console.warn('Failed to fetch initial level', err instanceof Error ? err.message : '')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserLevel()
  }, [user, getToken])

  const setLevel = async (newLevel: string) => {
    if (!user) return

    // Optimistic UI update
    setInternalLevel(newLevel)

    try {
      const token = await getToken()
      await apiClient.put(`/api/users/${user.id}/level`, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        level: newLevel
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      })
    } catch (err: unknown) {
      console.error('Failed to sync level with DB', err)
    }
  }

  return (
    <LevelContext.Provider value={{ level, setLevel, loading }}>
      {children}
    </LevelContext.Provider>
  )
}

export function useLevel() {
  const context = useContext(LevelContext)
  if (context === undefined) {
    throw new Error('useLevel must be used within a LevelProvider')
  }
  return context
}
