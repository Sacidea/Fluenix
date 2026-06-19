'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useUser, useAuth } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { Layout, Terminal, ShieldCheck, AlertTriangle, Inbox } from 'lucide-react'
import { useProgressData } from '@/hooks/useProgressData'
import { StatsCards } from '@/components/StatsCards'
import { SessionItem } from '@/components/SessionItem'
import { ProgressInsights } from '@/components/ProgressInsights'
import { SessionDetailPanel } from '@/components/SessionDetailPanel'
import type { Session } from '@/hooks/useProgressData'

export default function ProgressPage() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const { stats, sessions, loading, error, refetch } = useProgressData(user?.id)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this session record?')) return
    
    try {
      const token = await getToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/sessions/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      if (res.ok) {
        refetch(true) // Reload progress data silently
      } else {
        alert('Failed to delete session')
      }
    } catch (err) {
      alert('Network error')
    }
  }

  return (
    <div className="ledger-progress-root">
      <main className="progress-container">
        
        {/* PROGRESS HEADER */}
        <header className="progress-header">
           <div className="eyebrow-group">
            <div className="line" />
            <span className="eyebrow">Personnel Dossier</span>
          </div>
          <h1 className="progress-title">
            Competency <span className="serif-grad">Progress Map</span>
          </h1>
          <p className="progress-sub">
            Tracking technical proficiency across all active simulation environments.
          </p>
        </header>

        {loading ? (
          <div className="state-display">
            <div className="spinner" />
            <span>Analyzing session data...</span>
          </div>
        ) : error ? (
          <div className="state-display error">
            <AlertTriangle size={48} className="error-icon" />
            <h3>Data Synchronization Error</h3>
            <p>Could not retrieve your operational metrics at this time.</p>
            <button onClick={refetch} className="retry-btn">Re-initialize Sync</button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* STATS DOSSIER */}
            <StatsCards stats={stats} />
            <ProgressInsights sessions={sessions} />

            {/* RECENT SESSIONS SECTION */}
            <div className="sessions-section">
              <div className="section-header">
                <span className="header-label">Operational Record Log</span>
                <div className="h-line" />
              </div>

              {sessions.length === 0 ? (
                <div className="state-display empty">
                  <Inbox size={48} className="empty-icon" />
                  <h3>No Operational Logs Found</h3>
                  <p>Start your first session to begin building your personnel dossier.</p>
                  <Link href="/dashboard/scenario" className="start-btn">
                    Launch Scenario Simulation
                  </Link>
                </div>
              ) : (
                <div className="sessions-grid">
                  {sessions.map((session, i) => (
                    <SessionItem
                      key={session.id}
                      session={session}
                      index={i}
                      onSelect={setSelectedSession}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        <footer className="progress-footer">
          <div className="f-line" />
          <p className="f-status">
            <ShieldCheck size={14} />
            <span>Verified Technical Proficiency Record — v1.2</span>
          </p>
        </footer>

      </main>
      <SessionDetailPanel session={selectedSession} onClose={() => setSelectedSession(null)} />

      <style jsx>{`
        .ledger-progress-root {
          min-height: 100vh;
          background: #f8fafc;
          padding: 80px 40px;
        }

        .progress-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .progress-header {
          margin-bottom: 60px;
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

        .progress-title {
          font-size: 40px;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -1.5px;
          margin-bottom: 16px;
        }

        .serif-grad {
          font-family: 'Georgia', serif;
          font-style: italic;
          color: #4338ca;
          font-weight: 400;
        }

        .progress-sub {
          font-size: 15px;
          color: #64748b;
          max-width: 500px;
          line-height: 1.8;
        }

        .sessions-section {
          margin-top: 60px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }

        .header-label {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #94a3b8;
          white-space: nowrap;
        }

        .h-line {
          flex: 1;
          height: 1px;
          background: #f1f5f9;
        }

        .sessions-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .state-display {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          color: #64748b;
        }

        .state-display.error { border-color: #fecaca; background: #fff8f8; }
        .error-icon { color: #dc2626; margin-bottom: 16px; }
        .state-display h3 { color: #0f172a; font-weight: 800; margin-bottom: 12px; }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e2e8f0;
          border-top-color: #4338ca;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .retry-btn, .start-btn {
          margin-top: 24px;
          padding: 12px 24px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          cursor: pointer;
          font-size: 14px;
        }

        .progress-footer {
          margin-top: 100px;
          padding-top: 32px;
          border-top: 1px solid #f1f5f9;
        }

        .f-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          color: #cbd5e1;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .progress-container { padding: 40px 20px; }
          .progress-title { font-size: 32px; }
        }
      `}</style>
    </div>
  )
}