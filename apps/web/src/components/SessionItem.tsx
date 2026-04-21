import React from 'react'
import { Session } from '../hooks/useProgressData'

interface SessionItemProps {
    session: Session
    index?: number
}

const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'
    if (score >= 60) return '#f59e0b'
    return '#ef4444'
}

const getScoreBg = (score: number) => {
    if (score >= 80) return '#ecfdf5'
    if (score >= 60) return '#fffbeb'
    return '#fef2f2'
}

const labelMap: Record<string, string> = {
    // scenario types
    technical_interview: 'Technical Interview',
    daily_standup: 'Daily Standup',
    code_review: 'Code Review',
    system_design: 'System Design',
    // writing scenarios
    pr_description: 'PR Description',
    commit_message: 'Commit Message',
    documentation: 'Documentation',
    email_draft: 'Professional Email',
    // session types
    scenario: 'Scenario',
    writing: 'Technical Writing',
    pronunciation: 'Pronunciation Lab',
}

const getLabel = (session: { type: string; scenario?: string }) => {
    const raw = session.scenario ?? session.type
    return labelMap[raw] ?? raw
}

export function SessionItem({ session, index = 0 }: SessionItemProps) {
    return (
        <div
            className="pr-session"
            data-aos="fade-up"
            data-aos-delay={index * 50}
        >
            <div className="pr-session-left">
                <div className="pr-session-icon">
                    {session.type === 'scenario' ? '🎭' :
                        session.type === 'pronunciation' ? '🎙️' : '✍️'}
                </div>
                <div>
                    <div className="pr-session-type">
                        {getLabel(session)}
                    </div>
                    <div className="pr-session-date">
                        {new Date(session.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                </div>
            </div>
            {session.score != null && (
                <div
                    className="pr-session-score"
                    style={{
                        color: getScoreColor(session.score),
                        background: getScoreBg(session.score),
                    }}
                >
                    {Math.round(session.score)}
                </div>
            )}
        </div>
    )
}
