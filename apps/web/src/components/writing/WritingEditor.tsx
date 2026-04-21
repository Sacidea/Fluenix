'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PenTool } from 'lucide-react'

interface Props {
  value: string
  onChange: (val: string) => void
  disabled?: boolean
}

export function WritingEditor({ value, onChange, disabled }: Props) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0
  const charCount = value.length

  return (
    <motion.div 
      className="wr-panel"
      initial={false}
      animate={{
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      whileFocus={{ 
        scale: 1.005,
        boxShadow: "0 12px 40px rgba(99,102,241,0.12)"
      }}
    >
      <div className="wr-panel-header">
        <PenTool size={18} className="wr-panel-icon-svg" />
        <span className="wr-panel-title">Your Technical Writing</span>
      </div>
      <div className="wr-editor-container">
        <textarea
          className="wr-textarea"
          placeholder="Start writing your technical content here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <div className="wr-editor-footer">
          <div className="wr-counter">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordCount}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {wordCount} words
              </motion.span>
            </AnimatePresence>
            <span className="wr-counter-sep">•</span>
            <span>{charCount} chars</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wr-panel {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: border-color 0.3s ease;
        }

        .wr-panel:focus-within {
          border-color: #6366f1;
        }

        .wr-panel-header {
          padding: 16px 24px;
          border-bottom: 1.5px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fcfdfe;
        }

        .wr-panel-icon-svg {
          color: #6366f1;
        }

        .wr-panel-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .wr-editor-container {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .wr-textarea {
          width: 100%;
          min-height: 280px;
          background: none;
          border: none;
          padding: 24px;
          font-size: 15px;
          line-height: 1.8;
          color: #102D47;
          font-family: inherit;
          font-weight: 400;
          resize: none;
          outline: none;
          caret-color: #6366f1;
        }

        .wr-editor-footer {
          padding: 12px 24px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: flex-end;
          background: #fafbfc;
        }

        .wr-counter {
          display: flex;
          gap: 12px;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          overflow: hidden;
        }

        .wr-counter-sep {
          color: #e2e8f0;
        }

        .wr-textarea:disabled {
          background: #fcfdfe;
          color: #94a3b8;
        }
      `}</style>
    </motion.div>
  )
}
