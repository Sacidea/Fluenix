export async function getDashboardStats(userId: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/stats/${userId}`, {
            cache: 'no-store'
        })
        return await res.json()
    } catch {
        return { totalSessions: 0, averageScore: 0, streak: 0 }
    }
}
