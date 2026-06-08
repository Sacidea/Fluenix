'use client'

import Link from 'next/link'
import { AlertCircle, ArrowRight, TrendingUp } from 'lucide-react'
import { Session } from '@/hooks/useProgressData'
import { CompetencyRadar } from './CompetencyRadar'
import { ActivityHeatmap } from './ActivityHeatmap'

type SkillKey = 'scenario' | 'writing' | 'pronunciation'

type SkillStats = {
  label: string
  path: string
  average: number | null
  sessions: number
}

const skillConfig: Record<SkillKey, { label: string; path: string }> = {
  scenario: { label: 'Scenario', path: '/dashboard/scenario' },
  writing: { label: 'Writing', path: '/dashboard/writing' },
  pronunciation: { label: 'Pronunciation', path: '/dashboard/pronunciation' }
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10)

const getDailyTrend = (sessions: Session[], days = 30) => {
  const now = new Date()
  const start = new Date(now)
  start.setDate(start.getDate() - (days - 1))

  const scored = sessions.filter(s => typeof s.score === 'number')
  const grouped = new Map<string, number[]>()

  for (const s of scored) {
    const key = dayKey(new Date(s.createdAt))
    const arr = grouped.get(key) || []
    arr.push(Number(s.score))
    grouped.set(key, arr)
  }

  const trend: Array<{ label: string; avg: number; count: number }> = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = dayKey(d)
    const vals = grouped.get(key) || []
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
    trend.push({
      label: d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      avg,
      count: vals.length
    })
  }
  return trend
}

const getSkillStats = (sessions: Session[]): Record<SkillKey, SkillStats> => {
  const bySkill: Record<SkillKey, number[]> = {
    scenario: [],
    writing: [],
    pronunciation: []
  }

  for (const s of sessions) {
    if (s.type in bySkill && typeof s.score === 'number') {
      bySkill[s.type as SkillKey].push(Number(s.score))
    }
  }

  return {
    scenario: {
      ...skillConfig.scenario,
      sessions: bySkill.scenario.length,
      average: bySkill.scenario.length ? bySkill.scenario.reduce((a, b) => a + b, 0) / bySkill.scenario.length : null
    },
    writing: {
      ...skillConfig.writing,
      sessions: bySkill.writing.length,
      average: bySkill.writing.length ? bySkill.writing.reduce((a, b) => a + b, 0) / bySkill.writing.length : null
    },
    pronunciation: {
      ...skillConfig.pronunciation,
      sessions: bySkill.pronunciation.length,
      average: bySkill.pronunciation.length ? bySkill.pronunciation.reduce((a, b) => a + b, 0) / bySkill.pronunciation.length : null
    }
  }
}

const getNextAction = (sessions: Session[]) => {
  const skillStats = getSkillStats(sessions)
  const available = Object.entries(skillStats)
    .filter(([, v]) => v.average !== null)
    .sort((a, b) => (a[1].average || 0) - (b[1].average || 0))

  if (!available.length) {
    return {
      title: 'Start your first scored practice',
      description: 'Run at least one session with feedback so your personalized progress map can recommend the next step.',
      path: '/dashboard/scenario'
    }
  }

  const [weakestKey, weakest] = available[0] as [SkillKey, SkillStats]
  const total = sessions.filter(s => typeof s.score === 'number').length

  return {
    title: `Improve your ${weakest.label.toLowerCase()} track`,
    description: `Your current average is ${Math.round(weakest.average || 0)}% across ${weakest.sessions} scored sessions. Prioritize this module in your next 2 sessions to balance your profile (${total} scored sessions total).`,
    path: skillConfig[weakestKey].path
  }
}

const getWeeklyDelta = (sessions: Session[]) => {
  const scored = sessions
    .filter(s => typeof s.score === 'number')
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const now = new Date()
  const thisWeekStart = new Date(now)
  thisWeekStart.setDate(now.getDate() - 7)
  const prevWeekStart = new Date(now)
  prevWeekStart.setDate(now.getDate() - 14)

  const currentWeek = scored.filter(s => {
    const d = new Date(s.createdAt)
    return d >= thisWeekStart && d <= now
  })
  const previousWeek = scored.filter(s => {
    const d = new Date(s.createdAt)
    return d >= prevWeekStart && d < thisWeekStart
  })

  const currentCount = sessions.filter(s => {
    const d = new Date(s.createdAt)
    return d >= thisWeekStart && d <= now
  }).length

  const avg = (arr: Session[]) => (arr.length ? arr.reduce((a, b) => a + Number(b.score || 0), 0) / arr.length : null)
  const currentAvg = avg(currentWeek)
  const previousAvg = avg(previousWeek)
  const delta = currentAvg !== null && previousAvg !== null ? currentAvg - previousAvg : null

  return {
    currentAvg,
    previousAvg,
    delta,
    currentCount
  }
}

