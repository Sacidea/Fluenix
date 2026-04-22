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
    <div className="ledger-dash">
      <main className="dash-container">
        
        {/* CORPORATE GREETING SECTION */}
        <section className="welcome-area">
          <Link href="/dashboard" className="back-link">
            <ChevronLeft size={14} />
            <span>Return to Dashboard</span>
          </Link>
          <div className="title-block">
            <div className="eyebrow-group">
              <div className="line" />
              <span className="eyebrow">Acoustic Analysis Lab</span>
            </div>
            
            <h1 className="welcome-text">
              Phonetic Reporting —<br />
              <span className="serif-grad">Voice pattern recognition active.</span>
            </h1>
          </div>
        </section>

        <div className="lab-workspace">
          
          {/* LEFT SIDE: WORD INDEX */}
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
                <span>Initializing Phonetic Engine...</span>
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
                    <span>Reference Audio</span>
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
                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="wave-bar"
                        animate={{ height: [10, 30 + Math.random() * 20, 10] }}
                        transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.2, delay: i * 0.05 }}
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
                    <span>Analyzing Acoustic Signature...</span>
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
                          <span>{result.is_correct ? 'ANALYSIS PASSED' : 'RETRY REQUIRED'}</span>
                        </div>
                        <div className="accuracy-score">
                           <span className="score-val">{result.accuracy_score}</span>
                           <span className="score-label">MATCH %</span>
                        </div>
                      </div>

                      <div className="report-content">
                        <div className="report-block">
                          <span className="block-label">TECHNICAL FEEDBACK</span>
                          <p>{result.feedback}</p>
                        </div>
                        <div className="report-block tip">
                          <span className="block-label">CALIBRATION TIP</span>
                          <p>{result.tip}</p>
                        </div>
                      </div>

                      <button className="next-word-btn" onClick={nextWord}>
                        Proceed to Next Module
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
        .ledger-dash {
          min-height: 100vh;
          background: #f8fafc;
          padding: 80px 40px;
        }

        .dash-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-area {
          margin-bottom: 60px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 40px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 24px;
          transition: color 0.2s;
        }

        .back-link:hover { color: #0f172a; }

        .title-block { display: flex; flex-direction: column; gap: 24px; }

        .eyebrow-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .line {
          width: 32px;
          height: 1px;
          background: #4338ca;
        }

        .eyebrow {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #94a3b8;
        }

        .welcome-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 40px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1.5px;
          color: #0f172a;
          margin: 0;
        }

        .serif-grad {
          font-family: 'Georgia', serif;
          font-style: italic;
          color: #4338ca;
          font-weight: 400;
        }

        .lab-workspace {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          min-height: 600px;
        }

        /* Word Index Aside */
        .word-index {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }

        .index-header {
          padding: 20px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
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
          gap: 16px;
          padding: 14px 20px;
          border: none;
          background: none;
          border-bottom: 1px solid #f1f5f9;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }

        .index-item:last-child { border-bottom: none; }
        .index-item:hover { background: #f8fafc; }
        .index-item.active { background: #ffffff; box-shadow: inset 3px 0 0 #4338ca; }

        .item-num { 
          font-family: var(--font-mono);
          font-size: 11px; 
          font-weight: 700;
          color: #94a3b8;
        }
        .index-item.active .item-num { color: #4338ca; }

        .item-word { 
          font-family: var(--font-serif);
          font-size: 14px; 
          font-weight: 800; 
          color: #475569;
        }
        .index-item.active .item-word { color: #0f172a; }

        /* Analysis Space */
        .analysis-space {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          padding: 48px;
          display: flex;
          flex-direction: column;
        }

        .report-canvas { max-width: 600px; margin: 0 auto; width: 100%; }

        .report-header { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
        .category-tag { font-family: var(--font-mono); font-size: 10px; font-weight: 800; text-transform: uppercase; color: #4338ca; letter-spacing: 2px; }
        .p-accent { flex: 1; height: 1px; background: #eef2ff; }

        .word-display { text-align: center; margin-bottom: 48px; }
        .target-word { font-family: var(--font-serif); font-size: 64px; font-weight: 900; color: #0f172a; margin-bottom: 12px; letter-spacing: -2px; }
        .phonetic-notation { font-family: var(--font-mono); font-size: 18px; color: #64748b; font-weight: 600; letter-spacing: 2px; }

        .action-row { display: flex; gap: 16px; justify-content: center; margin-bottom: 48px; }
        
        .p-action-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          border-radius: 12px;
          font-family: var(--font-serif);
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .p-action-btn.secondary { background: white; color: #0f172a; border-color: #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
        .p-action-btn.secondary:hover { border-color: #cbd5e1; transform: translateY(-1px); }

        .p-action-btn.primary { background: #0f172a; color: white; box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.3); }
        .p-action-btn.primary:hover { transform: translateY(-1px); box-shadow: 0 12px 24px -4px rgba(15, 23, 42, 0.4); }

        .p-action-btn.listening { background: #4338ca; box-shadow: 0 0 0 4px rgba(67, 56, 202, 0.2); animation: pulse-ring 2s infinite; }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(67, 56, 202, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(67, 56, 202, 0); } 100% { box-shadow: 0 0 0 0 rgba(67, 56, 202, 0); } }

        .waveform-container { display: flex; align-items: center; justify-content: center; gap: 4px; height: 40px; margin-bottom: 32px; }
        .wave-bar { width: 4px; background: linear-gradient(to top, #4338ca, #818cf8); border-radius: 4px; }

        .transcript-note { background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; margin-bottom: 32px; border-left: 3px solid #64748b; }
        .note-label { font-family: var(--font-mono); font-size: 9px; font-weight: 800; color: #94a3b8; letter-spacing: 2px; display: block; margin-bottom: 8px; }
        .note-text { font-family: var(--font-serif); font-size: 15px; font-weight: 700; color: #0f172a; font-style: italic; }

        .analysis-loading { display: flex; align-items: center; justify-content: center; gap: 12px; color: #64748b; font-family: var(--font-mono); font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
        .pulse-loader { width: 10px; height: 10px; background: #4338ca; border-radius: 50%; animation: pulse 1s infinite; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } }

        /* Results Report */
        .result-report { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }

        .report-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
        
        .status-badge { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; font-family: var(--font-mono); font-size: 10px; font-weight: 800; letter-spacing: 1px; }
        .status-badge.success { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }
        .status-badge.fail { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }

        .accuracy-score { display: flex; flex-direction: column; align-items: flex-end; }
        .score-val { font-family: var(--font-serif); font-size: 36px; font-weight: 900; color: #0f172a; line-height: 1; letter-spacing: -1px; }
        .score-label { font-family: var(--font-mono); font-size: 9px; font-weight: 800; color: #94a3b8; letter-spacing: 2px; margin-top: 4px; }

        .report-block { margin-bottom: 24px; }
        .block-label { font-family: var(--font-mono); font-size: 9px; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 8px; letter-spacing: 1px; }
        .report-block p { font-size: 14px; color: #475569; line-height: 1.7; }

        .report-block.tip { background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 3px solid #4338ca; }

        .next-word-btn {
          width: 100%;
          padding: 16px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 12px;
          font-family: var(--font-serif);
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }
        .next-word-btn:hover { background: #1e293b; transform: translateY(-1px); }
        
        .loading-state { text-align: center; color: #64748b; padding-top: 100px; display: flex; flex-direction: column; align-items: center; gap: 16px; font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
        .spinner { width: 32px; height: 32px; border: 2px solid #e2e8f0; border-top-color: #4338ca; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .unsupported-msg { text-align: center; padding-top: 80px; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .unsupported-msg h2 { font-family: var(--font-serif); font-size: 24px; color: #0f172a; font-weight: 800; }
        .unsupported-msg p { color: #64748b; max-width: 400px; line-height: 1.6; }

        @media (max-width: 900px) {
          .lab-workspace { grid-template-columns: 1fr; }
          .word-index { display: none; }
          .welcome-text { font-size: 32px; }
          .ledger-dash { padding: 40px 20px; }
        }
      `}</style>
    </div>
  )
}