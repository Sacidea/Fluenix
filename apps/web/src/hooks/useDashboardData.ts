import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'

export type DashboardStats = {
    totalSessions: number
    averageScore: number
    streak: number
    lastSession: string | null
}

export function useDashboardData(userId?: string) {
    const { getToken } = useAuth()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchStats = useCallback(async () => {
        if (!userId) return
        setLoading(true)
        try {
            const token = await getToken()
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/stats/${userId}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined
            })
            setStats(res.data)
        } catch {
            setStats({ totalSessions: 0, averageScore: 0, streak: 0, lastSession: null })
        } finally {
            setLoading(false)
        }
    }, [userId, getToken])

    useEffect(() => {
        fetchStats()
    }, [fetchStats])

    return { stats, loading }
}
