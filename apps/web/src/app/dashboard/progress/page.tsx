'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import axios from 'axios'

type Stats = {
  totalSessions: number
  averageScore: number
  streak: number
  lastSession: string | null
}

type Session = {
  id: string
  type: string
  scenario?: string
  score?: number
  duration: number
  createdAt: string
}

export default function ProgressPage() {
  const { user } = useUser()
  const [stats, setStats] = useState<Stats | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
      try {
        const [statsRes, sessionsRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/sessions/stats/${user.id}`),
          axios.get(`http://localhost:3001/api/sessions/user/${user.id}`)
        ])
        setStats(statsRes.data)
        setSessions(sessionsRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pr-root {
          min-height: 100vh;
          background: #080b12;
          color: #e8eaf0;
          font-family: 'DM Sans', sans-serif;
        }

        .pr-nav {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 40px;
          height: 64px;
          background: rgba(8,11,18,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .pr-back {
          font-size: 13px;
          color: #4b5563;
          text-decoration: none;
          transition: color 0.2s;
        }

        .pr-back:hover { color: #e8eaf0; }

        .pr-nav-sep { color: #1f2937; }

        .pr-nav-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
        }

        .pr-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 40px;
        }

        .pr-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
        }

        .pr-sub {
          font-size: 15px;
          color: #4b5563;
          margin-bottom: 40px;
        }

        .pr-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 40px;
        }

        .pr-stat {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .pr-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79,124,255,0.4), transparent);
        }

        .pr-stat-icon { font-size: 20px; margin-bottom: 10px; }

        .pr-stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #4f7cff;
          margin-bottom: 4px;
        }

        .pr-stat-label {
          font-size: 12px;
          color: #4b5563;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pr-section-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #374151;
          margin-bottom: 16px;
        }

        .pr-sessions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pr-session {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          animation: fadeUp 0.3s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pr-session-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .pr-session-icon {
          width: 40px; height: 40px;
          background: rgba(79,124,255,0.1);
          border: 1px solid rgba(79,124,255,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .pr-session-type {
          font-size: 14px;
          font-weight: 500;
          color: #e8eaf0;
          margin-bottom: 2px;
        }

        .pr-session-date {
          font-size: 12px;
          color: #4b5563;
        }

        .pr-session-score {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #4f7cff;
        }

        .pr-empty {
          text-align: center;
          padding: 60px 20px;
          color: #374151;
        }

        .pr-empty-icon { font-size: 40px; margin-bottom: 12px; }
        .pr-empty-text { font-size: 15px; margin-bottom: 20px; }

        .pr-start-btn {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #4f7cff, #7c5cfc);
          border-radius: 12px;
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .pr-start-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(79,124,255,0.35);
        }

        .pr-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: #374151;
          font-size: 14px;
          gap: 10px;
        }

        .pr-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(79,124,255,0.2);
          border-top-color: #4f7cff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="pr-root">
        <nav className="pr-nav">
          <Link href="/dashboard" className="pr-back">← Back</Link>
          <span className="pr-nav-sep">|</span>
          <span className="pr-nav-title">My Progress</span>
        </nav>

        <main className="pr-main">
          <h1 className="pr-title">My Progress</h1>
          <p className="pr-sub">Track your improvement over time</p>

          {loading ? (
            <div className="pr-loading">
              <div className="pr-spinner" />
              Loading your stats...
            </div>
          ) : (
            <>
              <div className="pr-stats">
                {[
                  { icon: '🎯', value: stats?.totalSessions ?? 0, label: 'Total Sessions' },
                  { icon: '📈', value: stats?.averageScore ? `${stats.averageScore}` : '—', label: 'Avg Score' },
                  { icon: '🔥', value: `${stats?.streak ?? 0}`, label: 'Day Streak' },
                  { icon: '📅', value: stats?.lastSession ? new Date(stats.lastSession).toLocaleDateString() : '—', label: 'Last Session' },
                ].map(s => (
                  <div key={s.label} className="pr-stat">
                    <div className="pr-stat-icon">{s.icon}</div>
                    <div className="pr-stat-value">{s.value}</div>
                    <div className="pr-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

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
                  {sessions.map(session => (
                    <div key={session.id} className="pr-session">
                      <div className="pr-session-left">
                        <div className="pr-session-icon">
                          {session.type === 'scenario' ? '🎭' : '✍️'}
                        </div>
                        <div>
                          <div className="pr-session-type">
                            {session.scenario ?? session.type}
                          </div>
                          <div className="pr-session-date">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {session.score && (
                        <div className="pr-session-score">{session.score}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}