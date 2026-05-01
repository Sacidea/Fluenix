'use client'

import React from 'react'
import * as Icons from 'lucide-react'
import { Session } from '../hooks/useProgressData'

interface SessionItemProps {
    session: Session
    index?: number
    onSelect?: (session: Session) => void
}

const labelMap: Record<string, string> = {
    technical_interview: 'Technical Interview',
    daily_standup: 'Daily Standup',
    code_review: 'Code Review',
    system_design: 'System Design',
    pr_description: 'PR Description',
    commit_message: 'Commit Message',
    documentation: 'Documentation',
    email_draft: 'Professional Email',
    scenario: 'Simulation Transcript',
    writing: 'Technical Ledger Entry',
    pronunciation: 'Acoustic Report',
}

const getLabel = (session: { type: string; scenario?: string }) => {
    const raw = session.scenario ?? session.type
    return labelMap[raw] ?? raw
}

export function SessionItem({ session, index = 0, onSelect }: SessionItemProps) {
    const Icon = session.type === 'scenario' ? Icons.MessagesSquare :
                 session.type === 'pronunciation' ? Icons.Mic : Icons.PenTool

    const scoreColor = session.score != null ? (session.score >= 80 ? '#059669' : session.score >= 60 ? '#d97706' : '#dc2626') : '#94a3b8'

    return (
        <div
            className="ledger-entry"
            role="button"
            tabIndex={0}
            onClick={() => onSelect?.(session)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect?.(session)
                }
            }}
        >
            <div className="entry-left">
                <div className="entry-icon">
                    <Icon size={16} strokeWidth={2.5} />
                </div>
                <div className="entry-info">
                    <h4 className="entry-title">{getLabel(session)}</h4>
                    <span className="entry-meta">
                        {new Date(session.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                </div>
            </div>
            
            <div className="entry-right">
                {session.score != null ? (
                    <div className="entry-accuracy">
                        <div className="accuracy-label">Accuracy Match</div>
                        <div className="accuracy-val" style={{ color: scoreColor }}>
                            {Math.round(session.score)}%
                        </div>
                    </div>
                ) : (
                    <div className="entry-status">COMPLETE</div>
                )}
                <Icons.ChevronRight size={14} className="entry-chevron" />
            </div>

            <style jsx>{`
                .ledger-entry {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 24px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    margin-bottom: 12px;
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.01);
                }

                .ledger-entry:hover {
                    border-color: #4338ca;
                    transform: translateX(4px);
                    box-shadow: 4px 4px 20px rgba(67, 56, 202, 0.05);
                }

                .entry-left {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .entry-icon {
                    width: 36px;
                    height: 36px;
                    background: #f8fafc;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748b;
                    border: 1px solid #f1f5f9;
                }

                .entry-title {
                    font-family: 'Georgia', serif;
                    font-style: italic;
                    font-size: 16px;
                    font-weight: 400;
                    color: #0f172a;
                    margin: 0;
                }

                .entry-meta {
                    font-size: 11px;
                    font-weight: 700;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .entry-right {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .entry-accuracy {
                    text-align: right;
                }

                .accuracy-label {
                    font-size: 9px;
                    font-weight: 800;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .accuracy-val {
                    font-size: 16px;
                    font-weight: 900;
                }

                .entry-status {
                    font-size: 10px;
                    font-weight: 800;
                    color: #cbd5e1;
                    letter-spacing: 1px;
                }

                .entry-chevron {
                    color: #cbd5e1;
                }

                .ledger-entry:hover .entry-chevron {
                    color: #4338ca;
                }
            `}</style>
        </div>
    )
}
