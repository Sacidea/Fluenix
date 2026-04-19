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
      color: '#6366f1',
      bg: '#eef2ff',
      border: '#c7d2fe',
    },
    {
      id: 'writing',
      title: 'Technical Writing',
      description: 'PR descriptions, commit messages & documentation',
      icon: '✍️',
      href: '/dashboard/writing',
      available: true,
      tag: 'ACTIVE',
      color: '#0ea5e9',
      bg: '#e0f2fe',
      border: '#bae6fd',
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Lab',
      description: 'Master 500+ technical terms with native comparison',
      icon: '🎙️',
      href: '/dashboard/pronunciation',
      available: false,
      tag: 'SOON',
      color: '#f59e0b',
      bg: '#fffbeb',
      border: '#fde68a',
    },
    {
      id: 'progress',
      title: 'Progress Map',
      description: 'Weekly scores, streaks & personalized insights',
      icon: '📊',
      href: '/dashboard/progress',
      available: true,
      tag: 'ACTIVE',
      color: '#10b981',
      bg: '#ecfdf5',
      border: '#a7f3d0',
    },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dash-root {
          min-height: 100vh;
          background: #f8faff;
          color: #0f172a;
          font-family: 'DM Sans', sans-serif;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 75px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #e8edf5;
          box-shadow: 0 1px 12px rgba(0,0,0,0.06);
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-logo {
  font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 27px;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #6366f1, #0ea5e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

        .nav-badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #6366f1;
          background: #eef2ff;
          border: 1px solid #c7d2fe;
          padding: 2px 8px;
          border-radius: 20px;
        }

        .main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 52px 40px;
        }

        .welcome-section { margin-bottom: 48px; }

        .welcome-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #6366f1;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .welcome-title {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 48px;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -1.5px;
          margin-bottom: 12px;
          color: #102D47;
        }


        .welcome-title span {
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-sub {
          font-size: 16px;
          color: #64748b;
          font-weight: 400;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 52px;
        }

        .stat-card {
          background: white;
          border: 1px solid #e8edf5;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: all 0.25s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .stat-icon { font-size: 28px; margin-bottom: 12px; }

      .stat-value {
  font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
  line-height: 1;
}

        .stat-label {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .section-label {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 16px;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .module-card {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 20px;
          padding: 28px;
          text-decoration: none;
          color: inherit;
          display: block;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .module-card.active:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.1);
        }

        .module-card.disabled {
          opacity: 0.55;
          cursor: not-allowed;
          pointer-events: none;
        }

        .module-card-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          border-radius: 20px 20px 0 0;
        }

        .module-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 16px;
        }

        .module-icon {
          font-size: 36px;
          margin-bottom: 14px;
          display: block;
        }

        .module-title {
          font-family:var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .module-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }

        .module-cta {
          margin-top: 30px;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 10px;
          transition: all 0.2s;
        }
      `}</style>

      <div className="dash-root">
        <nav className="nav">
          <div className="nav-left">
            <span className="nav-logo">Fluenix</span>
            <span className="nav-badge">BETA</span>
          </div>
          <UserButton />
        </nav>

        <main className="main">
          <section className="welcome-section">
  <p className="welcome-eyebrow" data-aos="fade-up">Dashboard</p>
  <h1 className="welcome-title" data-aos="fade-up" data-aos-delay="100">
    Hey, {user?.firstName ?? 'Developer'} —<br />
    <span>ready to level up?</span>
  </h1>
  <p className="welcome-sub" data-aos="fade-up" data-aos-delay="200">
    Practice technical English with AI. Pick a module and start today.
  </p>
</section>

          <div className="stats-grid">
         {[
  { icon: '🎯', value: stats?.totalSessions ?? 0, label: 'Sessions', accent: '#6366f1' },
  { icon: '🔥', value: stats?.streak ?? 0, label: 'Day Streak', accent: '#f59e0b' },
  { icon: '📈', value: stats?.averageScore ? `${Math.round(stats.averageScore)}` : '—', label: 'Avg Score', accent: '#10b981' },
].map((s, i) => (
  <div
    key={s.label}
    className="stat-card"
    style={{ borderTop: `3px solid ${s.accent}` }}
    data-aos="fade-up"
    data-aos-delay={i * 100}
  >
    <div className="stat-icon">{s.icon}</div>
    <div className="stat-value" style={{ color: s.accent }}>{s.value}</div>
    <div className="stat-label">{s.label}</div>
  </div>
))}
          </div>

          <div className="section-label">Modules</div>
          <div className="modules-grid">
           {modules.map((mod, i) =>
  mod.available ? (
    <Link
      key={mod.id}
      href={mod.href}
      className="module-card active"
      data-aos="fade-up"
      data-aos-delay={i * 80}
    >
      <div className="module-card-accent" style={{ background: mod.color }} />
      <span
        className="module-tag"
        style={{ background: mod.bg, color: mod.color, border: `1px solid ${mod.border}` }}
      >
        {mod.tag}
      </span>
      <span className="module-icon">{mod.icon}</span>
      <div className="module-title">{mod.title}</div>
      <div className="module-desc">{mod.description}</div>
      <div
        className="module-cta"
        style={{ background: mod.bg, color: mod.color }}
      >
        Start practicing →
      </div>
    </Link>
  ) : (
    <div
     key={mod.id}
      className="module-card disabled"
      data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
      data-aos-delay={i * 80}
    >
      <div className="module-card-accent" style={{ background: mod.color }} />
      <span
        className="module-tag"
        style={{ background: mod.bg, color: mod.color, border: `1px solid ${mod.border}` }}
      >
        {mod.tag}
      </span>
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