import React from 'react'
import * as Icons from 'lucide-react'

// Explicitly define the available icons we support so we don't import the whole library un-safely
// though in a perfect world we would map them statically. Here we dynamically extract from the Icons object.

type IconName = keyof typeof Icons

interface DynamicIconProps extends React.ComponentProps<'svg'> {
  name: string
  size?: number | string
  color?: string
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = Icons[name as IconName] as React.ElementType
  
  if (!IconComponent) {
    return null
  }
  
  return <IconComponent {...props} />
}
