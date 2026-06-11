import { useState, useCallback, useEffect } from 'react'
import { apiClient } from '@/lib/apiClient'
import { useAuth } from '@clerk/nextjs'
import type { DashboardStats } from '@fluenix/shared'
import { API_ROUTES } from '@fluenix/shared'

export type Session = {
    id: string
    type: string
    scenario?: string
    score?: number
    duration: number
    createdAt: string
    feedback?: unknown
}

export function useProgressData(userId?: string) {
    const { getToken } = useAuth()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [sessions, setSessions] = useState<Session[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        if (!userId) return
        setError(false)
        setLoading(true)
        try {
            const token = await getToken()
            if (!token) return // Wait for Clerk to initialize
            const headers = { Authorization: `Bearer ${token}` }
            const [statsRes, sessionsRes] = await Promise.all([
                apiClient.get(`${API_ROUTES.SESSIONS}/stats/${userId}`, { headers }),
                apiClient.get(`${API_ROUTES.SESSIONS}/user/${userId}`, { headers })
            ])
            setStats(statsRes.data)
            setSessions(sessionsRes.data)
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [userId, getToken])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { stats, sessions, loading, error, refetch: fetchData }
}
