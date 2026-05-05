'use client'

import React, { useState, useEffect } from 'react'
import { mockVocabulary } from '@/data/vocabulary'
import { Flashcard } from './Flashcard'
import { X, Check, Trophy } from 'lucide-react'

function shuffle(array: any[]) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const SESSION_SIZE = 10

export function FlashcardWorkspace() {
  const [sessionWords, setSessionWords] = useState<typeof mockVocabulary>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [needsReview, setNeedsReview] = useState(0)
  const [mastered, setMastered] = useState(0)

  useEffect(() => {
    setSessionWords(shuffle(mockVocabulary).slice(0, SESSION_SIZE))
    
    // Pre-load voices to prevent race condition on first TTS play
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      // Some browsers (like Chrome) load voices asynchronously
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  const handleNext = (status: 'review' | 'got_it') => {
    if (status === 'review') setNeedsReview(p => p + 1)
    else setMastered(p => p + 1)

    setIsFlipped(false)
    setTimeout(() => {
      if (currentIndex < sessionWords.length - 1) setCurrentIndex(p => p + 1)
      else setIsFinished(true)
    }, 350)
  }

  const handleRestart = () => {
    setSessionWords(shuffle(mockVocabulary).slice(0, SESSION_SIZE))
    setCurrentIndex(0)
    setIsFlipped(false)
    setIsFinished(false)
    setNeedsReview(0)
    setMastered(0)
  }

  if (sessionWords.length === 0) return null

  if (isFinished) {
    const masteredPct = Math.round((mastered / SESSION_SIZE) * 100)
    return (
      <div className="vocab-workspace">
        <div className="completion-state">
          <div className="trophy-icon">
            <Trophy size={34} />
          </div>
          <h2>Session Complete</h2>
          <p>You reviewed {SESSION_SIZE} FAANG-level technical terms.</p>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#059669' }}>{mastered}</div>
              <div className="stat-label">Mastered</div>
            </div>
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#8b5cf6' }}>{masteredPct}%</div>
              <div className="stat-label">Score</div>
            </div>
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#dc2626' }}>{needsReview}</div>
              <div className="stat-label">Review</div>
            </div>
          </div>

          <button className="btn-restart" onClick={handleRestart}>
            Start New Session
          </button>
        </div>
      </div>
    )
  }

  const currentWord = sessionWords[currentIndex]

  return (
    <div className="vocab-workspace">

      {/* Progress */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '2px' }}>
            {currentIndex + 1} / {sessionWords.length}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#94a3b8' }}>
            {currentWord.difficulty.toUpperCase()}
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((currentIndex) / sessionWords.length) * 100}%` }} />
        </div>
        <div className="step-progress">
          {sessionWords.map((_, i) => (
            <div
              key={i}
              className={`step-dot ${i < currentIndex ? 'done' : i === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Flashcard */}
      <Flashcard
        word={currentWord}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />

      {/* Action Buttons (visible only after flip) */}
      <div className={`action-buttons ${isFlipped ? 'visible' : ''}`}>
        <button className="btn-review" onClick={() => handleNext('review')}>
          <X size={18} strokeWidth={3} />
          Needs Review
        </button>
        <button className="btn-gotit" onClick={() => handleNext('got_it')}>
          <Check size={18} strokeWidth={3} />
          Got It
        </button>
      </div>

    </div>
  )
}
