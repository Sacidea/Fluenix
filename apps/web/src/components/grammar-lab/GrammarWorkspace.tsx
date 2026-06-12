'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/lib/apiClient'
import { useLevel } from '@/context/LevelContext'
import { useAuth, useUser } from '@clerk/nextjs'
import { API_ROUTES } from '@fluenix/shared'
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
  const { getToken } = useAuth()
  const { user } = useUser()
  
  const [exercise, setExercise] = useState<GrammarExercise | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionCount, setSessionCount] = useState(0)

  const [wrongShakeIndex, setWrongShakeIndex] = useState<number | null>(null)
  
  // State for the currently found error
  const [foundErrorIndex, setFoundErrorIndex] = useState<number | null>(null)
  const [selectedFix, setSelectedFix] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const fetchExercise = useCallback(async () => {
    setIsLoading(true)
    try {
      const token = await getToken()
      if (!token) return // Wait for token
      const res = await apiClient.post('/api/grammar/next', 
        { level },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      
      if (res.data.success && res.data.data) {
        setExercise(res.data.data)
      } else {
        setExercise(null)
      }
    } catch (err) {
      console.error("Failed to load grammar exercise", err)
      setExercise(null)
    } finally {
      setIsLoading(false)
    }
  }, [level, getToken])

  // Fetch when level changes or we reset
  useEffect(() => {
    setSessionCount(0)
    resetExerciseState()
    fetchExercise()
  }, [level, fetchExercise])

  const resetExerciseState = () => {
    setWrongShakeIndex(null)
    setFoundErrorIndex(null)
    setSelectedFix(null)
    setIsAnswered(false)
  }

  const handleNext = () => {
    setSessionCount(p => p + 1)
    resetExerciseState()
    fetchExercise()
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

  const handleOptionSelect = async (option: string) => {
    if (isAnswered || !exercise) return
    setSelectedFix(option)
    setIsAnswered(true)

    const errorSegment = foundErrorIndex !== null ? exercise.segments[foundErrorIndex] : null
    const isCorrect = errorSegment && option === errorSegment.correctOption

    // Her durumda (doğru veya yanlış) soruyu gördü olarak işaretle ki bir sonraki soruya geçebilsin.
    try {
      const token = await getToken()
      await apiClient.post('/api/grammar/mark-seen', 
        { exerciseId: exercise.id },
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      )
      
      // Kaydetme işlemi (Progress Map'e yansıması için)
      if (user) {
        await apiClient.post(API_ROUTES.SESSIONS, {
          userId: user.id,
          type: 'grammar',
          scenario: exercise.title || 'Grammar Linter',
          duration: 0,
          score: isCorrect ? 100 : 0,
          feedback: null
        }, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        });
      }

    } catch (err) {
      console.error('Failed to mark exercise as seen or save session', err)
    }
  }

  if (isLoading) {
    return (
      <div className="grammar-lab-workspace" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin text-green-500" size={48} style={{ marginBottom: '16px', color: '#10b981' }} />
        <h2 style={{ color: '#0f172a' }}>Loading Exercises...</h2>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="grammar-lab-workspace" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px' }}>
        <CheckCircle2 size={64} color="#10b981" style={{ marginBottom: '24px' }} />
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>Generating Scenarios...</h2>
        <p style={{ color: '#64748b' }}>Our AI is preparing new advanced grammar exercises for you. Check back in a few seconds!</p>
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
          Exercise {sessionCount + 1}
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
                  Next Exercise
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
