import React from 'react'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="auth-root">
      {/* Dynamic Light Background */}
      <div className="auth-noise"></div>
      <div className="auth-bg-glow-1"></div>
      <div className="auth-bg-glow-2"></div>
      <div className="auth-bg-glow-3"></div>

      {/* Central Glassmorphism Card */}
      <div className="auth-glass-container">
        
        <div className="auth-header-wrapper">
          <Link href="/">
            <div className="auth-logo-wrapper">
              <Logo size={28} color="#635bff" />
            </div>
          </Link>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {/* The Form (Clerk) */}
        <div style={{ width: '100%' }}>
          {children}
        </div>
        
      </div>
    </div>
  )
}
