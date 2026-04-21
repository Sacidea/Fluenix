'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Send, BookOpen } from 'lucide-react'
import { useWritingSession } from '@/hooks/useWritingSession'
import { WritingExerciseTabs } from '@/components/writing/WritingExerciseTabs'
import { WritingPaperCanvas } from '@/components/writing/WritingPaperCanvas'
import { WritingNoteFeedback } from '@/components/writing/WritingNoteFeedback'

export default function WritingPage() {
  const {
    exercise,
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
        <div className="lab-workspace">
          
          {/* CENTRAL PAPER */}
          <section className="canvas-container">
            <WritingPaperCanvas 
              exercise={exercise}
              value={userText}
              onChange={setUserText}
              disabled={loading}
            />
            
            <AnimatePresence>
              {feedback && <WritingNoteFeedback feedback={feedback} />}
            </AnimatePresence>

            <div className="action-footer">
              {error && <div className="error-box">⚠️ {error}</div>}
              
              <div className="btn-wrapper">
                <motion.button
                  className={`submit-btn ${loading || !userText.trim() ? 'disabled' : ''}`}
                  onClick={analyzeWriting}
                  disabled={loading || !userText.trim()}
                  whileHover={loading || !userText.trim() ? {} : { y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} className={loading ? 'spinning' : ''} />
                  <span className="btn-text">{loading ? 'Analyzing...' : 'SUBMIT DRAFT'}</span>
                </motion.button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .writing-lab-root {
          min-height: 100vh;
          background-color: #f8fafc;
          padding-bottom: 120px;
        }

        .lab-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 40px;
          margin-bottom: 40px;
        }

        .header-content {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 12px;
          text-decoration: none;
        }

        .eyebrow {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #6366f1;
          font-weight: 800;
          display: block;
          margin-bottom: 4px;
        }

        .main-title {
          font-size: 32px;
          font-weight: 900;
          letter-spacing: -1px;
          margin: 0;
          color: #0f172a;
        }

        .lab-main {
          padding: 0 40px;
        }

        .lab-workspace {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .canvas-container {
          position: relative;
          width: 100%;
        }

        .action-footer {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .btn-wrapper {
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }

        .submit-btn {
          padding: 18px 48px;
          background: #4338ca;
          border: none;
          border-radius: 14px;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          box-shadow: 0 10px 25px -5px rgba(67, 56, 202, 0.3);
          transition: background 0.3s, transform 0.3s;
        }

        .btn-text {
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .submit-btn.disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          box-shadow: none;
        }

        .error-box {
          margin-bottom: 20px;
          padding: 16px;
          background: #fef2f2;
          color: #991b1b;
          border-radius: 12px;
          font-size: 14px;
          border: 1px solid #fee2e2;
          width: 100%;
        }

        @keyframes spinning {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spinning {
          animation: spinning 1s linear infinite;
        }

        @media (max-width: 1024px) {
          .lab-header { padding: 20px; }
          .header-content { flex-direction: column; align-items: center; gap: 20px; text-align: center; }
          .submit-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  )
}