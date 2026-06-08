'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { CheckCircle2, XCircle, Wand2, Loader2 } from 'lucide-react'
import { useUser, useAuth } from '@clerk/nextjs'
import axios from 'axios'
import { ErrorScenario } from '@/data/error-decoding'
import { useLevel } from '@/context/LevelContext'

// Helper function to render text with interactive highlights
function renderContentWithHighlights(content: string, highlights?: { word: string, tooltip: string }[]) {
  if (!highlights || highlights.length === 0) return content

  const words = highlights.map(h => h.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp("(" + words.join('|') + ")", 'g')
  const parts = content.split(regex)

  return parts.map((part, i) => {
    const highlight = highlights.find(h => h.word === part)
    if (highlight) {
      return (
        <span key={i} className="interactive-highlight">
          {part}
          <span className="tooltip">{highlight.tooltip}</span>
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

const ROUNDS_PER_SESSION = 3

export function ErrorWorkspace() {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const { level: contextLevel } = useLevel()
  
  const [scenario, setScenario] = useState<ErrorScenario | null>(null)
  const [loading, setLoading] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showEli5, setShowEli5] = useState(false)

  const fetchScenario = useCallback(async () => {
    if (!isLoaded || !user) return
    setLoading(true)
    try {
      const level = contextLevel || (user.publicMetadata.level as string) || 'B2'
      const role = (user.publicMetadata.role as string) || 'Full Stack'
      
      const token = await getToken()
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/error-decoding/scenario`, {
        level,
        role
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      })
      
      const data = typeof res.data.scenario === 'string' ? JSON.parse(res.data.scenario) : res.data.scenario
      setScenario(data)
    } catch (err) {
      console.error('Failed to fetch scenario', err)
    } finally {
      setLoading(false)
    }
  }, [isLoaded, user, contextLevel])

  // Reset workspace if level changes globally
  useEffect(() => {
    if (isLoaded && user) {
      setSessionCount(0)
      setCorrectAnswers(0)
      setSelectedOptionId(null)
      setIsAnswered(false)
      setShowEli5(false)
      setScenario(null)
    }
  }, [contextLevel, isLoaded, user])

  useEffect(() => {
    if (sessionCount === 0 && !scenario && !loading) {
      fetchScenario()
    }
  }, [fetchScenario, sessionCount, scenario, loading])

  const saveSessionProgress = async (finalScore: number) => {
    try {
      const token = await getToken()
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/sessions/complete`,
        {
          type: 'error-decoding',
          score: finalScore,
          duration: ROUNDS_PER_SESSION * 60, // approximate 3 minutes
          feedback: { rounds: ROUNDS_PER_SESSION, correct: correctAnswers }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (err) {
      console.error('Failed to save session progress', err)
    }
  }

  if (sessionCount >= ROUNDS_PER_SESSION) {
    const finalScore = Math.round((correctAnswers / ROUNDS_PER_SESSION) * 100)
    return (
      <div className="error-workspace" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white', padding: '60px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>Session Complete!</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>You scored {finalScore}% ({correctAnswers}/{ROUNDS_PER_SESSION} correct).</p>
        <button 
          className="btn-next" 
          style={{ width: 'auto', padding: '12px 30px' }}
          onClick={() => {
            saveSessionProgress(finalScore)
            setSessionCount(0)
            setCorrectAnswers(0)
            setSelectedOptionId(null)
            setIsAnswered(false)
            setShowEli5(false)
            setScenario(null)
            fetchScenario()
          }}
        >
          Save Progress & Continue
        </button>
      </div>
    )
  }

  if (loading || !scenario) {
    return (
      <div className="error-workspace" style={{ alignItems: 'center', justifyContent: 'center', background: 'white', padding: '60px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <Loader2 className="animate-spin" size={32} color="#6366f1" />
        <p style={{ color: '#64748b', marginTop: '16px', fontWeight: 600 }}>Analyzing logs and generating dynamic scenario...</p>
      </div>
    )
  }

  const handleOptionClick = (id: string) => {
    if (isAnswered) return
    setSelectedOptionId(id)
    setIsAnswered(true)
    const opt = scenario?.options?.find(o => o.id === id)
    if (opt?.isCorrect) {
      setCorrectAnswers(p => p + 1)
    }
  }

  const handleNext = () => {
    setSessionCount(p => p + 1)
    if (sessionCount + 1 < ROUNDS_PER_SESSION) {
      setSelectedOptionId(null)
      setIsAnswered(false)
      setShowEli5(false)
      fetchScenario()
    } else {
      // If the session count has reached the limit, do not fetch immediately
      // The session complete screen will appear on the next render
    }
  }

  const selectedOption = scenario?.options?.find(o => o.id === selectedOptionId)

  return (
    <div className="error-workspace">
      
      {/* Visual Content Block */}
      {scenario.type === 'stack-trace' ? (
        <div className="terminal-block">
          <div className="terminal-header">
            <div className="mac-dots">
              <div className="mac-dot red" />
              <div className="mac-dot yellow" />
              <div className="mac-dot green" />
              <span className="terminal-title">{scenario.title}</span>
            </div>
            {scenario.eli5 && (
              <button className="eli5-btn" onClick={() => setShowEli5(!showEli5)}>
                <Wand2 size={12} />
                Explain like I'm 5
              </button>
            )}
          </div>
          <div className="terminal-body">
            <pre className="code-content">
              {renderContentWithHighlights(scenario.content, scenario.highlights)}
            </pre>
          </div>
          {showEli5 && scenario.eli5 && (
            <div className="eli5-panel">
              <div className="eli5-icon"><Wand2 size={16} /></div>
              <p className="eli5-text">{scenario.eli5}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="doc-block">
          <div className="doc-header">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Documentation Snapshot
            </div>
            {scenario.eli5 && (
              <button 
                className="eli5-btn" 
                style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0284c7', borderColor: 'rgba(14, 165, 233, 0.2)' }}
                onClick={() => setShowEli5(!showEli5)}
              >
                <Wand2 size={12} />
                Explain like I'm 5
              </button>
            )}
          </div>
          <div className="doc-body">
            <pre className="doc-content">
              {renderContentWithHighlights(scenario.content, scenario.highlights)}
            </pre>
          </div>
          {showEli5 && scenario.eli5 && (
            <div className="eli5-panel" style={{ background: '#f0f9ff', borderTopColor: '#bae6fd' }}>
              <div className="eli5-icon" style={{ background: '#0ea5e9' }}><Wand2 size={16} /></div>
              <p className="eli5-text" style={{ color: '#0369a1' }}>{scenario.eli5}</p>
            </div>
          )}
        </div>
      )}

      {/* Quiz Section */}
      <div className="quiz-section">
        <h3 className="question-text">{scenario.question}</h3>
        
        <div className="options-list">
          {(scenario?.options || []).map(opt => {
            const isSelected = selectedOptionId === opt.id
            let btnClass = 'option-btn'
            
            if (isAnswered) {
              if (opt.isCorrect) btnClass += ' correct'
              else if (isSelected) btnClass += ' incorrect'
            } else if (isSelected) {
              btnClass += ' selected'
            }

            return (
              <button
                key={opt.id}
                className={btnClass}
                onClick={() => handleOptionClick(opt.id)}
                disabled={isAnswered}
              >
                {opt.text}
              </button>
            )
          })}
        </div>

        {isAnswered && selectedOption && (
          <div className={`feedback-box ${selectedOption.isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-header">
              {selectedOption.isCorrect ? (
                <><CheckCircle2 size={20} /> Correct!</>
              ) : (
                <><XCircle size={20} /> Incorrect</>
              )}
            </div>
            <p className="feedback-explanation">{selectedOption.explanation}</p>
          </div>
        )}

        {isAnswered && (
          <button className="btn-next" onClick={handleNext}>
            {sessionCount + 1 >= ROUNDS_PER_SESSION ? 'Finish Session' : 'Next Scenario'}
          </button>
        )}
      </div>

    </div>
  )
}
