'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Pin } from 'lucide-react'

import { WritingFeedback } from '@/hooks/useWritingSession'

interface Props {
  feedback: WritingFeedback
  theme?: 'lilac' | 'yellow' | 'blue'
}

export function WritingNoteFeedback({ feedback, theme = 'blue' }: Props) {
  const themes = {
    lilac: { bg: '#f5f3ff', text: '#5b21b6', border: '#c4b5fd', pin: '#8b5cf6' },
    yellow: { bg: '#fffbeb', text: '#92400e', border: '#fde68a', pin: '#f59e0b' },
    blue: { bg: '#f0f9ff', text: '#0369a1', border: '#bae6fd', pin: '#0ea5e9' }
  }
  const t = themes[theme]

  return (
    <motion.div 
      className="note-container"
      initial={{ opacity: 0, x: 100, rotate: 5 }}
      animate={{ opacity: 1, x: 0, rotate: -2 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
    >
      <div className="note-sticky" style={{ background: t.bg, color: t.text }}>
        <Pin size={24} className="note-pin" style={{ color: t.pin }} />
        
        <header className="note-header">
          <Sparkles size={16} />
          <span>AI REVIEW</span>
        </header>

        <div className="note-score-circle" style={{ borderColor: t.pin }}>
          <span className="score-val">{feedback.overall_score}</span>
          <span className="score-label">GRADE</span>
        </div>

        <div className="note-content">
          <div className="note-section">
            <h4 className="note-title" style={{ borderBottomColor: t.border }}>Highlights</h4>
            <ul className="note-list">
              {feedback.strengths.slice(0, 2).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="note-section">
            <h4 className="note-title" style={{ borderBottomColor: t.border }}>Advice</h4>
            <ul className="note-list">
              {feedback.improvements.slice(0, 2).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          
          <p className="note-summary" style={{ borderTopColor: t.border }}>
            {feedback.revised_text ? feedback.revised_text.substring(0, 100) : ''}...
          </p>
        </div>
      </div>

      <style jsx>{`
        .note-container {
          position: fixed;
          right: 5%;
          top: 200px;
          z-index: 50;
          width: 280px;
          pointer-events: none;
        }

        .note-sticky {
          pointer-events: auto;
          padding: 32px 24px 24px;
          box-shadow: 
            2px 4px 10px rgba(0,0,0,0.08),
            0 10px 30px rgba(0,0,0,0.04);
          border-bottom-right-radius: 40px 5px;
          position: relative;
        }

        .note-pin {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
        }

        .note-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
          justify-content: center;
        }

        .note-score-circle {
          width: 70px;
          height: 70px;
          border-width: 2px;
          border-style: dashed;
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .score-val {
          font-size: 28px;
          font-weight: 900;
          line-height: 1;
        }

        .score-label {
          font-size: 9px;
          font-weight: 700;
        }

        .note-section {
          margin-bottom: 16px;
        }

        .note-title {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          margin-bottom: 6px;
          border-bottom-width: 1px;
          border-bottom-style: solid;
        }

        .note-list {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .note-list li {
          font-size: 13px;
          line-height: 1.4;
          margin-bottom: 4px;
          padding-left: 12px;
          position: relative;
        }

        .note-list li::before {
          content: '-';
          position: absolute;
          left: 0;
        }

        .note-summary {
          font-size: 12px;
          line-height: 1.5;
          font-style: italic;
          opacity: 0.8;
          border-top-width: 1px;
          border-top-style: dashed;
          padding-top: 12px;
        }

        @media (max-width: 1200px) {
          .note-container {
            position: relative;
            top: auto;
            right: auto;
            width: 100%;
            margin-top: 32px;
            transform: rotate(0) !important;
          }
          .note-sticky {
            border-radius: 12px;
          }
          .note-pin { display: none; }
        }
      `}</style>
    </motion.div>
  )
}
