import React, { useState } from 'react'
import { CheckCircle2, Terminal, FileCode, Users, PenLine, Mic, GitPullRequest, X, Trash2 } from 'lucide-react'
import * as Icons from 'lucide-react'
import { RecentActivityModal } from './RecentActivityModal'

interface Session {
  id: string
  type: string
  scenario: string
  createdAt: string
  score: number | null
  feedback?: unknown
}

interface Props {
  sessions: Session[]
  onDelete?: (id: string) => void
}

const getIcon = (type: string, scenario: string) => {
  if (type === 'pronunciation') return <Mic size={18} />
  if (type === 'writing') {
    if (scenario === 'pr_description') return <GitPullRequest size={18} />
    return <PenLine size={18} />
  }
  if (type === 'scenario') {
    if (scenario === 'interview') return <Terminal size={18} />
    if (scenario === 'standup') return <Users size={18} />
    if (scenario === 'code_review') return <FileCode size={18} />
    return <Terminal size={18} />
  }
  return <CheckCircle2 size={18} />
}

const getScoreColor = (score: number | null) => {
  if (!score) return '#94a3b8'
  if (score >= 90) return '#10b981'
  if (score >= 75) return '#f59e0b'
  return '#ef4444'
}

export function RecentActivity({ sessions, onDelete }: Props) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const recent = sessions.slice(0, 5)

  if (recent.length === 0) {
    return (
      <div className="recent-container empty">
        <p>No recent activity found. Start a lab module to begin tracking your progress.</p>
        <style jsx>{`
          .recent-container.empty {
            padding: 40px;
            text-align: center;
            color: #94a3b8;
            background: #1e293b;
            border-radius: 16px;
            border: 1px dashed #334155;
            font-size: 14px;
          }
        `}</style>
      </div>
    )
  }

  // Helper for score color passed to modal
  const getScoreColorFunc = getScoreColor

  return (
    <div className="recent-container">
      <div className="recent-header">
        <h3 className="recent-title">Latest Evaluations</h3>
      </div>

      <div className="activity-list">
        {recent.map((s, i) => (
          <div key={s.id || i} className="activity-item-wrapper">
            <div 
              className="activity-item" 
              onClick={() => setSelectedSession(s)}
            >
              <div className="activity-icon-wrapper" style={{ color: getScoreColor(s.score) }}>
                {getIcon(s.type, s.scenario)}
              </div>
              
              <div className="activity-content">
                <div className="activity-main">
                  <span className="activity-type">
                    {s.type.toUpperCase()} 
                    <span className="activity-dot">•</span> 
                    {s.scenario.replace(/_/g, ' ')}
                  </span>
                  <span className="activity-time">
                    {new Date(s.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="activity-score-wrapper">
                  {s.score !== null ? (
                    <span className="activity-score" style={{ color: getScoreColor(s.score) }}>
                      {Math.round(s.score)}
                    </span>
                  ) : (
                    <span className="activity-score" style={{ color: '#64748b' }}>-</span>
                  )}
                </div>
              </div>
            </div>
            
            {onDelete && (
              <button 
                className="delete-activity-btn" 
                onClick={(e) => { e.stopPropagation(); onDelete(s.id); }}
                title="Delete Session"
              >
                <Icons.Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* MODAL OVERLAY */}
      {selectedSession && (
        <RecentActivityModal 
          session={selectedSession} 
          onClose={() => setSelectedSession(null)} 
          getScoreColor={getScoreColorFunc} 
        />
      )}

      <style jsx>{`
        .recent-container {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .recent-header {
          margin-bottom: 20px;
        }

        .recent-title {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-mid);
          margin: 0;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-item-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .activity-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: var(--radius-md);
          background: var(--color-white);
          border: 1px solid var(--color-border);
          transition: var(--transition-base);
          cursor: pointer;
        }

        .activity-item:hover {
          background: var(--color-bg);
          border-color: var(--color-border-mid);
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }

        .delete-activity-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 74px;
          background: #fef2f2;
          color: #ef4444;
          border: 1px solid #fee2e2;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .delete-activity-btn:hover {
          background: #fee2e2;
          transform: translateY(-1px);
        }

        .activity-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: var(--color-primary-bg);
          color: var(--color-primary);
        }

        .activity-content {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .activity-main {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .activity-type {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-text-dark);
          text-transform: capitalize;
        }

        .activity-dot {
          color: var(--color-border-mid);
          margin: 0 6px;
        }

        .activity-time {
          font-size: 12px;
          color: var(--color-text-mid);
        }

        .activity-score {
          font-family: 'Georgia', serif;
          font-size: 18px;
          font-weight: 800;
          color: var(--color-text-dark);
        }

        /* MODAL STYLES */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(248, 250, 255, 0.85);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }

        .modal-content {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 600px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: var(--shadow-xl);
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: var(--color-text-light);
          cursor: pointer;
          transition: var(--transition-base);
        }

        .close-btn:hover {
          color: var(--color-text-dark);
          transform: rotate(90deg);
        }

        .modal-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--color-text-dark);
          margin: 0;
          padding: 24px 24px 8px 24px;
          text-transform: capitalize;
        }

        .modal-meta {
          display: flex;
          justify-content: space-between;
          padding: 0 24px 24px 24px;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-mid);
          border-bottom: 1px solid var(--color-border);
        }

        .modal-score {
          font-family: 'Georgia', serif;
          font-weight: 800;
          font-size: 16px;
          color: var(--color-text-dark);
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          color: var(--color-text-dark);
          font-size: 15px;
          line-height: 1.6;
        }

        .fb-block {
          margin-bottom: 24px;
        }

        .fb-key {
          display: inline-block;
          color: var(--color-primary);
          background: var(--color-primary-bg);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .fb-list {
          padding-left: 20px;
          margin: 0;
        }

        .fb-list li {
          margin-bottom: 8px;
        }

        .no-feedback {
          text-align: center;
          color: var(--color-text-light);
          font-style: italic;
        }
      `}</style>
    </div>
  )
}
