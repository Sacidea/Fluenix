'use client'

import React from 'react'
import { useBehavioralSession } from '@/hooks/useBehavioralSession'
import { useLevel } from '@/context/LevelContext'
import { Loader2, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react'
import '@/styles/behavioral.css'

export function BehavioralWorkspace() {
  const { level } = useLevel()
  const {
    activeQuestion,
    isLoadingQuestion,
    loadNextQuestion,
    situation, setSituation,
    task, setTask,
    action, setAction,
    result, setResult,
    isAnalyzing,
    feedback,
    error,
    analyzeAnswer
  } = useBehavioralSession()

  if (isLoadingQuestion || !activeQuestion) {
    return (
      <div className="behavioral-workspace" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px' }}>
        <Loader2 className="animate-spin" size={48} style={{ marginBottom: '16px', color: '#3b82f6' }} />
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px', color: '#0f172a' }}>Generating Scenario...</h2>
        <p style={{ color: '#64748b' }}>Our AI is preparing a new FAANG-style behavioral interview question for you.</p>
      </div>
    )
  }

  return (
    <div className="behavioral-workspace">
      {/* Header Panel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div className="question-category" style={{ margin: 0 }}>{activeQuestion.category}</div>
        <button 
          onClick={loadNextQuestion} 
          style={{ padding: '8px 16px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '20px', fontSize: '13px', fontWeight: 700, border: '1px solid #bfdbfe', cursor: 'pointer' }}
        >
          Skip / Next Question
        </button>
      </div>

      <div className="question-panel">
        <h2 className="question-text">{activeQuestion.question}</h2>
        <div className="question-context">
          <Lightbulb size={16} style={{ display: 'inline', marginRight: '6px', color: '#f59e0b' }} />
          {activeQuestion.context}
        </div>
      </div>

      <div className="star-inputs-container">
        <div className="star-input-group s">
          <label>
            <div className="letter-badge">S</div> Situation
          </label>
          <textarea
            className="star-textarea"
            placeholder="Describe the background and context. What was the challenge?"
            value={situation}
            onChange={e => setSituation(e.target.value)}
            disabled={isAnalyzing}
          />
        </div>

        <div className="star-input-group t">
          <label>
            <div className="letter-badge">T</div> Task
          </label>
          <textarea
            className="star-textarea"
            placeholder="What exactly were you responsible for in this situation?"
            value={task}
            onChange={e => setTask(e.target.value)}
            disabled={isAnalyzing}
          />
        </div>

        <div className="star-input-group a">
          <label>
            <div className="letter-badge">A</div> Action
          </label>
          <textarea
            className="star-textarea"
            placeholder="What specific steps did you take? Focus on 'I', not 'we'."
            value={action}
            onChange={e => setAction(e.target.value)}
            disabled={isAnalyzing}
          />
        </div>

        <div className="star-input-group r">
          <label>
            <div className="letter-badge">R</div> Result
          </label>
          <textarea
            className="star-textarea"
            placeholder="What was the outcome? Use metrics or data if possible."
            value={result}
            onChange={e => setResult(e.target.value)}
            disabled={isAnalyzing}
          />
        </div>
      </div>

      {error && (
        <div style={{ color: '#ef4444', background: '#fef2f2', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <AlertTriangle size={18} /> {error}
        </div>
      )}

      {!feedback ? (
        <button 
          className="submit-btn" 
          onClick={() => analyzeAnswer(level)} 
          disabled={isAnalyzing || !situation || !task || !action || !result}
        >
          {isAnalyzing ? (
            <><Loader2 className="animate-spin" size={20} /> Analyzing STAR Alignment...</>
          ) : (
            <>Submit for FAANG Evaluation <ArrowRight size={20} /></>
          )}
        </button>
      ) : (
        <div style={{ marginTop: '40px', padding: '32px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 color="#10b981" size={28} /> AI Evaluation Report
          </h3>
          
          <div className="feedback-scores-grid">
            <div className="feedback-score-card">
              <div className="score-value" style={{ color: '#0f172a' }}>{feedback.overall_score}/100</div>
              <div className="score-label">Overall Score</div>
            </div>
            <div className="feedback-score-card">
              <div className="score-value" style={{ color: '#8b5cf6' }}>{feedback.leadership_alignment}/100</div>
              <div className="score-label">Leadership Alignment</div>
            </div>
            <div className="feedback-score-card">
              <div className="score-value" style={{ color: '#3b82f6' }}>{feedback.english_quality}/100</div>
              <div className="score-label">English Quality (Level: {level})</div>
            </div>
          </div>

          <div className="feedback-details-flex">
            <div className="feedback-strengths">
              <h4>Strengths</h4>
              <ul>
                {feedback.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="feedback-improvements">
              <h4>Areas to Improve</h4>
              <ul>
                {feedback.improvements.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Detailed STAR Breakdown</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'white', borderLeft: '4px solid #3b82f6', borderRadius: '0 8px 8px 0', border: '1px solid #e2e8f0', borderLeftColor: '#3b82f6' }}>
                <strong style={{ color: '#1e40af' }}>Situation:</strong> {feedback.detailed_analysis.situation}
              </div>
              <div style={{ padding: '16px', background: 'white', borderLeft: '4px solid #8b5cf6', borderRadius: '0 8px 8px 0', border: '1px solid #e2e8f0', borderLeftColor: '#8b5cf6' }}>
                <strong style={{ color: '#5b21b6' }}>Task:</strong> {feedback.detailed_analysis.task}
              </div>
              <div style={{ padding: '16px', background: 'white', borderLeft: '4px solid #f59e0b', borderRadius: '0 8px 8px 0', border: '1px solid #e2e8f0', borderLeftColor: '#f59e0b' }}>
                <strong style={{ color: '#92400e' }}>Action:</strong> {feedback.detailed_analysis.action}
              </div>
              <div style={{ padding: '16px', background: 'white', borderLeft: '4px solid #10b981', borderRadius: '0 8px 8px 0', border: '1px solid #e2e8f0', borderLeftColor: '#10b981' }}>
                <strong style={{ color: '#065f46' }}>Result:</strong> {feedback.detailed_analysis.result}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
