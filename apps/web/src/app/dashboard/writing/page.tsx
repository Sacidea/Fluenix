'use client'

import React from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ChevronLeft } from 'lucide-react'
import { useWritingSession } from '@/hooks/useWritingSession'

import { WritingPaperCanvas } from '@/components/writing/WritingPaperCanvas'
import { writingExercises } from '@fluenix/shared'

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
    exerciseId,
    isLoadingMission,
    loadNextMission
  } = useWritingSession()

  return (
    <div className="writing-lab-root">
      {/* Header Area */}
      <header className="lab-header">
        <div className="header-content">
          <div className="header-left">
            <button 
              onClick={() => exerciseId ? changeExercise(null as any) : window.location.href = '/dashboard'} 
              className="back-link" 
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '13px', fontWeight: 600 }}
            >
              <ChevronLeft size={16} />
              <span>{exerciseId ? 'Back to Lobby' : 'Dashboard'}</span>
            </button>
            <div className="header-title-group">
              <span className="eyebrow">Technical Drafting</span>
              <h1 className="main-title">Engineer's Ledger</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="lab-main">
        {!exerciseId ? (
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', paddingTop: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', marginBottom: '12px', fontFamily: 'var(--font-serif)' }}>Select an Operation</h2>
              <p style={{ color: '#475569', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>Choose a technical writing scenario to calibrate your FAANG-level communication skills.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {writingExercises.map(ex => {
                const Icon = (Icons as any)[ex.icon]
                return (
                  <button 
                    key={ex.id} 
                    onClick={() => changeExercise(ex.id)} 
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', background: 'white', borderRadius: '16px', padding: '24px', border: `2px solid ${ex.border}`, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                    }} 
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: ex.color }} />
                    <div style={{ flexShrink: 0, width: '52px', height: '52px', borderRadius: '12px', background: ex.bg, color: ex.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>{ex.label}</h3>
                      <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{ex.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : isLoadingMission || !activeMission || !exercise ? (
          <div className="writing-workspace" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', minHeight: '400px', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="animate-spin" style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', marginBottom: '16px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px', color: '#0f172a' }}>Generating Technical Scenario...</h2>
            <p style={{ color: '#64748b' }}>Our AI is preparing a new FAANG-style writing task for you.</p>
          </div>
        ) : (
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
            onNext={() => loadNextMission(exerciseId)}
          />
        )}
      </main>
    </div>
  )
}