'use client'

import React, { useState } from 'react'
import { mockErrorScenarios } from '@/data/error-decoding'
import { CheckCircle2, XCircle, Wand2 } from 'lucide-react'

// Helper function to render text with interactive highlights
function renderContentWithHighlights(content: string, highlights?: { word: string, tooltip: string }[]) {
  if (!highlights || highlights.length === 0) return content

  // Build a regex to match all highlight words
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

export function ErrorWorkspace() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showEli5, setShowEli5] = useState(false)

  if (currentIndex >= mockErrorScenarios.length) {
    return (
      <div className="error-workspace" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white', padding: '60px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>Session Complete!</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>You have reviewed all error scenarios for today.</p>
        <button 
          className="btn-next" 
          style={{ width: 'auto', padding: '12px 30px' }}
          onClick={() => {
            setCurrentIndex(0)
            setSelectedOptionId(null)
            setIsAnswered(false)
            setShowEli5(false)
          }}
        >
          Restart Session
        </button>
      </div>
    )
  }

  const scenario = mockErrorScenarios[currentIndex]

  const handleOptionClick = (id: string) => {
    if (isAnswered) return
    setSelectedOptionId(id)
    setIsAnswered(true)
  }

  const handleNext = () => {
    setCurrentIndex(p => p + 1)
    setSelectedOptionId(null)
    setIsAnswered(false)
    setShowEli5(false)
  }

  const selectedOption = scenario.options.find(o => o.id === selectedOptionId)

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
          {scenario.options.map(opt => {
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
            {currentIndex === mockErrorScenarios.length - 1 ? 'Finish Session' : 'Next Scenario'}
          </button>
        )}
      </div>

    </div>
  )
}
