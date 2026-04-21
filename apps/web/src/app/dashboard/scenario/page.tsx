'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Send, Terminal, Users, FileCode, RotateCcw } from 'lucide-react'
import { useScenarioSession, scenarios } from '@/hooks/useScenarioSession'

export default function ScenarioPage() {
  const {
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
    activeScenario
  } = useScenarioSession()

  const IconMap: Record<string, any> = { Terminal, Users, FileCode }

  return (
    <div className="scenario-lab-root">
      {/* Header */}
      <header className="lab-header">
        <div className="header-content">
          <Link href="/dashboard" className="back-link">
            <ChevronLeft size={16} />
            <span>Dashboard</span>
          </Link>
          <div className="header-title-group">
            <span className="eyebrow">Simulation Environment</span>
            <h1 className="main-title">Scenario Transcript</h1>
          </div>
        </div>
      </header>

      <main className="lab-main">
        {!started ? (
          <section className="selector-view">
            <div className="selector-intro">
              <h2>Select Operational Context</h2>
              <p>AI will simulate a high-stakes professional environment based on your selection.</p>
            </div>

            <div className="scenarios-grid">
              {scenarios.map((s) => {
                const Icon = IconMap[s.icon]
                return (
                  <button
                    key={s.id}
                    className={`scenario-card ${scenario === s.id ? 'active' : ''}`}
                    onClick={() => setScenario(s.id as any)}
                  >
                    <div className="card-accent" style={{ background: s.color }} />
                    <div className="card-top">
                      <Icon size={24} style={{ color: scenario === s.id ? s.color : '#94a3b8' }} />
                      <span className="sc-tag">{s.id.replace('_', ' ')}</span>
                    </div>
                    <h3 className="sc-title">{s.label}</h3>
                    <p className="sc-desc">{s.desc}</p>
                  </button>
                )
              })}
            </div>

            <button className="start-btn" onClick={startScenario}>
              Initialize Simulation
            </button>
          </section>
        ) : (
          <section className="chat-view">
            <header className="chat-control">
              <div className="active-badge" style={{ color: activeScenario.color, background: `${activeScenario.color}10`, borderColor: `${activeScenario.color}30` }}>
                <span className="pulse-dot" style={{ background: activeScenario.color }} />
                <span className="badge-text">{activeScenario.label} Active</span>
              </div>
              <button className="reset-btn" onClick={endSession}>
                <RotateCcw size={14} />
                <span>Reset Terminal</span>
              </button>
            </header>

            <div className="transcript-area">
              {messages.map((msg, i) => (
                <div key={i} className={`transcript-entry ${msg.role}`}>
                  <div className="entry-meta">
                    <span className="meta-time">[{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                    <span className="meta-actor">{msg.role === 'assistant' ? 'SYSTEM_AI' : 'ENGINEER_USER'}</span>
                  </div>
                  <div 
                    className="entry-content"
                    dangerouslySetInnerHTML={{
                      __html: msg.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />
                </div>
              ))}
              
              {loading && (
                <div className="transcript-entry assistant typing">
                   <div className="entry-meta">
                    <span className="meta-time">[...]</span>
                    <span className="meta-actor">SYSTEM_AI</span>
                  </div>
                  <div className="typing-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <footer className="input-area">
              <input
                className="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Enter command or response..."
              />
              <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
                <Send size={18} />
              </button>
            </footer>
          </section>
        )}
      </main>

      <style jsx>{`
        .scenario-lab-root {
          min-height: 100vh;
          background-color: #f8fafc;
          display: flex;
          flex-direction: column;
        }

        .lab-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 40px;
        }

        .header-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          margin-bottom: 12px;
        }

        .eyebrow {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #6366f1;
          font-weight: 800;
        }

        .main-title {
          font-size: 28px;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
        }

        .lab-main {
          flex: 1;
          max-width: 1000px;
          width: 100%;
          margin: 0 auto;
          padding: 40px;
        }

        /* Selector View */
        .selector-intro { text-align: center; margin-bottom: 40px; }
        .selector-intro h2 { font-size: 32px; font-weight: 900; color: #0f172a; margin-bottom: 8px; }
        .selector-intro p { color: #64748b; font-size: 16px; }

        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .scenario-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 32px;
          text-align: left;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }

        .scenario-card:hover { transform: translateY(-4px); border-color: #cbd5e1; }
        .scenario-card.active { border-color: #6366f1; box-shadow: 0 10px 30px rgba(99,102,241,0.1); }

        .card-accent { position: absolute; top: 0; left: 0; width: 100%; height: 3px; }
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .sc-tag { font-size: 9px; font-weight: 800; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px; }
        .sc-title { font-size: 18px; font-weight: 900; color: #0f172a; margin-bottom: 8px; }
        .sc-desc { font-size: 13px; color: #64748b; line-height: 1.5; }

        .start-btn {
          width: 100%;
          padding: 20px;
          background: #4338ca;
          color: white;
          border: none;
          border-radius: 16px;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 10px 25px -5px rgba(67, 56, 202, 0.3);
        }

        /* Chat View */
        .chat-view {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 240px);
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          overflow: hidden;
        }

        .chat-control {
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .active-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 800;
          border: 1px solid;
          text-transform: uppercase;
        }

        .pulse-dot { width: 6px; height: 6px; border-radius: 50%; }

        .reset-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
        }

        .transcript-area {
          flex: 1;
          overflow-y: auto;
          padding: 32px;
          background: #fafafa;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .transcript-entry {
          max-width: 85%;
        }

        .transcript-entry.user { align-self: flex-end; }

        .entry-meta {
          display: flex;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          margin-bottom: 6px;
          color: #94a3b8;
        }

        .meta-actor { font-weight: 800; }

        .entry-content {
          font-family: 'Georgia', serif;
          font-size: 15px;
          line-height: 1.6;
          padding: 16px 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .assistant .entry-content {
          background: white;
          color: #0f172a;
          border: 1px solid #e2e8f0;
          border-left: 3px solid #4338ca;
        }

        .user .entry-content {
          background: #4338ca;
          color: white;
        }

        .typing-dots span {
          display: inline-block;
          animation: blink 1.4s infinite;
          font-size: 24px;
          line-height: 0;
        }

        @keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

        .input-area {
          padding: 24px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          gap: 12px;
        }

        .terminal-input {
          flex: 1;
          padding: 14px 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s;
        }

        .terminal-input:focus { border-color: #4338ca; }

        .send-btn {
          width: 48px;
          height: 48px;
          background: #4338ca;
          color: white;
          border: none;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  )
}