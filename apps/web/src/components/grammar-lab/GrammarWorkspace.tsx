'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLevel } from '@/context/LevelContext'
import { CheckCircle2, XCircle, AlertCircle, Loader2, MessageSquare } from 'lucide-react'

// --- Types ---
type TextSegment = {
  text: string
  isClickable: boolean
  isError?: boolean
  options?: string[]
  correctOption?: string
  explanation?: string
}

type GrammarExercise = {
  id: string
  title: string
  context: string
  level: string
  segments: TextSegment[]
}

// --- Component ---
export function GrammarWorkspace() {
  const { level } = useLevel()
  const [exercises, setExercises] = useState<GrammarExercise[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [wrongShakeIndex, setWrongShakeIndex] = useState<number | null>(null)
  
  // State for the currently found error
  const [foundErrorIndex, setFoundErrorIndex] = useState<number | null>(null)
  const [selectedFix, setSelectedFix] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  // Fetch exercises when level changes
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/grammar?level=${level}`)
      .then(res => {
        if (res.data.success) {
          setExercises(res.data.data)
          setCurrentIndex(0)
          resetExerciseState()
        }
      })
      .catch(err => console.error("Failed to load grammar exercises", err))
      .finally(() => setIsLoading(false))
  }, [level])

  const resetExerciseState = () => {
    setWrongShakeIndex(null)
    setFoundErrorIndex(null)
    setSelectedFix(null)
    setIsAnswered(false)
  }

  const handleNext = () => {
    setCurrentIndex(p => p + 1)
    resetExerciseState()
  }

  const handleSegmentClick = (segment: TextSegment, index: number) => {
    if (!segment.isClickable || foundErrorIndex !== null) return

    if (segment.isError) {
      setFoundErrorIndex(index)
    } else {
      setWrongShakeIndex(index)
      setTimeout(() => setWrongShakeIndex(null), 500)
    }
  }

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return
    setSelectedFix(option)
    setIsAnswered(true)
  }

  if (isLoading) {
    return (
      <div className="grammar-lab-workspace" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin text-green-500" size={48} style={{ marginBottom: '16px', color: '#10b981' }} />
        <h2 style={{ color: '#0f172a' }}>Loading Exercises...</h2>
      </div>
    )
  }

  const exercise = exercises[currentIndex]

  if (!exercise) {
    return (
      <div className="grammar-lab-workspace" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px' }}>
        <CheckCircle2 size={64} color="#10b981" style={{ marginBottom: '24px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>Level Complete!</h2>
        <p style={{ color: '#64748b' }}>You have resolved all grammar issues for this level.</p>
      </div>
    )
  }

  const errorSegment = foundErrorIndex !== null ? exercise.segments[foundErrorIndex] : null
  const isFixCorrect = errorSegment && selectedFix === errorSegment.correctOption

  return (
    <div className="grammar-lab-workspace">
      
      {/* Header */}
      <div className="grammar-header">
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{exercise.title}</h3>
          <div className="grammar-context">
            <MessageSquare size={14} />
            {exercise.context}
          </div>
        </div>
        <div style={{ background: '#e2e8f0', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, color: '#475569' }}>
          Exercise {currentIndex + 1} of {exercises.length}
        </div>
      </div>

      {/* Main Content */}
      <div className="grammar-content">
        
        {foundErrorIndex === null ? (
          <div className="grammar-instruction">
            Find the grammatical error in the text below. Click on the incorrect phrase.
          </div>
        ) : (
          <div className="grammar-instruction" style={{ color: '#10b981' }}>
            <CheckCircle2 size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
            Error Found! Now select the correct fix.
          </div>
        )}

        {/* Linter View */}
        <div className="linter-view">
          {exercise.segments.map((seg, idx) => {
            
            let className = 'text-segment'
            if (seg.isClickable) className += ' clickable'
            if (wrongShakeIndex === idx) className += ' shake'
            
            if (foundErrorIndex === idx) {
              if (isAnswered && isFixCorrect) {
                return <span key={idx} className="text-segment corrected">{seg.correctOption}</span>
              }
              return <span key={idx} className="text-segment found-error">{seg.text}</span>
            }

            return (
              <span 
                key={idx} 
                className={className}
                onClick={() => handleSegmentClick(seg, idx)}
              >
                {seg.text}
              </span>
            )
          })}
        </div>

        {/* Fix Options (Appears after finding the error) */}
        {errorSegment && (
          <div className="grammar-options-container">
            <div className="options-grid">
              {errorSegment.options?.map((opt, idx) => {
                const isSelected = selectedFix === opt
                const isCorrect = opt === errorSegment.correctOption
                
                let btnClass = 'grammar-option-btn'
                if (isAnswered) {
                  if (isCorrect) btnClass += ' correct'
                  else if (isSelected && !isCorrect) btnClass += ' wrong'
                }

                return (
                  <button 
                    key={idx}
                    className={btnClass}
                    onClick={() => handleOptionSelect(opt)}
                    disabled={isAnswered}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 size={20} />}
                    {isAnswered && isSelected && !isCorrect && <XCircle size={20} />}
                  </button>
                )
              })}
            </div>

            {/* Explanation Box */}
            {isAnswered && (
              <div className="grammar-explanation">
                <h4>
                  <AlertCircle size={20} />
                  Grammar Rule
                </h4>
                <p>{errorSegment.explanation}</p>
                <button className="btn-next-exercise" onClick={handleNext}>
                  {currentIndex === exercises.length - 1 ? 'Finish Module' : 'Next Exercise'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
