import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { useLevel } from '@/context/LevelContext'

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

export function useScenarioSession() {
  const { user } = useUser()
  const { level } = useLevel()
  const [scenario, setScenario] = useState<ScenarioType>('interview')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (started) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, started])

  const startScenario = async () => {
    setStarted(true)
    setLoading(true)
    setMessages([])
    setStartTime(new Date())
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/scenario/chat`, {
        scenario,
        level,
        messages: [{ role: 'user', content: 'Begin terminal session.' }]
      })
      setMessages([
        { role: 'user', content: 'Begin terminal session.' },
        { role: 'assistant', content: res.data.reply }
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const newMessages: Message[] = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}/scenario/chat`, {
        scenario,
        level,
        messages: newMessages
      })
      setMessages([...newMessages, { role: 'assistant', content: res.data.reply }])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const endSession = () => {
    setStarted(false)
    setMessages([])
    setStartTime(null)
  }

  return {
    scenario,
    setScenario,
    messages,
    input,
    setInput,
    loading,
    started,
    startScenario,
    sendMessage,
    endSession,
    bottomRef,
    activeScenario: scenarios.find(s => s.id === scenario)!
  }
}
