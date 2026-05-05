'use client'

import React from 'react'
import { useBehavioralSession } from '@/hooks/useBehavioralSession'
import { useLevel } from '@/context/LevelContext'
import { Loader2, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react'
import '@/styles/behavioral.css'

export function BehavioralWorkspace() {
  const { level } = useLevel()
  const {
    questions,
    activeQuestion,
    changeQuestion,
    situation, setSituation,
    task, setTask,
    action, setAction,
    result, setResult,
    isAnalyzing,
    feedback,
    error,
    analyzeAnswer
  } = useBehavioralSession()

  return (
    <div className="behavioral-workspace">
      {/* Sidebar / Question Selector */}
      <div style={{ marginBottom: '32px', display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px' }}>
        {questions.map(q => (
          <button
            key={q.id}
            onClick={() => changeQuestion(q.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid',
              borderColor: activeQuestion.id === q.id ? '#3b82f6' : '#e2e8f0',
              background: activeQuestion.id === q.id ? '#eff6ff' : 'white',
              color: activeQuestion.id === q.id ? '#1d4ed8' : '#64748b',
              fontWeight: 600,
              fontSize: '14px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {q.category}
          </button>
        ))}
      </div>

      <div className="question-panel">
        <div className="question-category">{activeQuestion.category}</div>
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
            placeholder={activeQuestion.tips[0]}
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
            placeholder={activeQuestion.tips[1]}
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
            placeholder={activeQuestion.tips[2]}
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
            placeholder={activeQuestion.tips[3]}
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
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>{feedback.overall_score}/100</div>
              <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px' }}>Overall Score</div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#8b5cf6' }}>{feedback.leadership_alignment}/100</div>
              <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px' }}>Leadership Alignment</div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#3b82f6' }}>{feedback.english_quality}/100</div>
              <div style={{ fontSize: '13px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginTop: '4px' }}>English Quality (Level: {level})</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
            <div style={{ flex: 1, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ color: '#166534', fontWeight: 700, marginBottom: '12px' }}>Strengths</h4>
              <ul style={{ paddingLeft: '20px', color: '#15803d', lineHeight: 1.6 }}>
                {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div style={{ flex: 1, background: '#fef2f2', border: '1px solid #fecaca', padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ color: '#991b1b', fontWeight: 700, marginBottom: '12px' }}>Areas to Improve</h4>
              <ul style={{ paddingLeft: '20px', color: '#b91c1c', lineHeight: 1.6 }}>
                {feedback.improvements.map((s, i) => <li key={i}>{s}</li>)}
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
