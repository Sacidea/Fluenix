'use client'

import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Scenario = 'interview' | 'standup' | 'code_review'

export default function ScenarioPage() {
  const [scenario, setScenario] = useState<Scenario>('interview')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scenarios = [
    { id: 'interview', label: 'Technical Interview', icon: '🎯', desc: 'FAANG-style technical questions' },
    { id: 'standup', label: 'Daily Standup', icon: '📋', desc: 'Agile team communication' },
    { id: 'code_review', label: 'Code Review', icon: '👨‍💻', desc: 'Explain your code decisions' },
  ]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startScenario = async () => {
    setStarted(true)
    setLoading(true)
    setMessages([])
    try {
      const res = await axios.post('http://localhost:8000/scenario/chat', {
        scenario,
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
        messages: newMessages
      })
      setMessages([...newMessages, { role: 'assistant', content: res.data.reply }])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sc-root {
          min-height: 100vh;
          background: #080b12;
          color: #e8eaf0;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }

        .sc-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          background: rgba(8,11,18,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
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
          color: #4b5563;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .sc-back:hover { color: #e8eaf0; }

        .sc-nav-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #e8eaf0;
        }

        .sc-nav-sep {
          color: #1f2937;
          font-size: 18px;
        }

        .sc-main {
          flex: 1;
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
          padding: 48px 40px;
        }

        /* Selector */
        .sc-selector {
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .sc-selector-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
        }

        .sc-selector-sub {
          font-size: 15px;
          color: #4b5563;
          margin-bottom: 40px;
        }

        .sc-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }

        .sc-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .sc-card:hover {
          border-color: rgba(79,124,255,0.3);
          background: rgba(79,124,255,0.04);
        }

        .sc-card.selected {
          border-color: #4f7cff;
          background: rgba(79,124,255,0.08);
          box-shadow: 0 0 0 1px rgba(79,124,255,0.2), 0 8px 24px rgba(79,124,255,0.1);
        }

        .sc-card-icon { font-size: 28px; margin-bottom: 12px; }

        .sc-card-label {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #e8eaf0;
          margin-bottom: 4px;
        }

        .sc-card-desc {
          font-size: 12px;
          color: #4b5563;
        }

        .sc-start-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #4f7cff, #7c5cfc);
          border: none;
          border-radius: 14px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: all 0.2s ease;
          box-shadow: 0 8px 24px rgba(79,124,255,0.25);
        }

        .sc-start-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(79,124,255,0.35);
        }

        /* Chat */
        .sc-chat {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 160px);
          animation: fadeUp 0.3s ease;
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
          background: rgba(79,124,255,0.1);
          border: 1px solid rgba(79,124,255,0.2);
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 13px;
          color: #4f7cff;
          font-weight: 500;
        }

        .sc-chat-dot {
          width: 6px; height: 6px;
          background: #4f7cff;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .sc-reset-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #4b5563;
          padding: 7px 14px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .sc-reset-btn:hover {
          border-color: rgba(255,255,255,0.15);
          color: #e8eaf0;
        }

        .sc-messages {
          flex: 1;
          overflow-y: auto;
          padding: 4px 0 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.06) transparent;
        }

        .sc-msg {
          display: flex;
          gap: 12px;
          animation: fadeUp 0.25s ease;
        }

        .sc-msg.user { flex-direction: row-reverse; }

        .sc-msg-avatar {
          width: 32px; height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .sc-msg.ai .sc-msg-avatar {
          background: rgba(79,124,255,0.15);
          border: 1px solid rgba(79,124,255,0.2);
        }

        .sc-msg.user .sc-msg-avatar {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .sc-msg-body { max-width: 72%; }

        .sc-msg-name {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 6px;
          color: #374151;
        }

        .sc-msg.user .sc-msg-name { text-align: right; }

        .sc-msg-bubble {
          padding: 14px 18px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.65;
          font-weight: 300;
        }

        .sc-msg.ai .sc-msg-bubble {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: #d1d5db;
          border-radius: 4px 16px 16px 16px;
        }

        .sc-msg.user .sc-msg-bubble {
          background: linear-gradient(135deg, #4f7cff, #7c5cfc);
          color: white;
          border-radius: 16px 4px 16px 16px;
        }

        .sc-typing {
          display: flex;
          gap: 12px;
          animation: fadeUp 0.25s ease;
        }

        .sc-typing-avatar {
          width: 32px; height: 32px;
          border-radius: 10px;
          background: rgba(79,124,255,0.15);
          border: 1px solid rgba(79,124,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .sc-typing-bubble {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px 16px 16px 16px;
          padding: 14px 20px;
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .sc-typing-dot {
          width: 5px; height: 5px;
          background: #4b5563;
          border-radius: 50%;
          animation: typingDot 1.2s infinite;
        }

        .sc-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .sc-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }

        .sc-input-area {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 20px;
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }

        .sc-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px 18px;
          font-size: 14px;
          color: #e8eaf0;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
        }

        .sc-input::placeholder { color: #374151; }

        .sc-input:focus {
          border-color: rgba(79,124,255,0.4);
          background: rgba(79,124,255,0.04);
        }

        .sc-send-btn {
          width: 48px; height: 48px;
          background: linear-gradient(135deg, #4f7cff, #7c5cfc);
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
          box-shadow: 0 4px 12px rgba(79,124,255,0.3);
        }

        .sc-send-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(79,124,255,0.4);
        }

        .sc-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="sc-root">
        {/* Nav */}
        <nav className="sc-nav">
          <div className="sc-nav-left">
            <Link href="/dashboard" className="sc-back">← Back</Link>
            <span className="sc-nav-sep">|</span>
            <span className="sc-nav-title">Scenario Simulation</span>
          </div>
        </nav>

        <main className="sc-main">
          {!started ? (
            <div className="sc-selector">
              <h1 className="sc-selector-title">Choose your scenario</h1>
              <p className="sc-selector-sub">AI will play the opposite role in a real-world tech situation</p>

              <div className="sc-cards">
                {scenarios.map((s) => (
                  <div
                    key={s.id}
                    className={`sc-card ${scenario === s.id ? 'selected' : ''}`}
                    onClick={() => setScenario(s.id as Scenario)}
                  >
                    <div className="sc-card-icon">{s.icon}</div>
                    <div className="sc-card-label">{s.label}</div>
                    <div className="sc-card-desc">{s.desc}</div>
                  </div>
                ))}
              </div>

              <button className="sc-start-btn" onClick={startScenario}>
                Start Session →
              </button>
            </div>
          ) : (
            <div className="sc-chat">
              <div className="sc-chat-header">
                <div className="sc-chat-badge">
                  <div className="sc-chat-dot" />
                  {scenarios.find(s => s.id === scenario)?.icon}{' '}
                  {scenarios.find(s => s.id === scenario)?.label}
                </div>
                <button
                  className="sc-reset-btn"
                  onClick={() => { setStarted(false); setMessages([]) }}
                >
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
                     <div className="sc-msg-bubble"
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