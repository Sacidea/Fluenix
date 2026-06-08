'use client'

import { SignUp } from '@clerk/nextjs'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { sharedClerkAppearance } from '@/lib/clerk-appearance'

export default function SignUpPage() {
  return (
    <AuthLayout 
      title="Create account" 
      subtitle="Start your journey to FAANG level communication"
    >
      <SignUp
        forceRedirectUrl="/dashboard"
        appearance={sharedClerkAppearance}
      />
    </AuthLayout>
  )
}