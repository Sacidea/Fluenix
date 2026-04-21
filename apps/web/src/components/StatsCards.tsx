'use client'

import React from 'react'
import * as Icons from 'lucide-react'
import { Stats } from '../hooks/useProgressData'

interface StatsCardsProps {
    stats: Stats | null
}

export function StatsCards({ stats }: StatsCardsProps) {
    const config = [
        { icon: 'Target', value: stats?.totalSessions ?? 0, label: 'Operational Sessions', color: '#6366f1' },
        { icon: 'TrendingUp', value: stats?.averageScore ? `${Math.round(stats.averageScore)}%` : '—', label: 'Technical Accuracy', color: '#0ea5e9' },
        { icon: 'Zap', value: stats?.streak ?? 0, label: 'Consistency Streak', color: '#f59e0b' },
        { icon: 'Calendar', value: stats?.lastSession ? new Date(stats.lastSession).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : '—', label: 'Last Activity', color: '#10b981' },
    ]

    return (
        <div className="ledger-stats">
            {config.map((s) => {
                const Icon = (Icons as any)[s.icon]
                return (
                    <div key={s.label} className="stat-dossier">
                        <div className="stat-top">
                            <div className="icon-frame" style={{ color: s.color, background: `${s.color}10` }}>
                                <Icon size={16} strokeWidth={2.5} />
                            </div>
                            <span className="stat-label">{s.label}</span>
                        </div>
                        <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                    </div>
                )
            })}
            
            <style jsx>{`
                .ledger-stats {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                    margin-bottom: 48px;
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
                }
            `}</style>
        </div>
    )
}