export function ProgressInsights({ sessions }: { sessions: Session[] }) {
  const trend = getDailyTrend(sessions, 30)
  const maxAvg = Math.max(...trend.map(t => t.avg), 1)
  const activeDays = trend.filter(t => t.count > 0).length
  const skillStats = getSkillStats(sessions)
  const nextAction = getNextAction(sessions)
  const weekly = getWeeklyDelta(sessions)
  const weeklyTarget = 5
  const weeklyProgress = Math.min((weekly.currentCount / weeklyTarget) * 100, 100)

  return (
    <section className="insights-root">
      <div className="advanced-metrics-grid">
        <ActivityHeatmap sessions={sessions} />
        <CompetencyRadar sessions={sessions} />
      </div>

      <div className="insights-grid">
        <article className="insight-card trend">
          <div className="card-head">
            <span className="card-label">30-Day Trend</span>
            <span className="card-meta"><TrendingUp size={14} /> {activeDays} active days</span>
          </div>
          <div className="trend-bars">
            {trend.map((point) => (
              <div key={point.label} className="bar-wrap" title={`${point.label}: ${Math.round(point.avg)}%`}>
                <div
                  className={`bar ${point.count > 0 ? 'active' : ''}`}
                  style={{ height: `${Math.max((point.avg / maxAvg) * 100, point.count > 0 ? 8 : 2)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="trend-foot">
            <span>{trend[0]?.label}</span>
            <span>{trend[trend.length - 1]?.label}</span>
          </div>
          <div className="delta-row">
            <span className="delta-label">7-day delta</span>
            <span className={`delta-value ${weekly.delta !== null && weekly.delta >= 0 ? 'up' : 'down'}`}>
              {weekly.delta === null ? '—' : `${weekly.delta >= 0 ? '+' : ''}${weekly.delta.toFixed(1)} pts`}
            </span>
          </div>
        </article>

        <article className="insight-card">
          <div className="card-head">
            <span className="card-label">Skill Breakdown</span>
          </div>
          <div className="skills">
            {Object.values(skillStats).map((skill) => (
              <div key={skill.label} className="skill-row">
                <div>
                  <div className="skill-name">{skill.label}</div>
                  <div className="skill-meta">{skill.sessions} scored sessions</div>
                </div>
                <div className="skill-score">
                  {skill.average === null ? '—' : `${Math.round(skill.average)}%`}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="goal-card">
        <div className="goal-top">
          <span className="card-label">Weekly Goal</span>
          <span className="goal-meta">{weekly.currentCount}/{weeklyTarget} sessions</span>
        </div>
        <div className="goal-track">
          <div className="goal-fill" style={{ width: `${weeklyProgress}%` }} />
        </div>
        <p className="goal-note">
          {weekly.currentCount >= weeklyTarget
            ? 'Target achieved. Keep momentum with deeper scenario practice.'
            : `Complete ${weeklyTarget - weekly.currentCount} more session(s) this week to hit your cadence target.`}
        </p>
      </article>

      <article className="next-card">
        <div className="next-head">
          <AlertCircle size={16} />
          <span>Next Best Action</span>
        </div>
        <h3>{nextAction.title}</h3>
        <p>{nextAction.description}</p>
        <Link href={nextAction.path} className="next-link">
          Open recommended module <ArrowRight size={14} />
        </Link>
      </article>

      <style jsx>{`
        .insights-root { margin-bottom: 36px; }
        .advanced-metrics-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .insights-grid {
          display: grid;
          grid-template-columns: 2fr 1.2fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .insight-card, .next-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
        }
        .card-head, .next-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #64748b;
          margin-bottom: 16px;
          font-size: 12px;
          font-weight: 700;
        }
        .card-label { color: #0f172a; font-weight: 800; }
        .card-meta { display: flex; align-items: center; gap: 6px; }
        .trend-bars {
          height: 120px;
          display: grid;
          grid-template-columns: repeat(30, 1fr);
          align-items: end;
          gap: 4px;
        }
        .bar-wrap { height: 100%; display: flex; align-items: end; }
        .bar {
          width: 100%;
          border-radius: 999px;
          background: #e2e8f0;
          transition: 0.2s ease;
        }
        .bar.active { background: #6366f1; }
        .trend-foot {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          color: #94a3b8;
          font-size: 11px;
        }
        .delta-row {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f1f5f9;
          padding-top: 10px;
        }
        .delta-label { font-size: 12px; color: #64748b; font-weight: 700; }
        .delta-value { font-size: 12px; font-weight: 900; }
        .delta-value.up { color: #059669; }
        .delta-value.down { color: #dc2626; }
        .skills { display: flex; flex-direction: column; gap: 12px; }
        .skill-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 10px;
          border-bottom: 1px solid #f1f5f9;
        }
        .skill-row:last-child { border-bottom: none; padding-bottom: 0; }
        .skill-name { font-weight: 700; color: #0f172a; }
        .skill-meta { font-size: 12px; color: #94a3b8; }
        .skill-score { font-weight: 900; color: #4338ca; }
        .next-head { justify-content: flex-start; gap: 8px; margin-bottom: 10px; }
        .next-card h3 { margin: 0 0 8px; color: #0f172a; font-size: 18px; }
        .next-card p { margin: 0 0 14px; color: #64748b; line-height: 1.6; font-size: 14px; }
        .next-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #4338ca;
          font-weight: 800;
          text-decoration: none;
        }
        .goal-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 18px 20px;
          margin-bottom: 16px;
        }
        .goal-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .goal-meta { font-size: 12px; color: #64748b; font-weight: 700; }
        .goal-track {
          width: 100%;
          height: 10px;
          border-radius: 999px;
          background: #e2e8f0;
          overflow: hidden;
        }
        .goal-fill {
          height: 100%;
          background: linear-gradient(90deg, #4338ca, #6366f1);
        }
        .goal-note {
          margin: 10px 0 0;
          font-size: 13px;
          color: #64748b;
        }
        @media (max-width: 900px) {
          .insights-grid, .advanced-metrics-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
