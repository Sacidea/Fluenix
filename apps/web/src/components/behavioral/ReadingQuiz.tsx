'use client'

import React, { useState } from 'react'
import { VocabularyWord, ReadingQuestion } from '@/data/starReading'
import { BookA, HelpCircle, CheckCircle2, XCircle } from 'lucide-react'

interface ReadingQuizProps {
  vocabulary: VocabularyWord[]
  questions: ReadingQuestion[]
}

export function ReadingQuiz({ vocabulary, questions }: ReadingQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})

  const handleSelect = (qIndex: number, optIndex: number) => {
    // Only allow selecting if not already answered
    if (selectedAnswers[qIndex] === undefined) {
      setSelectedAnswers(prev => ({ ...prev, [qIndex]: optIndex }))
    }
  }

  return (
    <div className="reading-quiz-container" style={{ marginTop: '40px', borderTop: '2px dashed #e2e8f0', paddingTop: '32px' }}>
      
      {/* Vocabulary Section */}
      {vocabulary && vocabulary.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BookA size={20} className="text-blue-600" />
            Key Vocabulary
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {vocabulary.map((v, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <div style={{ fontWeight: 800, color: '#1e40af', marginBottom: '4px', fontSize: '15px' }}>{v.word}</div>
                <div style={{ color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>{v.meaning}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comprehension Quiz Section */}
      {questions && questions.length > 0 && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <HelpCircle size={20} className="text-blue-600" />
            Comprehension Check
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {questions.map((q, qIndex) => {
              const hasAnswered = selectedAnswers[qIndex] !== undefined
              const isCorrect = selectedAnswers[qIndex] === q.answerIndex

              return (
                <div key={qIndex} style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: '#0f172a', marginBottom: '16px' }}>
                    {qIndex + 1}. {q.question}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {q.options.map((opt, optIndex) => {
                      let btnStyle = {
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        background: '#ffffff',
                        color: '#334155',
                        textAlign: 'left' as const,
                        cursor: hasAnswered ? 'default' : 'pointer',
                        fontSize: '15px',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }

                      if (hasAnswered) {
                        if (optIndex === q.answerIndex) {
                          // This is the correct answer
                          btnStyle.background = '#f0fdf4'
                          btnStyle.borderColor = '#22c55e'
                          btnStyle.color = '#166534'
                        } else if (optIndex === selectedAnswers[qIndex]) {
                          // This is the wrong answer the user clicked
                          btnStyle.background = '#fef2f2'
                          btnStyle.borderColor = '#ef4444'
                          btnStyle.color = '#991b1b'
                        } else {
                          // Unselected wrong answers
                          btnStyle.opacity = '0.5'
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          style={btnStyle}
                          onClick={() => handleSelect(qIndex, optIndex)}
                          disabled={hasAnswered}
                        >
                          <span>{opt}</span>
                          {hasAnswered && optIndex === q.answerIndex && <CheckCircle2 size={18} color="#22c55e" />}
                          {hasAnswered && optIndex === selectedAnswers[qIndex] && optIndex !== q.answerIndex && <XCircle size={18} color="#ef4444" />}
                        </button>
                      )
                    })}
                  </div>

                  {hasAnswered && (
                    <div style={{ 
                      marginTop: '16px', 
                      padding: '16px', 
                      borderRadius: '8px', 
                      background: isCorrect ? '#f0fdf4' : '#fef2f2',
                      color: isCorrect ? '#166534' : '#991b1b',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      borderLeft: \`4px solid \${isCorrect ? '#22c55e' : '#ef4444'}\`
                    }}>
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}
