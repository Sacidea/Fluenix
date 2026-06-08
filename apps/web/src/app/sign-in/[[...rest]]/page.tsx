'use client'

import { SignIn } from '@clerk/nextjs'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { sharedClerkAppearance } from '@/lib/clerk-appearance'

export default function SignInPage() {
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to continue to your dashboard"
    >
      <SignIn
        forceRedirectUrl="/dashboard"
        appearance={sharedClerkAppearance}
      />
    </AuthLayout>
  )
}