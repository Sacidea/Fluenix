import React from 'react'
import { Stats } from '../hooks/useProgressData'

interface StatsCardsProps {
    stats: Stats | null
}

export function StatsCards({ stats }: StatsCardsProps) {
    return (
        <div className="pr-stats">
            {[
                { icon: '🎯', value: stats?.totalSessions ?? 0, label: 'Total Sessions', color: '#6366f1' },
                { icon: '📈', value: stats?.averageScore ? Math.round(stats.averageScore) : '—', label: 'Avg Score', color: '#0ea5e9' },
                { icon: '🔥', value: stats?.streak ?? 0, label: 'Day Streak', color: '#f59e0b' },
                { icon: '📅', value: stats?.lastSession ? new Date(stats.lastSession).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' }) : '—', label: 'Last Session', color: '#10b981' },
            ].map((s, i) => (
                <div
                    key={s.label}
                    className="pr-stat"
                    style={{ borderTop: `3px solid ${s.color}` }}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                >
                    <div className="pr-stat-icon">{s.icon}</div>
                    <div className="pr-stat-value" style={{ color: s.color }}>{s.value}</div>
                    <div className="pr-stat-label">{s.label}</div>
                </div>
            ))}
        </div>
    )
}
