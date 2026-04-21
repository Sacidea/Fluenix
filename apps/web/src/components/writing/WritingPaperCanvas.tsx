'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ClipboardList, PenLine } from 'lucide-react'
import { WritingExercise } from '@/data/writingExercises'

interface Props {
  exercise: WritingExercise
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}

export function WritingPaperCanvas({ exercise, value, onChange, disabled }: Props) {
  return (
    <motion.div 
      className="paper-ledger"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Unified Paper Body */}
      <section className="paper-body">
        {/* Task Section */}
        <section className="paper-section task-section">
          <header className="paper-header">
            <ClipboardList size={16} className="paper-icon" />
            <span className="paper-label">Requirement</span>
          </header>
          <div className="paper-prompt">
            {exercise.prompt}
          </div>
        </section>

        {/* Editor Section */}
        <section className="paper-section editor-section">
          <header className="paper-header">
            <PenLine size={16} className="paper-icon" />
            <span className="paper-label">Your Draft</span>
          </header>
          <textarea
            className="paper-textarea"
            placeholder="Type your response as a professional engineer..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </section>
      </section>

      <style jsx>{`
        .paper-ledger {
          background: #ffffff; /* pure white paper focus */
          max-width: 800px;
          margin: 0 auto;
          box-shadow: 
            0 1px 3px rgba(0,0,0,0.05), 
            0 10px 40px rgba(0,0,0,0.03); /* subtle deep shadow for paper feel */
          border-radius: 4px;
          position: relative;
          min-height: 800px;
          display: flex;
          flex-direction: column;
        }

        .paper-section {
          padding: 48px 60px;
        }

        .task-section {
          background: #ffffff;
          padding-bottom: 0;
        }

        .paper-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .paper-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          color: #6366f1; /* Main brand indigo */
        }

        .paper-icon {
          opacity: 0.8;
        }

        .paper-label {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #1e293b;
        }

        .paper-prompt {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: #4b5563;
          font-style: italic;
          border-left: 2px solid #e5e7eb;
          padding-left: 24px;
        }

        .paper-divider {
          height: 1px;
          background: #f1f5f9;
          position: relative;
          margin: 0 40px;
        }

        .perforation {
          position: absolute;
          top: -3px;
          left: 0;
          right: 0;
          height: 6px;
          background-image: radial-gradient(circle, #f8faff 2px, transparent 2px);
          background-size: 12px 6px;
        }

        .editor-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          padding-top: 24px;
        }

        .paper-textarea {
          flex: 1;
          width: 100%;
          min-height: 400px;
          border: none;
          outline: none;
          font-family: 'Georgia', serif;
          font-size: 18px;
          line-height: 1.7;
          color: #1a1a1a;
          background: transparent;
          resize: none;
          padding: 0;
          /* Lined paper effect */
          background-image: linear-gradient(#d1d5db 1.2px, transparent 1px);
          background-size: 100% 1.7em;
          background-attachment: local;
        }

        .paper-textarea::placeholder {
          color: #cbd5e1;
          font-style: italic;
        }

        @media (max-width: 640px) {
          .paper-section { padding: 32px 24px; }
          .paper-ledger { margin: 0 -20px; border-radius: 0; }
        }
      `}</style>
    </motion.div>
  )
}
