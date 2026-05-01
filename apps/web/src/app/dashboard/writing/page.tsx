'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useWritingSession } from '@/hooks/useWritingSession'
import { WritingExerciseTabs } from '@/components/writing/WritingExerciseTabs'
import { WritingPaperCanvas } from '@/components/writing/WritingPaperCanvas'

export default function WritingPage() {
  const {
    exercise,
    activeMission,
    userText,
    setUserText,
    feedback,
    loading,
    error,
    analyzeWriting,
    changeExercise,
    exerciseId
  } = useWritingSession()

  return (
    <div className="writing-lab-root">
      {/* Header Area */}
      <header className="lab-header">
        <div className="header-content">
          <div className="header-left">
            <Link href="/dashboard" className="back-link">
              <ChevronLeft size={16} />
              <span>Dashboard</span>
            </Link>
            <div className="header-title-group">
              <span className="eyebrow">Technical Drafting</span>
              <h1 className="main-title">Engineer's Ledger</h1>
            </div>
          </div>
          
          <div className="header-right">
            <WritingExerciseTabs 
              activeId={exerciseId} 
              onSelect={changeExercise} 
            />
          </div>
        </div>
      </header>

      <main className="lab-main">
        <WritingPaperCanvas 
          exercise={exercise}
          activeMission={activeMission}
          value={userText}
          onChange={setUserText}
          onSubmit={analyzeWriting}
          disabled={loading}
          loading={loading}
          feedback={feedback}
          error={error}
        />
      </main>
    </div>
  )
}