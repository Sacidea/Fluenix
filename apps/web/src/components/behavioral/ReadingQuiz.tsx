'use client'

import React, { useState } from 'react'
import { VocabularyWord, FillInBlankExercise, ScenarioExercise } from '@/data/starReading'
import { BookA, Edit3, MessageSquare, CheckCircle2, XCircle } from 'lucide-react'

interface ReadingQuizProps {
  vocabulary?: VocabularyWord[]
  fillInBlank?: FillInBlankExercise
  scenario?: ScenarioExercise
}

export function ReadingQuiz({ vocabulary, fillInBlank, scenario }: ReadingQuizProps) {
  // State for Fill in the Blanks
  const [blankAnswers, setBlankAnswers] = useState<Record<number, string>>({})
  const [blankChecked, setBlankChecked] = useState(false)

  // State for Scenario
  const [scenarioAnswer, setScenarioAnswer] = useState<number | null>(null)

  const handleBlankChange = (index: number, value: string) => {
    setBlankAnswers(prev => ({ ...prev, [index]: value }))
  }

  const checkBlanks = () => {
    setBlankChecked(true)
  }

  const handleScenarioSelect = (index: number) => {
    if (scenarioAnswer === null) {
      setScenarioAnswer(index)
    }
  }

  return (
    <div className="reading-quiz-container" style={{ marginTop: '40px', borderTop: '2px dashed #e2e8f0', paddingTop: '32px' }}>
      
      {/* 1. Vocabulary Section */}
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

      {/* 2. Fill in the Blanks Section */}
      {fillInBlank && (
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Edit3 size={20} className="text-purple-600" />
            Grammar & Context: Fill in the Blanks
          </h3>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '16px', lineHeight: 2, color: '#334155' }}>
              {fillInBlank.sentenceParts.map((part, index) => {
                const isLastPart = index === fillInBlank.sentenceParts.length - 1;
                const correctWord = fillInBlank.missingWords[index];
                const userWord = blankAnswers[index] || '';
                const isCorrect = userWord === correctWord;
                
                let selectStyle = {
                  margin: '0 8px',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '2px solid #cbd5e1',
                  background: '#f8fafc',
                  outline: 'none',
                  fontSize: '15px',
                  color: userWord ? '#0f172a' : '#94a3b8',
                  fontWeight: userWord ? 700 : 400
                };

                if (blankChecked) {
                  selectStyle.border = isCorrect ? '2px solid #22c55e' : '2px solid #ef4444';
                  selectStyle.background = isCorrect ? '#f0fdf4' : '#fef2f2';
                  selectStyle.color = isCorrect ? '#166534' : '#991b1b';
                }

                return (
                  <React.Fragment key={index}>
                    {part}
                    {!isLastPart && (
                      <select 
                        value={userWord} 
                        onChange={(e) => handleBlankChange(index, e.target.value)}
                        style={selectStyle}
                        disabled={blankChecked && isCorrect}
                      >
                        <option value="" disabled>---</option>
                        {fillInBlank.wordBank.map((w, wIndex) => (
                          <option key={wIndex} value={w}>{w}</option>
                        ))}
                      </select>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={checkBlanks}
                style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Check Answers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Scenario Section */}
      {scenario && (
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <MessageSquare size={20} className="text-orange-600" />
            Interview Scenario: What would you say?
          </h3>

          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#0f172a', marginBottom: '20px' }}>
              {scenario.scenario}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {scenario.options.map((opt, optIndex) => {
                const hasAnswered = scenarioAnswer !== null;
                let btnStyle = {
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#334155',
                  textAlign: 'left' as const,
                  cursor: hasAnswered ? 'default' : 'pointer',
                  fontSize: '15px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }

                if (hasAnswered) {
                  if (optIndex === scenario.answerIndex) {
                    btnStyle.background = '#f0fdf4'
                    btnStyle.borderColor = '#22c55e'
                    btnStyle.color = '#166534'
                  } else if (optIndex === scenarioAnswer) {
                    btnStyle.background = '#fef2f2'
                    btnStyle.borderColor = '#ef4444'
                    btnStyle.color = '#991b1b'
                  } else {
                    btnStyle.opacity = '0.5'
                  }
                }

                return (
                  <button
                    key={optIndex}
                    style={btnStyle}
                    onClick={() => handleScenarioSelect(optIndex)}
                    disabled={hasAnswered}
                  >
                    <span>{opt}</span>
                    {hasAnswered && optIndex === scenario.answerIndex && <CheckCircle2 size={18} color="#22c55e" />}
                    {hasAnswered && optIndex === scenarioAnswer && optIndex !== scenario.answerIndex && <XCircle size={18} color="#ef4444" />}
                  </button>
                )
              })}
            </div>

            {scenarioAnswer !== null && (
              <div style={{ 
                marginTop: '20px', 
                padding: '16px', 
                borderRadius: '8px', 
                background: scenarioAnswer === scenario.answerIndex ? '#f0fdf4' : '#fef2f2',
                color: scenarioAnswer === scenario.answerIndex ? '#166534' : '#991b1b',
                fontSize: '15px',
                lineHeight: 1.6,
                borderLeft: '4px solid ' + (scenarioAnswer === scenario.answerIndex ? '#22c55e' : '#ef4444')
              }}>
                <strong>Why this is {scenarioAnswer === scenario.answerIndex ? 'Correct' : 'Incorrect'}:</strong> {scenario.explanation}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
