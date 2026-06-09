'use client'

import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { useWritingSession } from '@/hooks/useWritingSession'
import { WritingPaperCanvas } from '@/components/writing/WritingPaperCanvas'
import { writingExercises } from '@fluenix/shared'

export function WritingClient() {
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
              onClick={() => exerciseId ? changeExercise(null) : window.location.href = '/dashboard'} 
              className="back-link bg-transparent border-none cursor-pointer flex items-center gap-1 text-slate-500 text-[13px] font-semibold"
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
          <div className="max-w-[900px] mx-auto w-full pt-5">
            <div className="text-center mb-8">
              <h2 className="text-[32px] font-black text-slate-900 mb-3 font-serif">Select an Operation</h2>
              <p className="text-slate-600 text-base max-w-[600px] mx-auto">Choose a technical writing scenario to calibrate your FAANG-level communication skills.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              {writingExercises.map(ex => {
                return (
                  <button 
                    key={ex.id} 
                    onClick={() => changeExercise(ex.id)} 
                    className="flex items-start gap-5 bg-white rounded-2xl p-6 text-left cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] relative overflow-hidden group"
                    style={{ border: `2px solid ${ex.border}` }}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full" style={{ background: ex.color }} />
                    <div className="shrink-0 w-[52px] h-[52px] rounded-xl flex items-center justify-center" style={{ background: ex.bg, color: ex.color }}>
                      <DynamicIcon name={ex.icon} size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-1.5 font-serif">{ex.label}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed m-0">{ex.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : isLoadingMission || !activeMission || !exercise ? (
          <div className="writing-workspace flex items-center justify-center text-center p-[60px] bg-white rounded-2xl border border-slate-200 min-h-[400px] flex-col w-full max-w-[1000px] mx-auto">
            <div className="animate-spin w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full mb-4" />
            <h2 className="text-2xl font-black mb-2.5 text-slate-900">Generating Technical Scenario...</h2>
            <p className="text-slate-500">Our AI is preparing a new FAANG-style writing task for you.</p>
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
