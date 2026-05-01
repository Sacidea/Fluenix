import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Mic, Square, CheckCircle, AlertCircle } from 'lucide-react'

interface Word {
  id: string
  word: string
  phonetic: string
  category: string
}

interface AnalysisResult {
  is_correct: boolean
  accuracy_score: number
  feedback: string
  tip: string
}

interface AnalysisWorkspaceProps {
  supported: boolean
  currentWord: Word | null
  listening: boolean
  transcript: string
  result: AnalysisResult | null
  loading: boolean
  startListening: () => void
  stopListening: () => void
  speakWord: () => void
  nextWord: () => void
}

export function AnalysisWorkspace({
  supported,
  currentWord,
  listening,
  transcript,
  result,
  loading,
  startListening,
  stopListening,
  speakWord,
  nextWord
}: AnalysisWorkspaceProps) {
  if (!supported) {
    return (
      <section className="analysis-space">
        <div className="unsupported-msg">
          <AlertCircle size={48} color="var(--color-red)" />
          <h2>Environment Error</h2>
          <p>Acoustic analysis requires a compatible browser environment (Chrome/Edge recommended).</p>
        </div>
      </section>
    )
  }

  if (!currentWord) {
    return (
      <section className="analysis-space">
        <div className="loading-state">
          <div className="spinner" />
          <span>Initializing Phonetic Engine...</span>
        </div>
      </section>
    )
  }

  return (
    <section className="analysis-space">
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
    </section>
  )
}
