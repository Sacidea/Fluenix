'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, PenLine, Send, X, FileText } from 'lucide-react'
import { WritingExercise, WritingMission } from '@fluenix/shared'
import { WritingFeedback } from '@/hooks/useWritingSession'
import { WritingNoteFeedback } from './WritingNoteFeedback'
import { WritingFeedbackView } from './WritingFeedbackView'

interface Props {
  exercise: WritingExercise
  activeMission: WritingMission | null
  value: string
  onChange: (val: string) => void
  onSubmit: () => void
  disabled?: boolean
  loading?: boolean
  feedback?: WritingFeedback | null
  error?: string | null
  onNext?: () => void
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
  error,
  onNext
}: Props) {
  const [showDetails, setShowDetails] = React.useState(false)

  const renderReferenceData = (text: string) => {
    const isDiff = text.includes('diff --git') || text.includes('--- a/') || text.includes('+++ b/');
    
    if (isDiff) {
      return text.split('\n').map((line, i) => {
        if (line.startsWith('+') && !line.startsWith('+++')) {
          return <div key={i} className="diff-line diff-add">{line}</div>
        } else if (line.startsWith('-') && !line.startsWith('---')) {
          return <div key={i} className="diff-line diff-remove">{line}</div>
        } else if (line.startsWith('@@')) {
          return <div key={i} className="diff-line diff-meta">{line}</div>
        } else if (line.startsWith('diff') || line.startsWith('index') || line.startsWith('---') || line.startsWith('+++')) {
          return <div key={i} className="diff-line diff-header">{line}</div>
        }
        return <div key={i} className="diff-line">{line}</div>
      })
    }

    return text.split('\n').map((line, i) => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1 && colonIndex < 25) {
        return (
          <div key={i} className="ref-line-kv">
            <strong className="ref-key">{line.substring(0, colonIndex + 1)}</strong>
            <span className="ref-val">{line.substring(colonIndex + 1)}</span>
          </div>
        )
      }
      return <div key={i} className="ref-line-normal">{line}</div>
    })
  }

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
                  {renderReferenceData(activeMission.referenceData)}
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
          {feedback && (
            <WritingNoteFeedback 
              feedback={feedback} 
              theme={exercise.id === 'pr_description' ? 'lilac' : exercise.id === 'commit_message' ? 'yellow' : 'blue'}
            />
          )}
        </AnimatePresence>

        <footer className="editor-footer">
          {error && <span style={{ color: '#ef4444', marginRight: 'auto', fontSize: '14px' }}>{error}</span>}
          
          <div className="editor-footer-actions">
            {!feedback ? (
              <button
                className="submit-btn"
                onClick={onSubmit}
                disabled={disabled || loading || !value.trim()}
              >
                <Send size={16} className={loading ? 'spinning' : ''} />
                <span>{loading ? 'ANALYZING...' : 'SUBMIT DRAFT'}</span>
              </button>
            ) : (
              <button
                className="submit-btn"
                style={{ background: '#3b82f6', borderColor: '#2563eb' }}
                onClick={() => setShowDetails(true)}
              >
                <FileText size={16} />
                <span>VIEW DETAILS</span>
              </button>
            )}
            
            {feedback && onNext && (
              <button
                className="submit-btn"
                style={{ background: '#10b981', borderColor: '#059669' }}
                onClick={onNext}
              >
                <span>NEXT TASK</span>
              </button>
            )}
          </div>
        </footer>
      </section>

      {/* Details Modal Overlay */}
      <AnimatePresence>
        {showDetails && feedback && (
          <motion.div 
            className="details-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setShowDetails(false)}
          >
            <motion.div 
              className="details-modal-content"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              style={{
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'white',
                borderRadius: '24px',
                position: 'relative'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="close-modal-btn"
                onClick={() => setShowDetails(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#f1f5f9',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  color: '#64748b'
                }}
              >
                <X size={18} />
              </button>
              
              <div style={{ padding: '10px' }}>
                <WritingFeedbackView feedback={feedback as any} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
