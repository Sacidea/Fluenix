import { auth, currentUser } from '@clerk/nextjs/server'
import { getDashboardStats } from '@/lib/getDashboardStats'
import DashboardClient from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const { getToken } = await auth()
  const token = await getToken()
  const user = await currentUser()
  
  const data = user ? await getDashboardStats(user.id, token) : null
  const stats = data?.stats || null
  const sessions = data?.sessions || []

  return (
    <DashboardClient 
      user={JSON.parse(JSON.stringify(user))} 
      stats={stats}
      sessions={sessions}
    />
  )
}