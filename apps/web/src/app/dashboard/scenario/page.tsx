'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Scenario = 'interview' | 'standup' | 'code_review'

export default function ScenarioPage() {
  const { user } = useUser()
  const [scenario, setScenario] = useState<Scenario>('interview')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [level, setLevel] = useState('B2')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) return
    axios.get(`http://localhost:3001/api/users/${user.id}`)
      .then(res => {
        if (res.data?.level) setLevel(res.data.level)
      })
      .catch(err => console.error('Failed to get user level', err))
  }, [user])

  const scenarios = [
    { id: 'interview', label: 'Technical Interview', icon: '🎯', desc: 'FAANG-style technical questions', color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe' },
    { id: 'standup', label: 'Daily Standup', icon: '📋', desc: 'Agile team communication', color: '#0ea5e9', bg: '#e0f2fe', border: '#bae6fd' },
    { id: 'code_review', label: 'Code Review', icon: '👨‍💻', desc: 'Explain your code decisions', color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
  ]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startScenario = async () => {
    setStarted(true)
    setLoading(true)
    setMessages([])
    setStartTime(new Date())
    try {
      const res = await axios.post('http://localhost:8000/scenario/chat', {
        scenario,
        level,
        messages: [{ role: 'user', content: 'Hello, I am ready to start.' }]
      })
      setMessages([
        { role: 'user', content: 'Hello, I am ready to start.' },
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
      const res = await axios.post('http://localhost:8000/scenario/chat', {
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

  const endSession = async () => {
    if (user && startTime && messages.length > 1) {
      const duration = Math.round((new Date().getTime() - startTime.getTime()) / 1000)
      let score = null

      try {
        const analysisRes = await axios.post('http://localhost:8000/scenario/analyze', {
          scenario,
          level,
          messages
        })
        const raw = analysisRes.data.analysis
        const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        const jsonStart = clean.indexOf('{')
        const jsonEnd = clean.lastIndexOf('}')
        if (jsonStart !== -1 && jsonEnd !== -1) {
          const analysis = JSON.parse(clean.slice(jsonStart, jsonEnd + 1))
          score = analysis?.overall_score ?? null
        }
      } catch (err) {
        console.error('Analysis error:', err)
      }

      try {
        await axios.post('http://localhost:3001/api/sessions', {
          userId: user.id,
          type: 'scenario',
          scenario,
          duration,
          score,
        })
      } catch (err) {
        console.error('Session save error:', err)
      }
    }
    setStarted(false)
    setMessages([])
    setStartTime(null)
  }

  const activeScenario = scenarios.find(s => s.id === scenario)!

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sc-root {
          min-height: 100vh;
          background: #f8faff;
          color: #102D47;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .sc-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 68px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #e8edf5;
          box-shadow: 0 1px 12px rgba(0,0,0,0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .sc-nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .sc-back {
          font-size: 13px;
          font-weight: 500;
          color: #547593;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .sc-back:hover { color: #102D47; }

        .sc-nav-sep { color: #cbd5e1; }

        .sc-nav-title {
          font-size: 15px;
          font-weight: 600;
          color: #102D47;
        }

        .sc-main {
          flex: 1;
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
          padding: 48px 40px;
        }

        .sc-selector-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #6366f1;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .sc-selector-title {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
          color: #102D47;
          line-height: 1.2;
        }

        .sc-selector-sub {
          font-size: 15px;
          color: #547593;
          margin-bottom: 36px;
          line-height: 1.6;
        }

        .sc-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .sc-card {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 18px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .sc-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .sc-card.selected {
          border-color: var(--card-color);
          box-shadow: 0 0 0 3px var(--card-bg), 0 8px 24px rgba(0,0,0,0.08);
        }

        .sc-card-icon { font-size: 32px; margin-bottom: 12px; }

        .sc-card-label {
          font-size: 15px;
          font-weight: 600;
          color: #102D47;
          margin-bottom: 4px;
        }

        .sc-card-desc { font-size: 12px; color: #547593; line-height: 1.5; }

        .sc-start-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          border: none;
          border-radius: 14px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(99,102,241,0.3);
        }

        .sc-start-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }

        .sc-chat {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 160px);
        }

        .sc-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .sc-chat-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 600;
          border: 1.5px solid;
        }

        .sc-chat-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .sc-reset-btn {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 10px;
          color: #547593;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .sc-reset-btn:hover {
          border-color: #6366f1;
          color: #6366f1;
        }

        .sc-messages {
          flex: 1;
          overflow-y: auto;
          padding: 4px 0 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scrollbar-width: thin;
          scrollbar-color: #e2e8f0 transparent;
        }

        .sc-msg {
          display: flex;
          gap: 12px;
        }

        .sc-msg.user { flex-direction: row-reverse; }

        .sc-msg-avatar {
          width: 36px; height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .sc-msg.ai .sc-msg-avatar {
          background: #eef2ff;
          border: 1.5px solid #c7d2fe;
        }

        .sc-msg.user .sc-msg-avatar {
          background: #f0fdf4;
          border: 1.5px solid #bbf7d0;
        }

        .sc-msg-body { max-width: 72%; }

        .sc-msg-name {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 6px;
          color: #94a3b8;
        }

        .sc-msg.user .sc-msg-name { text-align: right; }

        .sc-msg-bubble {
          padding: 14px 18px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.65;
          font-weight: 400;
        }

        .sc-msg.ai .sc-msg-bubble {
          background: white;
          border: 1.5px solid #e8edf5;
          color: #102D47;
          border-radius: 4px 16px 16px 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .sc-msg.user .sc-msg-bubble {
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          color: white;
          border-radius: 16px 4px 16px 16px;
          box-shadow: 0 4px 12px rgba(99,102,241,0.3);
        }

        .sc-typing {
          display: flex;
          gap: 12px;
        }

        .sc-typing-avatar {
          width: 36px; height: 36px;
          border-radius: 12px;
          background: #eef2ff;
          border: 1.5px solid #c7d2fe;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .sc-typing-bubble {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 4px 16px 16px 16px;
          padding: 14px 20px;
          display: flex;
          gap: 5px;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .sc-typing-dot {
          width: 6px; height: 6px;
          background: #6366f1;
          border-radius: 50%;
          animation: typingDot 1.2s infinite;
        }

        .sc-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .sc-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .sc-input-area {
          border-top: 1.5px solid #e8edf5;
          padding-top: 20px;
          display: flex;
          gap: 10px;
          align-items: center;
          background: #f8faff;
        }

        .sc-input {
          flex: 1;
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 14px;
          padding: 14px 18px;
          font-size: 14px;
          color: #102D47;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          outline: none;
          transition: border-color 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .sc-input::placeholder { color: #94a3b8; }

        .sc-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .sc-send-btn {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          border: none;
          border-radius: 14px;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(99,102,241,0.3);
        }

        .sc-send-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(99,102,241,0.4);
        }

        .sc-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="sc-root">
        <main className="sc-main">
          {!started ? (
            <div>
              <p className="sc-selector-eyebrow">Practice</p>
              <h1 className="sc-selector-title">Choose your scenario</h1>
              <p className="sc-selector-sub">AI will play the opposite role in a real-world tech situation</p>

              <div className="sc-cards">
                {scenarios.map((s) => (
                  <div
                    key={s.id}
                    className={`sc-card ${scenario === s.id ? 'selected' : ''}`}
                    style={{
                      '--card-color': s.color,
                      '--card-bg': s.bg,
                      borderTopColor: scenario === s.id ? s.color : undefined,
                      borderTopWidth: scenario === s.id ? '3px' : undefined,
                    } as React.CSSProperties}
                    onClick={() => setScenario(s.id as Scenario)}
                    data-aos="fade-up"
                    data-aos-delay={scenarios.indexOf(s) * 80}
                  >
                    <div className="sc-card-icon">{s.icon}</div>
                    <div className="sc-card-label">{s.label}</div>
                    <div className="sc-card-desc">{s.desc}</div>
                  </div>
                ))}
              </div>

              <button className="sc-start-btn" onClick={startScenario} data-aos="fade-up" data-aos-delay="300">
                Start Session →
              </button>
            </div>
          ) : (
            <div className="sc-chat">
              <div className="sc-chat-header">
                <div
                  className="sc-chat-badge"
                  style={{
                    background: activeScenario.bg,
                    color: activeScenario.color,
                    borderColor: activeScenario.border,
                  }}
                >
                  <div className="sc-chat-dot" style={{ background: activeScenario.color }} />
                  {activeScenario.icon} {activeScenario.label}
                </div>
                <button className="sc-reset-btn" onClick={endSession}>
                  ↺ New Session
                </button>
              </div>

              <div className="sc-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`sc-msg ${msg.role === 'user' ? 'user' : 'ai'}`}>
                    <div className="sc-msg-avatar">
                      {msg.role === 'assistant' ? '🤖' : '👤'}
                    </div>
                    <div className="sc-msg-body">
                      <div className="sc-msg-name">
                        {msg.role === 'assistant' ? 'AI Interviewer' : 'You'}
                      </div>
                      <div
                        className="sc-msg-bubble"
                        dangerouslySetInnerHTML={{
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br/>')
                        }}
                      />
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="sc-typing">
                    <div className="sc-typing-avatar">🤖</div>
                    <div className="sc-typing-bubble">
                      <div className="sc-typing-dot" />
                      <div className="sc-typing-dot" />
                      <div className="sc-typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="sc-input-area">
                <input
                  className="sc-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your response and press Enter..."
                />
                <button
                  className="sc-send-btn"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                >
                  ↑
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}