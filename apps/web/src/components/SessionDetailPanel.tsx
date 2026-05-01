'use client'

import React from 'react'
import { X } from 'lucide-react'
import { Session } from '@/hooks/useProgressData'

type Props = {
  session: Session | null
  onClose: () => void
}

const toPrettyJson = (value: unknown) => {
  if (value == null) return 'No structured feedback available for this session.'
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return String(value)
  }
}

export function SessionDetailPanel({ session, onClose }: Props) {
  if (!session) return null

  return (
    <div className="overlay" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="head">
          <h3>Session Details</h3>
          <button onClick={onClose} aria-label="Close detail panel">
            <X size={16} />
          </button>
        </div>

        <div className="meta">
          <div><span>Type</span><strong>{session.type}</strong></div>
          <div><span>Scenario</span><strong>{session.scenario || '—'}</strong></div>
          <div><span>Score</span><strong>{session.score != null ? `${Math.round(session.score)}%` : '—'}</strong></div>
          <div><span>Duration</span><strong>{session.duration ? `${session.duration}s` : '—'}</strong></div>
          <div><span>Date</span><strong>{new Date(session.createdAt).toLocaleString('en-US')}</strong></div>
        </div>

        <div className="feedback">
          <div className="label">Feedback Payload</div>
          <pre>{toPrettyJson(session.feedback)}</pre>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }
        .panel {
          width: min(760px, 100%);
          max-height: 85vh;
          overflow: auto;
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 18px;
        }
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .head h3 {
          margin: 0;
          font-size: 18px;
          color: #0f172a;
        }
        .head button {
          border: 1px solid #e2e8f0;
          background: white;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          cursor: pointer;
        }
        .meta {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 14px;
        }
        .meta div {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .meta span {
          color: #94a3b8;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
        }
        .meta strong {
          color: #0f172a;
          font-size: 14px;
        }
        .feedback .label {
          font-size: 11px;
          color: #64748b;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        pre {
          margin: 0;
          background: #0f172a;
          color: #e2e8f0;
          padding: 12px;
          border-radius: 10px;
          font-size: 12px;
          overflow: auto;
          line-height: 1.5;
        }
        @media (max-width: 640px) {
          .meta { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
