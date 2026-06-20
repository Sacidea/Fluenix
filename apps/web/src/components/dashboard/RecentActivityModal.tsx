import React from 'react'
import { X } from 'lucide-react'

import type { Session } from '@/hooks/useProgressData'

interface Props {
  session: Session
  onClose: () => void
  getScoreColor: (score?: number | null) => string
}

export function RecentActivityModal({ session, onClose, getScoreColor }: Props) {
  const getParsedFeedback = (s: Session) => {
    if (!s.feedback) return null
    if (typeof s.feedback === 'string') {
      try { return JSON.parse(s.feedback) } catch(e) { return null }
    }
    return s.feedback
  }

  const parsedFeedback = getParsedFeedback(session)

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
          <h2 className="modal-title">
            {session.type.toUpperCase()} - {(session.scenario || 'General').replace(/_/g, ' ')}
          </h2>
          <div className="modal-meta">
            <span>{new Date(session.createdAt).toLocaleString()}</span>
            <span className="modal-score" style={{ color: getScoreColor(session.score) }}>
              Score: {typeof session.score === 'number' ? Math.round(session.score) : 'N/A'}
            </span>
          </div>

          <div className="modal-body">
            {parsedFeedback ? (
              <div className="feedback-json">
                {Object.entries(parsedFeedback).map(([key, value]) => {
                  if (key === 'overall_score') return null
                  return (
                    <div key={key} className="fb-block">
                      <strong className="fb-key">{key.replace(/_/g, ' ').toUpperCase()}:</strong>
                      <div className="fb-val">
                        {Array.isArray(value) ? (
                          <ul className="fb-list">
                            {value.map((v, idx) => <li key={idx}>{v}</li>)}
                          </ul>
                        ) : (
                          <p>{String(value)}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="no-feedback">No detailed feedback available for this session.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
