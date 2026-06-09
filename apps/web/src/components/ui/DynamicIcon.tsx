import React from 'react'
import { 
  LayoutDashboard, TerminalSquare, PenTool, Mic, BookOpen, 
  Terminal, Headphones, Cpu, Target, Activity, BookText, 
  CheckSquare, GitPullRequest, GitCommit, Mail, MessagesSquare, LucideIcon 
} from 'lucide-react'

// Explicitly map the icons used in the app to prevent aggressive tree-shaking on Vercel
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, TerminalSquare, PenTool, Mic, BookOpen,
  Terminal, Headphones, Cpu, Target, Activity, BookText,
  CheckSquare, GitPullRequest, GitCommit, Mail, MessagesSquare
}

interface DynamicIconProps extends React.ComponentProps<'svg'> {
  name: string
  size?: number | string
  color?: string
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    console.warn(`Icon ${name} not found in DynamicIcon map`)
    return null
  }
  
  return <IconComponent {...props} />
}
