import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export type DashboardStats = {
    totalSessions: number
    averageScore: number
    streak: number
    lastSession: string | null
}

export function useDashboardData(userId?: string) {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchStats = useCallback(async () => {
        if (!userId) return
        setLoading(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/stats/${userId}`)
            setStats(res.data)
        } catch {
            setStats({ totalSessions: 0, averageScore: 0, streak: 0, lastSession: null })
        } finally {
            setLoading(false)
        }
    }, [userId])

    useEffect(() => {
        fetchStats()
    }, [fetchStats])

    return { stats, loading }
}
