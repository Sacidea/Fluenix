import React from 'react'
import { Send, Mic, Square, RotateCcw, CheckCircle } from 'lucide-react'
import { Message, ScenarioMission } from '@fluenix/shared'
import DOMPurify from 'isomorphic-dompurify'

interface SimulationWorkspaceProps {
  activeScenario: { id: string; label: string; desc: string; color: string }
  activeMission: ScenarioMission | null
  durationStr: string
  messages: Message[]
  input: string
  setInput: (v: string) => void
  loading: boolean
  listening: boolean
  startListening: () => void
  stopListening: () => void
  sendMessage: () => void
  endSession: () => void
  endAndAnalyzeSession: () => void
  bottomRef: React.RefObject<HTMLDivElement | null>
}

export function SimulationWorkspace({
  activeScenario,
  activeMission,
  durationStr,
  messages,
  input,
  setInput,
  loading,
  listening,
  startListening,
  stopListening,
  sendMessage,
  endSession,
  endAndAnalyzeSession,
  bottomRef
}: SimulationWorkspaceProps) {
  return (
    <section className="simulation-workspace">
      
      {/* Left Panel: Mission Briefing */}
      <aside className="mission-briefing">
        <div className="briefing-header">
          <div className="briefing-title">
            <span className="comms-pulse" style={{ background: activeScenario.color, boxShadow: `0 0 10px ${activeScenario.color}` }} />
            Active Protocol
          </div>
          <h2 className="briefing-scenario-name" style={{ color: activeScenario.color }}>
            {activeScenario.label}
          </h2>
        </div>

        <div className="briefing-section">
          <h4>Mission Objective</h4>
          <p>{activeMission?.content || activeScenario.desc}</p>
        </div>

        <div className="briefing-section">
          <h4>AI Persona</h4>
          <p>Senior Engineering Manager (FAANG). Will evaluate your technical accuracy, clarity, and vocabulary.</p>
        </div>

        <div className="timer-display">
          {durationStr}
        </div>
      </aside>

      {/* Right Panel: Comms Channel */}
      <div className="comms-channel">
        <header className="comms-header">
          <div className="comms-status">
            <span className="comms-pulse" />
            <span className="comms-status-text">SECURE CHANNEL ESTABLISHED</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="end-session-btn" onClick={endSession} style={{ borderColor: '#475569', color: '#94a3b8' }}>
              <RotateCcw size={14} />
              <span>Abort</span>
            </button>
            <button 
              className="end-session-btn" 
              onClick={endAndAnalyzeSession}
              style={{ borderColor: '#10b981', color: '#10b981' }}
              disabled={loading}
            >
              <CheckCircle size={14} />
              <span>{loading ? 'Evaluating...' : 'Complete & Analyze'}</span>
            </button>
          </div>
        </header>

        <div className="comms-transcript">
          {messages.map((msg, i) => (
            <div key={i} className={`msg-wrapper ${msg.role}`}>
              <div className="msg-meta">
                <span>[{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className="msg-actor">{msg.role === 'assistant' ? 'SYSTEM_AI' : 'ENGINEER_USER'}</span>
              </div>
              <div 
                className="msg-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(msg.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>'))
                }}
              />
            </div>
          ))}
          
          {loading && (
            <div className="msg-wrapper assistant">
              <div className="msg-meta">
                <span>[...]</span>
                <span className="msg-actor">SYSTEM_AI</span>
              </div>
              <div className="typing-indicator">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <footer className="comms-input-area">
          <button 
            className={`voice-btn ${listening ? 'listening' : 'idle'}`}
            onClick={listening ? stopListening : startListening}
            title={listening ? "Click to stop recording" : "Click to start recording"}
          >
            {listening ? <Square size={20} /> : <Mic size={20} />}
          </button>
          
          <input
            className="comms-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Click mic to speak or type here..."
            disabled={listening}
          />
          
          <button 
            className="send-btn" 
            onClick={() => sendMessage()} 
            disabled={loading || !input.trim() || listening}
          >
            <Send size={18} />
          </button>
        </footer>
      </div>

    </section>
  )
}
