'use client'

import React, { useMemo } from 'react'
import * as Icons from 'lucide-react'
import { ModuleCard } from '@/components/ModuleCard'
import { modulesData } from '@/data/modules'
import { ActivityHeatmap } from './ActivityHeatmap'
import { RecentActivity } from './RecentActivity'
import { CompetencyMatrix } from './CompetencyMatrix'
import { WelcomeArea } from './WelcomeArea'
import { GamificationWidget } from './GamificationWidget'
import { SessionsIcon, AccuracyIcon, StreakIcon, ActivityIcon } from '../icons/PremiumIcons'

import type { Session } from '@/hooks/useProgressData'
interface Props {
  user: { firstName?: string | null, [key: string]: unknown } | null
  stats: { totalSessions?: number, streak?: number, averageScore?: number, lastSession?: string | null } | null
  sessions: Session[]
}

export default function DashboardClient({ user, stats, sessions }: Props) {
  const statsConfig = useMemo(() => [
    { id: 'sessions', iconComp: SessionsIcon, value: stats?.totalSessions ?? 0, label: 'Total Sessions' },
    { id: 'streak', iconComp: StreakIcon, value: stats?.streak ?? 0, label: 'Day Streak' },
    { id: 'score', iconComp: AccuracyIcon, value: stats?.averageScore ? `${Math.round(stats.averageScore)}` : '—', label: 'Avg Score' },
    { id: 'last_login', iconComp: ActivityIcon, value: stats?.lastSession ? new Date(stats.lastSession).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '--', label: 'Last Login' },
  ], [stats])

  const { currentWeeklyCount, weeklyTarget, weeklyProgress } = useMemo(() => {
    const now = new Date()
    const thisWeekStart = new Date(now)
    thisWeekStart.setDate(now.getDate() - 7)
    const safeSessions = Array.isArray(sessions) ? sessions : []
    const count = safeSessions.filter(s => {
      if (!s || !s.createdAt) return false
      const d = new Date(s.createdAt)
      return d >= thisWeekStart && d <= now
    }).length
    const target = 5
    return {
      currentWeeklyCount: count,
      weeklyTarget: target,
      weeklyProgress: Math.min((count / target) * 100, 100)
    }
  }, [sessions])

  return (
    <div className="ledger-dash">
      <main className="dash-container">

        {/* CORPORATE GREETING SECTION */}
        <WelcomeArea firstName={user?.firstName} />

        <div className="layout-grid">
          {/* LEFT: MODULES GRID */}
          <div className="layout-left">
            <section className="modules-section">
              <div className="section-header">
                <span className="section-label">Available Lab Modules</span>
                <div className="section-line" />
              </div>

              <div className="modules-grid light-mode-modules">
                {modulesData.map((mod, i) => (
                  <ModuleCard key={mod.id} moduleData={mod} index={i} />
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: PROGRESS VISUALIZATIONS */}
          <aside className="layout-right">
            <div className="stats-col">
              {/* GAMIFICATION WIDGET */}
              <GamificationWidget 
                totalSessions={stats?.totalSessions ?? 0}
                currentWeeklyCount={currentWeeklyCount}
                weeklyTarget={weeklyTarget}
                weeklyProgress={weeklyProgress}
              />

            </div>

            <section className="progress-section">
              <div className="section-header">
                <span className="section-label">Operational Analytics</span>
                <div className="section-line" />
              </div>

              <div className="stats-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {statsConfig.map((s) => {
                  const IconComp = s.iconComp
                  return (
                    <div key={s.id} className="stat-card">
                      <div className="stat-icon-wrap" style={{ background: 'transparent' }}>
                        <IconComp size={32} />
                      </div>
                      <div className="stat-info">
                        <span className="stat-val" style={{ fontSize: '18px' }}>{s.value}</span>
                        <span className="stat-lbl">{s.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="analytics-col">
                <CompetencyMatrix sessions={sessions} />
                <div style={{ height: 24 }} />
                <ActivityHeatmap sessions={sessions} />
                <div style={{ height: 24 }} />
                <RecentActivity sessions={sessions} />
              </div>
            </section>
          </aside>
        </div>

        <section className="terminal-footer">
          <div className="footer-line" />
          <p className="footer-status">
            <Icons.ShieldCheck size={14} className="status-icon" />
            <span>Secure Engineering Environment — Fluenix v1.2</span>
          </p>
        </section>

      </main>

      <style jsx>{`
        .ledger-dash {
          min-height: 100vh;
          background: var(--color-bg);
          padding: 80px 40px;
        }

        .dash-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .layout-grid {
          display: flex;
          gap: 60px;
          align-items: flex-start;
        }

        .layout-left {
          flex: 1;
          min-width: 0;
        }

        .layout-right {
          width: 340px;
          flex-shrink: 0;
        }

        .stats-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-base);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-border-mid);
        }

        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-val {
          font-size: 22px;
          font-family: 'Georgia', serif;
          font-weight: 900;
          color: var(--color-text-dark);
          line-height: 1;
        }

        .stat-lbl {
          font-size: 11px;
          font-weight: 800;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--color-text-light);
        }

        /* GAMIFICATION WIDGET STYLES */
        .gamification-card {
          background: linear-gradient(145deg, var(--color-white), #f8fafc);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
        }

        .gamification-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 6px;
          background: linear-gradient(to bottom, #FFC107, #F43F5E);
        }

        .analytics-col {
          display: flex;
          flex-direction: column;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
        }

        .section-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--color-text-mid);
          white-space: nowrap;
        }

        .section-line {
          flex: 1;
          height: 1px;
          background: var(--color-border);
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }

        .terminal-footer {
          margin-top: 100px;
          padding-top: 32px;
          border-top: 1px solid var(--color-border);
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          color: var(--color-text-light);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        @media (max-width: 1100px) {
          .layout-grid {
            flex-direction: column;
          }
          .layout-right {
            width: 100%;
          }
          .stats-col {
            flex-direction: row;
          }
          .stat-card {
            flex: 1;
          }
        }

        @media (max-width: 768px) {
          .ledger-dash { padding: 40px 20px; }
          .modules-grid { grid-template-columns: 1fr; }
          .welcome-text { font-size: 32px; }
          .stats-col { flex-direction: column; gap: 16px; }
        }
      `}</style>
    </div>
  )
}
