import { auth, currentUser } from '@clerk/nextjs/server'
import DashboardClient from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const { getToken } = await auth()
  const token = await getToken()
  const user = await currentUser()
  
  return (
    <DashboardClient 
      user={JSON.parse(JSON.stringify(user))} 
    />
  )
}