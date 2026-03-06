import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-400">Fluenix</h1>
          <UserButton />
        </div>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-2">
            Hoş geldin, {user?.firstName ?? 'Developer'}! 👋
          </h2>
          <p className="text-gray-400">
            Dashboard hazırlanıyor...
          </p>
        </div>
      </div>
    </div>
  )
}