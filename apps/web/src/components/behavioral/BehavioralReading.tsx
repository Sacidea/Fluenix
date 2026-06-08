'use client'

import React, { useState, useEffect } from 'react'
import { BookText, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useLevel } from '@/context/LevelContext'
import { starReadingData } from '@fluenix/shared'
import { ReadingQuiz } from '@/components/behavioral/ReadingQuiz'

export function BehavioralReading() {
  const { level } = useLevel()
  const [activeReadingIndex, setActiveReadingIndex] = useState(0)

  // Reset to first chapter if level changes
  useEffect(() => {
    setActiveReadingIndex(0)
  }, [level])

  const currentLevelPassages = starReadingData[level] || starReadingData['B2']
  const readingContent = currentLevelPassages[activeReadingIndex]

  if (!readingContent) return null;

  return (
    <div className="behavioral-reading-container">
      {/* Graded Reading Section with Chapters and Quiz */}
      <div className="graded-reading-section" style={{
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '0',
        display: 'flex',
        overflow: 'hidden',
        minHeight: '600px'
      }}>
        {/* Chapters Sidebar */}
        <div style={{ width: '250px', background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px 16px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>
              <BookText size={18} className="text-blue-600" />
              Reading Practice
            </div>
            <div style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, display: 'inline-block' }}>
              CEFR LEVEL: {level}
            </div>
          </div>
          
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentLevelPassages.map((passage, index) => (
              <button
                key={passage.id}
                onClick={() => setActiveReadingIndex(index)}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: 'none',
                  background: activeReadingIndex === index ? '#eff6ff' : 'transparent',
                  color: activeReadingIndex === index ? '#1d4ed8' : '#475569',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{passage.title}</span>
                {activeReadingIndex === index && <ChevronRight size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <div className="lesson-content-markdown" style={{ color: '#334155', lineHeight: 1.7 }}>
            <ReactMarkdown>{readingContent.content}</ReactMarkdown>
          </div>
          
          <ReadingQuiz 
            key={level + '-' + activeReadingIndex}
            vocabulary={readingContent.vocabulary} 
            fillInBlank={readingContent.fillInBlank}
            scenario={readingContent.scenario}
          />
        </div>
      </div>
    </div>
  )
}
