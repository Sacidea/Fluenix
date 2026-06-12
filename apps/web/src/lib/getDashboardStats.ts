export async function getDashboardStats(userId: string, token?: string | null) {
    try {
        // Fetch both stats and sessions in a single API call to reduce overhead
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/sessions/stats/${userId}?full=true`, {
            cache: 'no-store',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined
        })
        if (!res.ok) throw new Error("Failed to fetch stats");
        return await res.json()
    } catch {
        return { stats: { totalSessions: 0, averageScore: 0, streak: 0 }, sessions: [] }
    }
}
