'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, PenLine, Send } from 'lucide-react'
import { WritingExercise, WritingMission } from '@/data/writingExercises'
import { WritingNoteFeedback } from './WritingNoteFeedback'

interface Props {
  exercise: WritingExercise
  activeMission: WritingMission | null
  value: string
  onChange: (val: string) => void
  onSubmit: () => void
  disabled?: boolean
  loading?: boolean
  feedback?: any
  error?: string | null
}

export function WritingPaperCanvas({ 
  exercise, 
  activeMission,
  value, 
  onChange, 
  onSubmit,
  disabled,
  loading,
  feedback,
  error
}: Props) {
  return (
    <motion.div 
      className="ide-workspace"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Left Panel: Context & Reference */}
      <section className="context-panel">
        <header className="panel-header">
          <ClipboardList size={16} className="panel-icon" />
          <span className="panel-title">Task & Context</span>
        </header>
        
        <div className="context-body">
          {activeMission ? (
            <>
              <h3 className="mission-title">{activeMission.title}</h3>
              <p className="mission-desc">{activeMission.context}</p>
              
              {activeMission.referenceData && (
                <div className="code-diff">
                  {activeMission.referenceData}
                </div>
              )}
            </>
          ) : (
            <p className="mission-desc" style={{ fontStyle: 'italic' }}>
              Loading operational context...
            </p>
          )}
        </div>
      </section>

      {/* Right Panel: Editor & Feedback */}
      <section className="editor-panel">
        <header className="panel-header">
          <PenLine size={16} className="panel-icon" />
          <span className="panel-title">Draft Editor</span>
        </header>
        
        <textarea
          className="editor-textarea"
          placeholder="Start typing your response here. Focus on clarity and technical accuracy..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />

        <AnimatePresence>
          {feedback && <WritingNoteFeedback feedback={feedback} />}
        </AnimatePresence>

        <footer className="editor-footer">
          {error && <span style={{ color: '#ef4444', marginRight: 'auto', fontSize: '14px' }}>{error}</span>}
          
          <button
            className="submit-btn"
            onClick={onSubmit}
            disabled={disabled || loading || !value.trim()}
          >
            <Send size={16} className={loading ? 'spinning' : ''} />
            <span>{loading ? 'ANALYZING...' : 'SUBMIT DRAFT'}</span>
          </button>
        </footer>
      </section>
    </motion.div>
  )
}
