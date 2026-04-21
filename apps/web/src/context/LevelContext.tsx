'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'

interface LevelContextType {
  level: string
  setLevel: (level: string) => Promise<void>
  loading: boolean
}

const LevelContext = createContext<LevelContextType | undefined>(undefined)

export function LevelProvider({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const [level, setInternalLevel] = useState('B2')
  const [loading, setLoading] = useState(true)

  // Fetch initial level on mount
  useEffect(() => {
    if (!user) return

    const fetchUserLevel = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`)
        if (res.data?.level) {
          setInternalLevel(res.data.level)
        }
      } catch (err) {
        console.error('Failed to fetch initial level', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserLevel()
  }, [user])

  const setLevel = async (newLevel: string) => {
    if (!user) return

    // Optimistic UI update
    setInternalLevel(newLevel)

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}/level`, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        level: newLevel
      })
    } catch (err) {
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
