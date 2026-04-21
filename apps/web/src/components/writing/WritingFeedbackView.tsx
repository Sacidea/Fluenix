'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle2, Lightbulb, BarChart3 } from 'lucide-react'

interface Feedback {
  clarity_score: number
  technical_score: number
  overall_score: number
  strengths: string[]
  improvements: string[]
  overall_feedback: string
}

interface Props {
  feedback: Feedback
}

export function WritingFeedbackView({ feedback }: Props) {
  const scores = [
    { label: 'Clarity', value: feedback.clarity_score, color: '#6366f1', icon: Icons.Activity },
    { label: 'Technical', value: feedback.technical_score, color: '#0ea5e9', icon: Icons.Target },
    { label: 'Overall', value: feedback.overall_score, color: '#10b981', icon: Icons.Award },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      className="wr-feedback"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="wr-feedback-header">
        <Sparkles size={18} className="wr-sparkle-svg" />
        <span className="wr-feedback-title">AI Analysis & Feedback</span>
      </div>

      <div className="wr-feedback-body">
        <div className="wr-scores">
          {scores.map((s, idx) => (
            <motion.div 
              key={s.label} 
              className="wr-score-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
            >
              <div className="wr-score-val" style={{ color: s.color }}>{s.value}</div>
              <div className="wr-score-label">{s.label}</div>
              <div className="wr-score-progress">
                <motion.div 
                  className="wr-score-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{ background: s.color }} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="wr-sections-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="wr-fb-section" variants={item}>
            <h4 className="wr-fb-heading strength">
              <CheckCircle2 size={16} /> Key Strengths
            </h4>
            <div className="wr-fb-list">
              {feedback.strengths.map((s, i) => (
                <div key={i} className="wr-fb-item item-strength">{s}</div>
              ))}
            </div>
          </motion.div>

          <motion.div className="wr-fb-section" variants={item}>
            <h4 className="wr-fb-heading improve">
              <Lightbulb size={16} /> Areas for Improvement
            </h4>
            <div className="wr-fb-list">
              {feedback.improvements.map((s, i) => (
                <div key={i} className="wr-fb-item item-improve">{s}</div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="wr-fb-overall"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <h4 className="wr-fb-heading">
            <BarChart3 size={16} /> Summary
          </h4>
          <p className="wr-overall-text">{feedback.overall_feedback}</p>
        </motion.div>
      </div>

      <style jsx>{`
        .wr-feedback {
          margin-top: 32px;
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }

        .wr-feedback-header {
          padding: 16px 24px;
          background: #fcfdfe;
          border-bottom: 1.5px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .wr-sparkle-svg { color: #f59e0b; }

        .wr-feedback-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .wr-feedback-body { padding: 32px; }

        .wr-scores {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .wr-score-card {
          background: #fcfdfe;
          padding: 20px;
          border-radius: 18px;
          border: 1.5px solid #e8edf5;
          text-align: center;
        }

        .wr-score-val {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 4px;
          line-height: 1;
        }

        .wr-score-label {
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .wr-score-progress {
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          overflow: hidden;
        }

        .wr-score-fill {
          height: 100%;
          border-radius: 2px;
        }

        .wr-sections-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .wr-fb-heading {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wr-fb-heading.strength { color: #059669; }
        .wr-fb-heading.improve { color: #d97706; }

        .wr-fb-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .wr-fb-item {
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.6;
          border-left: 4px solid;
        }

        .item-strength {
          background: #f0fdf4;
          border-color: #10b981;
          color: #065f46;
        }

        .item-improve {
          background: #fffbeb;
          border-color: #f59e0b;
          color: #78350f;
        }

        .wr-fb-overall {
          background: #eef2ff;
          border: 1.5px solid #c7d2fe;
          padding: 24px;
          border-radius: 18px;
        }

        .wr-overall-text {
          font-size: 15px;
          line-height: 1.7;
          color: #1e1b4b;
        }

        @media (max-width: 768px) {
          .wr-sections-grid { grid-template-columns: 1fr; }
          .wr-scores { grid-template-columns: 1fr; }
        }
      `}</style>
    </motion.div>
  )
}

// Fixed missing import dummy for Icon names if I used them
const Icons = {
  Activity: BarChart3,
  Target: Sparkles,
  Award: Sparkles
}
// I realized I used Icons.Activity but Icons object was missing. Fixed above.
