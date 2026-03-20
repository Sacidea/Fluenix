import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

async function getUserStats(userId: string) {
  try {
    const res = await fetch(`http://localhost:3001/api/sessions/stats/${userId}`, {
      cache: 'no-store'
    })
    return await res.json()
  } catch {
    return { totalSessions: 0, averageScore: 0, streak: 0 }
  }
}

export default async function DashboardPage() {
  const user = await currentUser()
  const stats = user ? await getUserStats(user.id) : null

  const modules = [
    {
      id: 'scenario',
      title: 'Scenario Simulation',
      description: 'Technical interviews, standups & code reviews with AI',
      icon: '🎭',
      href: '/dashboard/scenario',
      available: true,
      tag: 'ACTIVE',
    },
    {
      id: 'writing',
      title: 'Technical Writing',
      description: 'PR descriptions, commit messages & documentation',
      icon: '✍️',
      href: '/dashboard/writing',
      available: true,
      tag: 'ACTIVE',
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Lab',
      description: 'Master 500+ technical terms with native comparison',
      icon: '🎙️',
      href: '/dashboard/pronunciation',
      available: false,
      tag: 'SOON',
    },
    {
      id: 'progress',
      title: 'Progress Map',
      description: 'Weekly scores, streaks & personalized insights',
      icon: '📊',
      href: '/dashboard/progress',
      available: true,
      tag: 'ACTIVE',
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-root {
          min-height: 100vh;
          background: #080b12;
          color: #e8eaf0;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .dash-root::before {
          content: '';
          position: fixed;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59,108,255,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          background: rgba(8,11,18,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, #4f7cff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #4f7cff;
          background: rgba(79,124,255,0.12);
          border: 1px solid rgba(79,124,255,0.25);
          padding: 2px 8px;
          border-radius: 20px;
          margin-left: 10px;
          vertical-align: middle;
        }

        .main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 40px;
          position: relative;
          z-index: 1;
        }

        .welcome-section { margin-bottom: 56px; }

        .welcome-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #4f7cff;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .welcome-title {
          font-family: 'Syne', sans-serif;
          font-size: 42px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 14px;
          color: #f0f2f8;
        }

        .welcome-title span {
          background: linear-gradient(135deg, #4f7cff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-sub {
          font-size: 16px;
          color: #6b7280;
          font-weight: 300;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 56px;
        }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .stat-card:hover { border-color: rgba(79,124,255,0.3); }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79,124,255,0.4), transparent);
        }

        .stat-icon { font-size: 20px; margin-bottom: 12px; }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #f0f2f8;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 13px;
          color: #4b5563;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #374151;
          margin-bottom: 20px;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .module-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px;
          text-decoration: none;
          color: inherit;
          display: block;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
        }

        .module-card.active:hover {
          border-color: rgba(79,124,255,0.4);
          background: rgba(79,124,255,0.05);
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(79,124,255,0.15);
        }

        .module-card.disabled {
          opacity: 0.4;
          cursor: not-allowed;
          pointer-events: none;
        }

        .module-tag {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 3px 10px;
          border-radius: 20px;
        }

        .module-tag.active-tag {
          background: rgba(79,124,255,0.15);
          color: #4f7cff;
          border: 1px solid rgba(79,124,255,0.3);
        }

        .module-tag.soon-tag {
          background: rgba(255,255,255,0.05);
          color: #4b5563;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .module-icon { font-size: 32px; margin-bottom: 16px; display: block; }

        .module-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #e8eaf0;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        .module-desc {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
          font-weight: 300;
        }

        .module-cta {
          margin-top: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #4f7cff;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.3px;
        }

        .divider-line {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #4f7cff, transparent);
          margin-bottom: 20px;
          border-radius: 2px;
        }
      `}</style>

      <div className="dash-root">
        <nav className="nav">
          <div>
            <span className="nav-logo">Fluenix</span>
            <span className="nav-badge">BETA</span>
          </div>
          <UserButton />
        </nav>

        <main className="main">
          <section className="welcome-section">
            <p className="welcome-eyebrow">Dashboard</p>
            <h1 className="welcome-title">
              Hey, {user?.firstName ?? 'Developer'} —<br />
              <span>ready to level up?</span>
            </h1>
            <p className="welcome-sub">
              Practice technical English with AI. Pick a module and start today.
            </p>
          </section>

          <div className="stats-grid">
            {[
              { icon: '🎯', value: stats?.totalSessions ?? 0, label: 'Sessions' },
              { icon: '🔥', value: stats?.streak ?? 0, label: 'Day Streak' },
              { icon: '📈', value: stats?.averageScore ? `${Math.round(stats.averageScore)}` : '—', label: 'Avg Score' },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="section-title">Modules</div>
          <div className="divider-line" />
          <div className="modules-grid">
            {modules.map((mod) =>
              mod.available ? (
                <Link key={mod.id} href={mod.href} className="module-card active">
                  <span className="module-tag active-tag">{mod.tag}</span>
                  <span className="module-icon">{mod.icon}</span>
                  <div className="module-title">{mod.title}</div>
                  <div className="module-desc">{mod.description}</div>
                  <div className="module-cta">Start practicing →</div>
                </Link>
              ) : (
                <div key={mod.id} className="module-card disabled">
                  <span className="module-tag soon-tag">{mod.tag}</span>
                  <span className="module-icon">{mod.icon}</span>
                  <div className="module-title">{mod.title}</div>
                  <div className="module-desc">{mod.description}</div>
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </>
  )
}