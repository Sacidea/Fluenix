export async function getDashboardStats(userId: string, token?: string | null) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/sessions/stats/${userId}`, {
            cache: 'no-store',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined
        })
        if (!res.ok) throw new Error("Failed to fetch stats");
        return await res.json()
    } catch {
        return { totalSessions: 0, averageScore: 0, streak: 0 }
    }
}

export async function getDashboardSessions(userId: string, token?: string | null) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/sessions/user/${userId}`, {
            cache: 'no-store',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined
        })
        if (!res.ok) throw new Error("Failed to fetch sessions");
        return await res.json()
    } catch {
        return []
    }
}
