'use client'

import React from 'react'
import * as Icons from 'lucide-react'
import type { DashboardStats } from '@fluenix/shared'
import { SessionsIcon, AccuracyIcon, StreakIcon, ActivityIcon } from './icons/PremiumIcons'

interface StatsCardsProps {
    stats: DashboardStats | null
}

export function StatsCards({ stats }: StatsCardsProps) {
    const totalSessions = stats?.totalSessions ?? 0
    const xp = totalSessions * 100
    const level = Math.floor(xp / 500) + 1
    const nextLevelXp = level * 500
    const currentLevelXp = (level - 1) * 500
    const progressPercent = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100

    const config = [
        { iconComp: SessionsIcon, value: totalSessions, label: 'Operational Sessions', color: '#3B82F6' },
        { iconComp: AccuracyIcon, value: stats?.averageScore ? `${Math.round(stats.averageScore)}%` : '—', label: 'Technical Accuracy', color: '#22C55E' },
        { iconComp: StreakIcon, value: stats?.streak ?? 0, label: 'Consistency Streak', color: '#FFC107' },
        { iconComp: ActivityIcon, value: stats?.lastSession ? new Date(stats.lastSession as string).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : '—', label: 'Last Activity', color: '#F43F5E' },
    ]

    return (
        <div className="ledger-stats-root">
            {/* GAMIFICATION BANNER */}
            <div className="gamification-banner">
                <div className="g-left">
                    <div className="level-badge">LVL {level}</div>
                    <div className="g-text">
                        <h3>Engineering Proficiency</h3>
                        <p>{xp} XP / {nextLevelXp} XP to Level {level + 1}</p>
                    </div>
                </div>
                <div className="g-right">
                    <div className="xp-track">
                        <div className="xp-fill" style={{ width: `${progressPercent}%` }} />
                    </div>
                </div>
            </div>

            {/* STATS DOSSIERS */}
            <div className="ledger-stats">
                {config.map((s) => {
                    const Icon = s.iconComp
                    return (
                        <div key={s.label} className="stat-dossier">
                            <div className="stat-top">
                                <div className="icon-frame">
                                    <Icon size={28} />
                                </div>
                                <span className="stat-label">{s.label}</span>
                            </div>
                            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                        </div>
                    )
                })}
            </div>
            
            <style jsx>{`
                .ledger-stats-root {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 32px;
                }

                .gamification-banner {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    border-radius: 16px;
                    padding: 24px 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: white;
                    box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.5);
                }

                .g-left {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .level-badge {
                    background: linear-gradient(135deg, #4338ca, #6366f1);
                    width: 56px;
                    height: 56px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 16px;
                    font-family: var(--font-mono);
                    font-weight: 800;
                    font-size: 14px;
                    color: white;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                }

                .g-text h3 {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 4px;
                    letter-spacing: -0.5px;
                }

                .g-text p {
                    font-size: 13px;
                    color: #94a3b8;
                    font-weight: 500;
                }

                .g-right {
                    flex: 1;
                    max-width: 300px;
                }

                .xp-track {
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 999px;
                    overflow: hidden;
                }

                .xp-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #38bdf8, #818cf8);
                    border-radius: 999px;
                    transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .ledger-stats {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }

                .stat-dossier {
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 24px;
                    border-radius: 16px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.02);
                    transition: transform 0.3s;
                }

                .stat-dossier:hover {
                    transform: translateY(-4px);
                    border-color: #cbd5e1;
                }

                .stat-top {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 12px;
                }

                .icon-frame {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-label {
                    font-size: 10px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #94a3b8;
                }

                .stat-value {
                    font-size: 24px;
                    font-weight: 900;
                    letter-spacing: -0.5px;
                }

                @media (max-width: 1024px) {
                    .ledger-stats { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 640px) {
                    .ledger-stats { grid-template-columns: 1fr; }
                    .gamification-banner { flex-direction: column; align-items: flex-start; gap: 20px; }
                    .g-right { max-width: 100%; width: 100%; }
                }
            `}</style>
        </div>
    )
}
