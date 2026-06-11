import { useState, useCallback, useEffect } from 'react'
import { apiClient } from '@/lib/apiClient'
import { useAuth } from '@clerk/nextjs'
import type { DashboardStats } from '@fluenix/shared'
import { API_ROUTES } from '@fluenix/shared'

export function useDashboardData(userId?: string) {
    const { getToken } = useAuth()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchStats = useCallback(async () => {
        if (!userId) return
        setLoading(true)
        try {
            const token = await getToken()
            if (!token) return // Wait for Clerk to initialize
            const res = await apiClient.get(`${API_ROUTES.SESSIONS}/stats/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
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
