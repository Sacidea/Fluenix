import { auth } from '@clerk/nextjs/server'
import { LandingClient } from '@/components/landing/LandingClient'

export const metadata = {
  title: 'Fluenix Engine - Engineering communication, redefined.',
  description: 'The AI-native communication infrastructure designed exclusively for high-performance software engineers. Master complex system design loops, bulletproof code reviews, and executive-level behavioral storytelling.',
}

export default async function Home() {
  const { userId } = await auth()

  return <LandingClient userId={userId} />
}
