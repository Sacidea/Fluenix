'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export async function completeOnboarding(data: { role: string; level: string; goal: string }) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error('Not authenticated')
    }

    const client = await clerkClient()
    
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: data.role,
        level: data.level,
        goal: data.goal,
        onboardingComplete: true,
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error('Failed to update onboarding data:', error)
    return { success: false, error: error.message }
  }
}
