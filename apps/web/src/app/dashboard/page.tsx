import { auth, currentUser } from '@clerk/nextjs/server'
import { getDashboardStats, getDashboardSessions } from '@/lib/getDashboardStats'
import DashboardClient from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const { getToken } = await auth()
  const token = await getToken()
  const user = await currentUser()
  
  const [stats, sessions] = user 
    ? await Promise.all([
        getDashboardStats(user.id, token),
        getDashboardSessions(user.id, token)
      ])
    : [null, []]

  return (
    <DashboardClient 
      user={JSON.parse(JSON.stringify(user))} 
      stats={stats}
      sessions={sessions}
    />
  )
}