import { currentUser } from '@clerk/nextjs/server'
import { getDashboardStats } from '@/lib/getDashboardStats'
import DashboardClient from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const user = await currentUser()
  const stats = user ? await getDashboardStats(user.id) : null

  return (
    <DashboardClient 
      user={JSON.parse(JSON.stringify(user))} 
      stats={stats} 
    />
  )
}