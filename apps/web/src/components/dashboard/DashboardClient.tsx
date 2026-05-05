'use client'

import React from 'react'
import * as Icons from 'lucide-react'
import { ModuleCard } from '@/components/ModuleCard'
import { modulesData } from '@/data/modules'
import { ActivityHeatmap } from './ActivityHeatmap'
import { RecentActivity } from './RecentActivity'
import { CompetencyMatrix } from './CompetencyMatrix'
import { ProgressInsights } from '@/components/ProgressInsights'

interface Session {
  id: string
  type: string
  scenario: string
  createdAt: string
  score: number | null
  feedback?: any
}

interface Props {
  user: any
  stats: any
  sessions: Session[]
}

export default function DashboardClient({ user, stats, sessions }: Props) {
  const statsConfig = [
    { id: 'sessions', icon: 'Target', value: stats?.totalSessions ?? 0, label: 'Sessions', color: '#38bdf8' },
    { id: 'streak', icon: 'Flame', value: stats?.streak ?? 0, label: 'Day Streak', color: '#f59e0b' },
    { id: 'score', icon: 'TrendingUp', value: stats?.averageScore ? `${Math.round(stats.averageScore)}` : '—', label: 'Avg Score', color: '#34d399' },
  ]

  return (
    <div className="ledger-dash">
      <main className="dash-container">

        {/* CORPORATE GREETING SECTION */}
        <section className="welcome-area">
          <div className="eyebrow-group">
            <div className="line" />
            <span className="eyebrow">Operational Terminal</span>
          </div>

          <h1 className="welcome-text">
            Welcome, {user?.firstName ?? 'Engineer'} —<br />
            <span className="serif-grad">Technical communication environment active.</span>
          </h1>
          <p className="description">
            Access your technical lab modules below. Each module is optimized for high-stakes FAANG-level communication standards.
          </p>
        </section>

        {/* PROGRESS VISUALIZATIONS */}
        <section className="progress-section">
          <div className="section-header">
            <span className="section-label">Operational Analytics</span>
            <div className="section-line" />
          </div>

          <div className="stats-row">
            {statsConfig.map((s) => {
              const IconComp = (Icons as any)[s.icon]
              return (
                <div key={s.id} className="stat-card">
                  <div className="stat-icon-wrap" style={{ color: s.color, backgroundColor: `${s.color}20` }}>
                    <IconComp size={20} />
                  </div>
                  <div className="stat-info">
                    <span className="stat-val">{s.value}</span>
                    <span className="stat-lbl">{s.label}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <ProgressInsights sessions={sessions} />

          <div className="analytics-grid">
            <div className="analytics-left">
              <CompetencyMatrix sessions={sessions} />
              <div style={{ height: 24 }} />
              <ActivityHeatmap sessions={sessions} />
            </div>
            <div className="analytics-right">
              <RecentActivity sessions={sessions} />
            </div>
          </div>
        </section>

        {/* MODULES GRID */}
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
          max-width: 1000px;
          margin: 0 auto;
        }

        .welcome-area {
          margin-bottom: 60px;
        }

        .eyebrow-group {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .line {
          width: 32px;
          height: 1px;
          background: var(--color-primary);
        }

        .eyebrow {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--color-text-light);
        }

        .welcome-text {
          font-family: var(--font-base);
          font-size: 40px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1.5px;
          color: var(--color-text-dark);
          margin-bottom: 24px;
        }

        .serif-grad {
          font-family: 'Georgia', serif;
          font-style: italic;
          color: var(--color-primary);
          font-weight: 400;
        }

        .description {
          font-size: 15px;
          color: var(--color-text-mid);
          max-width: 550px;
          line-height: 1.8;
        }

        .progress-section {
          margin-bottom: 60px;
        }

        .stats-row {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          flex: 1;
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 24px;
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
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-val {
          font-size: 24px;
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

        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
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

        @media (max-width: 768px) {
          .modules-grid { grid-template-columns: 1fr; }
          .welcome-text { font-size: 32px; }
          .stats-row { flex-direction: column; gap: 16px; }
          .analytics-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
