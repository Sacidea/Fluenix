import React from 'react'

interface LogoProps {
  size?: number
  className?: string
  color?: string
}

export function Logo({ size = 24, className = '', color = 'currentColor' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 21V3H19V7H9V11H17V15H9V21H5Z"
        fill={color}
      />
    </svg>
  )
}
