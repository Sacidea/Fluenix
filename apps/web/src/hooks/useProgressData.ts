import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export type Stats = {
    totalSessions: number
    averageScore: number
    streak: number
    lastSession: string | null
}

export type Session = {
    id: string
    type: string
    scenario?: string
    score?: number
    duration: number
    createdAt: string
}

export function useProgressData(userId?: string) {
    const [stats, setStats] = useState<Stats | null>(null)
    const [sessions, setSessions] = useState<Session[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = useCallback(async () => {
        if (!userId) return
        setError(false)
        setLoading(true)
        try {
            const [statsRes, sessionsRes] = await Promise.all([
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/stats/${userId}`),
                axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/user/${userId}`)
            ])
            setStats(statsRes.data)
            setSessions(sessionsRes.data)
        } catch (err) {
            console.error(err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [userId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { stats, sessions, loading, error, refetch: fetchData }
}
