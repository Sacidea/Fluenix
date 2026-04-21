import { currentUser } from '@clerk/nextjs/server'
import { getDashboardStats } from '@/lib/getDashboardStats'
import { ModuleCard } from '@/components/ModuleCard'
import { modulesData } from '@/data/modules'

export default async function DashboardPage() {
  const user = await currentUser()
  const stats = user ? await getDashboardStats(user.id) : null

  return (
    <div className="dash-root">
      <main className="main">
        <section className="welcome-section">
          <p className="welcome-eyebrow">Dashboard</p>
          <h1 className="welcome-title">
            Hey, {user?.firstName ?? 'Developer'} —<br />
            <span className="welcome-title-grad">ready to level up?</span>
          </h1>
          <p className="welcome-sub">
            Practice technical English with AI. Pick a module and start today.
          </p>
        </section>

        <div className="stats-grid">
          {[
            { icon: '🎯', value: stats?.totalSessions ?? 0, label: 'Sessions', accent: '#6366f1' },
            { icon: '🔥', value: stats?.streak ?? 0, label: 'Day Streak', accent: '#f59e0b' },
            { icon: '📈', value: stats?.averageScore ? `${Math.round(stats.averageScore)}` : '—', label: 'Avg Score', accent: '#10b981' },
          ].map((s) => (
            <div key={s.label} className="stat-card" style={{ borderTop: `3px solid ${s.accent}` }}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value" style={{ color: s.accent }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="section-label">Modules</div>
        <div className="modules-grid">
          {modulesData.map((mod, i) => (
            <ModuleCard key={mod.id} moduleData={mod} index={i} />
          ))}
        </div>
      </main>
    </div>
  )
}