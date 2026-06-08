import React from 'react'

export const SessionsIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#paint0_linear_sessions)"/>
    <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.3"/>
    <defs>
      <linearGradient id="paint0_linear_sessions" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6"/>
        <stop offset="1" stopColor="#2563EB"/>
      </linearGradient>
    </defs>
  </svg>
)

export const AccuracyIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#paint0_linear_acc)"/>
    <path d="M16 8L8 16M16 8H10.5M16 8V13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18H18" stroke="white" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round"/>
    <defs>
      <linearGradient id="paint0_linear_acc" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#22C55E"/>
        <stop offset="1" stopColor="#16A34A"/>
      </linearGradient>
    </defs>
  </svg>
)

export const StreakIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#paint0_linear_streak)"/>
    <path d="M13 3L6 13H12L11 21L18 11H12L13 3Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 3L6 13H12L11 21L18 11H12L13 3Z" fill="url(#paint1_linear_streak)" fillOpacity="0.5"/>
    <defs>
      <linearGradient id="paint0_linear_streak" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFC107"/>
        <stop offset="1" stopColor="#F59E0B"/>
      </linearGradient>
      <linearGradient id="paint1_linear_streak" x1="13" y1="3" x2="11" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="1" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
)

export const ActivityIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="url(#paint0_linear_act)"/>
    <rect x="5" y="6" width="14" height="13" rx="2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 4V8M8 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 11H19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="15" r="2" fill="white" fillOpacity="0.5"/>
    <defs>
      <linearGradient id="paint0_linear_act" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E"/>
        <stop offset="1" stopColor="#E11D48"/>
      </linearGradient>
    </defs>
  </svg>
)
