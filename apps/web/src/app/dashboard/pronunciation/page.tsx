'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Volume2, Mic, Square, CheckCircle, AlertCircle, Play, List } from 'lucide-react'
import { usePronunciationSession } from '@/hooks/usePronunciationSession'

export default function PronunciationPage() {
  const {
    words,
    currentIndex,
    currentWord,
    listening,
    transcript,
    result,
    loading,
    supported,
    startListening,
    stopListening,
    speakWord,
    nextWord,
    setWordByIndex
  } = usePronunciationSession()

  return (
    <div className="pronunciation-lab-root">
      <header className="lab-header">
        <div className="header-content">
          <Link href="/dashboard" className="back-link">
            <ChevronLeft size={16} />
            <span>Dashboard</span>
          </Link>
          <div className="header-title-group">
            <span className="eyebrow">Acoustic Analysis Lab</span>
            <h1 className="main-title">Phonetic Reporting</h1>
          </div>
        </div>
      </header>

      <main className="lab-main">
        <div className="lab-workspace">
          
          {/* LEFT SIDE: WORD INDEX (Fihrist) */}
          <aside className="word-index">
            <div className="index-header">
              <List size={14} />
              <span>TERMINOLOGY INDEX</span>
            </div>
            <div className="index-list">
              {words.map((w, i) => (
                <button
                  key={w.id}
                  className={`index-item ${currentIndex === i ? 'active' : ''}`}
                  onClick={() => setWordByIndex(i)}
                >
                  <span className="item-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="item-word">{w.word}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT SIDE: ANALYSIS SPACE */}
          <section className="analysis-space">
            {!supported ? (
              <div className="unsupported-msg">
                <AlertCircle size={48} color="#ef4444" />
                <h2>Environment Error</h2>
                <p>Acoustic analysis requires a compatible browser environment (Chrome/Edge recommended).</p>
              </div>
            ) : !currentWord ? (
              <div className="loading-state">
                <div className="spinner" />
                <span>Loading word database...</span>
              </div>
            ) : (
              <div className="report-canvas">
                <div className="report-header">
                  <span className="category-tag">{currentWord.category} Analysis</span>
                  <div className="p-accent" />
                </div>

                <div className="word-display">
                  <h1 className="target-word">{currentWord.word}</h1>
                  <span className="phonetic-notation">/{currentWord.phonetic}/</span>
                </div>

                <div className="action-row">
                  <button className="p-action-btn secondary" onClick={speakWord}>
                    <Volume2 size={18} />
                    <span>Listen to Master</span>
                  </button>

                  <button 
                    className={`p-action-btn primary ${listening ? 'listening' : ''}`}
                    onClick={listening ? stopListening : startListening}
                  >
                    {listening ? <Square size={18} /> : <Mic size={18} />}
                    <span>{listening ? 'Processing Stream...' : 'Initialize Recording'}</span>
                  </button>
                </div>

                {/* WAVEFORM MICRO-ANIMATION */}
                {listening && (
                  <div className="waveform-container">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="wave-bar"
                        animate={{ height: [10, 40, 15, 35, 10] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {transcript && !loading && (
                    <motion.div 
                      className="transcript-note"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span className="note-label">RECOGNIZED INPUT</span>
                      <p className="note-text">"{transcript}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {loading && (
                  <div className="analysis-loading">
                    <div className="pulse-loader" />
                    <span>Analyzing Phonetic Accuracy...</span>
                  </div>
                )}

                <AnimatePresence>
                  {result && (
                    <motion.div 
                      className="result-report"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="report-top">
                        <div className={`status-badge ${result.is_correct ? 'success' : 'fail'}`}>
                          {result.is_correct ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                          <span>{result.is_correct ? 'PASSED' : 'RETRY REQUIRED'}</span>
                        </div>
                        <div className="accuracy-score">
                           <span className="score-val">{result.accuracy_score}</span>
                           <span className="score-label">MATCH</span>
                        </div>
                      </div>

                      <div className="report-content">
                        <div className="report-block">
                          <span className="block-label">TECHNICAL FEEDBACK</span>
                          <p>{result.feedback}</p>
                        </div>
                        <div className="report-block tip">
                          <span className="block-label">IMPROVEMENT TIP</span>
                          <p>{result.tip}</p>
                        </div>
                      </div>

                      <button className="next-word-btn" onClick={nextWord}>
                        Analyze Next Word
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </main>

      <style jsx>{`
        .pronunciation-lab-root {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
        }

        .lab-header {
          background: white;
          border-bottom: 1px solid #e2e8f0;
          padding: 20px 40px;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          margin-bottom: 12px;
        }

        .eyebrow {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #f59e0b;
          font-weight: 800;
        }

        .main-title {
          font-size: 28px;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
        }

        .lab-main {
          flex: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 40px;
        }

        .lab-workspace {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          height: calc(100vh - 240px);
        }

        /* Word Index Aside */
        .word-index {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }

        .index-header {
          padding: 16px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 2px;
        }

        .index-list {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .index-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border: none;
          background: none;
          border-bottom: 1px solid #f1f5f9;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }

        .index-item:last-child { border-bottom: none; }
        .index-item:hover { background: #f8fafc; }
        .index-item.active { background: #eef2ff; color: #4338ca; border-left: 3px solid #4338ca; }

        .item-num { 
          font-family: 'JetBrains Mono', monospace; 
          font-size: 11px; 
          color: #94a3b8;
          width: 24px;
        }
        .item-word { font-size: 13px; font-weight: 700; letter-spacing: -0.2px; }

        /* Analysis Space */
        .analysis-space {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          overflow-y: auto;
          padding: 48px;
        }

        .report-canvas { max-width: 600px; margin: 0 auto; }

        .report-header { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
        .category-tag { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #f59e0b; letter-spacing: 1.5px; }
        .p-accent { flex: 1; height: 1px; background: #fed7aa; }

        .word-display { text-align: center; margin-bottom: 48px; }
        .target-word { font-size: 64px; font-weight: 900; color: #0f172a; margin-bottom: 12px; letter-spacing: -2px; }
        .phonetic-notation { font-family: 'JetBrains Mono', monospace; font-size: 20px; color: #f59e0b; }

        .action-row { display: flex; gap: 16px; justify-content: center; margin-bottom: 48px; }
        
        .p-action-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
        }

        .p-action-btn.secondary { background: #fff7ed; color: #c2410c; border-color: #ffedd5; }
        .p-action-btn.primary { background: #f59e0b; color: white; box-shadow: 0 8px 20px -4px rgba(245, 158, 11, 0.3); }

        .p-action-btn.listening { background: #ef4444; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.8; } 100% { opacity: 1; } }

        .waveform-container { display: flex; align-items: center; justify-content: center; gap: 4px; height: 40px; margin-bottom: 32px; }
        .wave-bar { width: 3px; background: #ef4444; border-radius: 3px; }

        .transcript-note { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin-bottom: 32px; }
        .note-label { font-size: 9px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; display: block; margin-bottom: 8px; }
        .note-text { font-size: 14px; font-weight: 600; color: #0f172a; font-style: italic; }

        .analysis-loading { display: flex; align-items: center; justify-content: center; gap: 12px; color: #64748b; font-weight: 700; font-size: 14px; }
        .pulse-loader { width: 12px; height: 12px; background: #f59e0b; border-radius: 50%; animation: pulse 1s infinite; }

        /* Results Report */
        .result-report { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 32px; box-shadow: 0 15px 35px rgba(0,0,0,0.05); }

        .report-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        
        .status-badge { display: flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 99px; font-size: 11px; font-weight: 800; }
        .status-badge.success { background: #ecfdf5; color: #059669; }
        .status-badge.fail { background: #fef2f2; color: #dc2626; }

        .accuracy-score { display: flex; flex-direction: column; align-items: flex-end; }
        .score-val { font-size: 32px; font-weight: 900; color: #0f172a; line-height: 1; }
        .score-label { font-size: 9px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; }

        .report-block { margin-bottom: 20px; }
        .block-label { font-size: 9px; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 6px; }
        .report-block p { font-size: 14px; color: #475569; line-height: 1.6; }

        .report-block.tip { background: #fffcf0; padding: 16px; border-radius: 12px; border-left: 3px solid #f59e0b; }

        .next-word-btn {
          width: 100%;
          padding: 16px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .loading-state { text-align: center; color: #64748b; padding-top: 100px; }
        .spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #f59e0b; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
          .lab-workspace { grid-template-columns: 1fr; }
          .word-index { display: none; }
        }
      `}</style>
    </div>
  )
}