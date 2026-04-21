'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useProgressData } from '@/hooks/useProgressData'
import { StatsCards } from '@/components/StatsCards'
import { SessionItem } from '@/components/SessionItem'

export default function ProgressPage() {
  const { user } = useUser()
  const { stats, sessions, loading, error, refetch } = useProgressData(user?.id)

  return (
    <div className="pr-root">
      <main className="pr-main">
        <p className="pr-eyebrow">Overview</p>
        <h1 className="pr-title">My Progress</h1>
        <p className="pr-sub">Track your improvement over time</p>

        {loading ? (
          <div className="pr-loading">
            <div className="pr-spinner" />
            Loading your stats...
          </div>
        ) : error ? (
          <div className="pr-empty">
            <div className="pr-empty-icon">⚠️</div>
            <div className="pr-empty-text">Something went wrong.</div>
            <button onClick={refetch} className="pr-start-btn">Try again</button>
          </div>
        ) : (
          <>
            <StatsCards stats={stats} />

            <div className="pr-section-title">Recent Sessions</div>

            {sessions.length === 0 ? (
              <div className="pr-empty">
                <div className="pr-empty-icon">📭</div>
                <div className="pr-empty-text">No sessions yet. Start practicing!</div>
                <Link href="/dashboard/scenario" className="pr-start-btn">
                  Start a Scenario →
                </Link>
              </div>
            ) : (
              <div className="pr-sessions">
                {sessions.map((session, i) => (
                  <SessionItem key={session.id} session={session} index={i} />
                ))}


              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}