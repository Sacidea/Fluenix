export type Message = {
  role: 'user' | 'assistant'
  content: string
}

export type ScenarioType = 'interview' | 'standup' | 'code_review'

export const scenarios = [
  { id: 'interview', label: 'Technical Interview', icon: 'Terminal', desc: 'FAANG-style technical questions', color: '#6366f1' },
  { id: 'standup', label: 'Daily Standup', icon: 'Users', desc: 'Agile team communication', color: '#0ea5e9' },
  { id: 'code_review', label: 'Code Review', icon: 'FileCode', desc: 'Explain your code decisions', color: '#10b981' },
]

export interface ScenarioMission {
  id: string
  category: string
  level: string
  content: string
}

export type ModuleItem = {
    id: string
    title: string
    description: string
    icon: string
    href: string
    available: boolean
    tag: string
    color: string
    bg: string
    border: string
    image?: string
    imagePosition?: string
}
