'use client'

import React from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ModuleCard } from '@/components/ModuleCard'
import { modulesData } from '@/data/modules'

interface Props {
  user: any
  stats: any
}

export default function DashboardClient({ user, stats }: Props) {
  const statsConfig = [
    { id: 'sessions', icon: 'Target', value: stats?.totalSessions ?? 0, label: 'Sessions', color: '#6366f1' },
    { id: 'streak', icon: 'Flame', value: stats?.streak ?? 0, label: 'Day Streak', color: '#f59e0b' },
    { id: 'score', icon: 'TrendingUp', value: stats?.averageScore ? `${Math.round(stats.averageScore)}` : '—', label: 'Avg Score', color: '#10b981' },
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

        {/* MODULES GRID (Clean & Corporate) */}
        <section className="modules-section">
          <div className="section-header">
            <span className="header-label">Available Lab Modules</span>
          </div>
          
          <div className="modules-grid">
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
          background: #f8fafc;
          padding: 80px 40px;
        }

        .dash-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .welcome-area {
          margin-bottom: 80px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 40px;
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
          background: #4338ca;
        }

        .eyebrow {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #94a3b8;
        }

        .welcome-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 40px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1.5px;
          color: #0f172a;
          margin-bottom: 24px;
        }

        .serif-grad {
          font-family: 'Georgia', serif;
          font-style: italic;
          color: #4338ca;
          font-weight: 400;
        }

        .description {
          font-size: 15px;
          color: #64748b;
          max-width: 550px;
          line-height: 1.8;
        }

        .modules-section {
          margin-top: 60px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #94a3b8;
          white-space: nowrap;
        }

        .section-line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px; /* Increased gap for better breathing room */
        }

        .terminal-footer {
          margin-top: 100px;
          padding-top: 32px;
          border-top: 1px solid #f1f5f9;
        }

        .footer-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          color: #cbd5e1;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .modules-grid { grid-template-columns: 1fr; }
          .welcome-text { font-size: 32px; }
        }
      `}</style>
    </div>
  )
}
