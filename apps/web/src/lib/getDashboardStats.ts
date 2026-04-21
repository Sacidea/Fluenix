export async function getDashboardStats(userId: string) {
    try {
        const res = await fetch(`http://localhost:3001/api/sessions/stats/${userId}`, {
            cache: 'no-store'
        })
        return await res.json()
    } catch {
        return { totalSessions: 0, averageScore: 0, streak: 0 }
    }
}
