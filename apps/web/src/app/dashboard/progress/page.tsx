'use client'

import { useEffect, useState, useCallback } from 'react'
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
  const [error, setError] = useState(false)

  const fetchData = useCallback(async () => {
    if (!user) return
    setError(false)
    setLoading(true)
    try {
      const [statsRes, sessionsRes] = await Promise.all([
        axios.get(`http://localhost:3001/api/sessions/stats/${user.id}`),
        axios.get(`http://localhost:3001/api/sessions/user/${user.id}`)
      ])
      setStats(statsRes.data)
      setSessions(sessionsRes.data)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pr-root {
          min-height: 100vh;
          background: #f8faff;
          color: #102D47;
          font-family: 'DM Sans', sans-serif;
        }

        .pr-nav {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 40px;
          height: 68px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #e8edf5;
          box-shadow: 0 1px 12px rgba(0,0,0,0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .pr-back {
          font-size: 13px;
          font-weight: 500;
          color: #547593;
          text-decoration: none;
          transition: color 0.2s;
        }

        .pr-back:hover { color: #102D47; }
        .pr-nav-sep { color: #cbd5e1; }
        .pr-nav-title { font-size: 15px; font-weight: 600; color: #102D47; }

        .pr-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 40px;
        }

        .pr-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #10b981;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pr-title {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
          color: #102D47;
          line-height: 1.2;
        }

        .pr-sub {
          font-size: 15px;
          color: #547593;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .pr-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }

        .pr-stat {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.25s ease;
        }

        .pr-stat:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .pr-stat-icon { font-size: 24px; margin-bottom: 10px; }

        .pr-stat-value {
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 4px;
          line-height: 1;
        }

        .pr-stat-label {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 600;
        }

        .pr-section-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 16px;
        }

        .pr-sessions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pr-session {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          transition: all 0.2s;
        }

        .pr-session:hover {
          border-color: #6366f1;
          transform: translateX(4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        .pr-session-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .pr-session-icon {
          width: 44px; height: 44px;
          background: #eef2ff;
          border: 1.5px solid #c7d2fe;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .pr-session-type {
          font-size: 14px;
          font-weight: 600;
          color: #102D47;
          margin-bottom: 3px;
          text-transform: capitalize;
        }

        .pr-session-date {
          font-size: 12px;
          color: #94a3b8;
        }

        .pr-session-score {
          font-size: 22px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 10px;
        }

        .pr-empty {
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
        }

        .pr-empty-icon { font-size: 48px; margin-bottom: 14px; }
        .pr-empty-text { font-size: 15px; margin-bottom: 24px; color: #547593; }

        .pr-start-btn {
          display: inline-block;
          padding: 13px 28px;
          background: linear-gradient(135deg, #10b981, #0ea5e9);
          border-radius: 12px;
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(16,185,129,0.3);
        }

        .pr-start-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16,185,129,0.4);
        }

        .pr-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: #547593;
          font-size: 14px;
          gap: 12px;
        }

        .pr-spinner {
          width: 20px; height: 20px;
          border: 2.5px solid #e8edf5;
          border-top-color: #10b981;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .pr-error {
          text-align: center;
          padding: 60px 20px;
        }

        .pr-retry-btn {
          padding: 10px 24px;
          background: #6366f1;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          margin-top: 16px;
          transition: all 0.2s;
        }

        .pr-retry-btn:hover { background: #4f46e5; }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="pr-root">
        <nav className="pr-nav">
          <Link href="/dashboard" className="pr-back">← Back</Link>
          <span className="pr-nav-sep">|</span>
          <span className="pr-nav-title">My Progress</span>
        </nav>

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
            <div className="pr-error">
              <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
              <div style={{ color: '#547593', fontSize: 15 }}>Could not load data. Check your connection.</div>
              <button className="pr-retry-btn" onClick={fetchData}>
                Try Again
              </button>
            </div>
          ) : (
            <>
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
                    <div
                      key={session.id}
                      className="pr-session"
                      data-aos="fade-up"
                      data-aos-delay={i * 50}
                    >
                      <div className="pr-session-left">
                        <div className="pr-session-icon">
                          {session.type === 'scenario' ? '🎭' : '✍️'}
                        </div>
                        <div>
                          <div className="pr-session-type">
                            {session.scenario ?? session.type}
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