import React from 'react'
import { Activity } from 'lucide-react'

interface Session {
  id: string
  type: string
  createdAt: string
  score: number | null
}

interface Props {
  sessions: Session[]
}

export function ActivityHeatmap({ sessions }: Props) {
  // Generate last 90 days
  const days = 90
  const today = new Date()
  const dates: { dateStr: string; date: Date }[] = []
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    dates.push({
      dateStr: d.toISOString().split('T')[0],
      date: d
    })
  }

  // Count sessions per day
  const countsByDate = sessions.reduce((acc, session) => {
    const dateStr = new Date(session.createdAt).toISOString().split('T')[0]
    acc[dateStr] = (acc[dateStr] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Determine intensity level (0 to 4)
  const getIntensity = (count: number) => {
    if (count === 0) return 0
    if (count === 1) return 1
    if (count <= 3) return 2
    if (count <= 5) return 3
    return 4
  }

  const colors = [
    '#e2e8f0', // level 0 - empty
    '#c7d2fe', // level 1
    '#818cf8', // level 2
    '#4f46e5', // level 3
    '#312e81'  // level 4
  ]

  return (
    <div className="heatmap-container">
      <div className="heatmap-header">
        <div className="heatmap-title">
          <Activity size={16} className="heatmap-icon" />
          <span>Operational Activity (Last 90 Days)</span>
        </div>
        <div className="heatmap-stats">
          <span>{sessions.length} total sessions</span>
        </div>
      </div>

      <div className="heatmap-grid-scroll">
        <div className="heatmap-grid">
          {dates.map((d, i) => {
            const count = countsByDate[d.dateStr] || 0
            const intensity = getIntensity(count)
            const color = colors[intensity]
            
            return (
              <div 
                key={i} 
                className="heatmap-cell"
                style={{ backgroundColor: color }}
                title={`${d.dateStr}: ${count} sessions`}
              />
            )
          })}
        </div>
      </div>

      <div className="heatmap-legend">
        <span>Less</span>
        {colors.map((c, i) => (
          <div key={i} className="legend-cell" style={{ backgroundColor: c }} />
        ))}
        <span>More</span>
      </div>

      <style jsx>{`
        .heatmap-container {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }

        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .heatmap-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-mid);
        }

        .heatmap-icon {
          color: var(--color-primary);
        }

        .heatmap-stats {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text-mid);
        }

        .heatmap-grid-scroll {
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .heatmap-grid {
          display: grid;
          grid-template-rows: repeat(7, 1fr);
          grid-auto-flow: column;
          gap: 4px;
          /* approximate columns for 90 days */
          min-width: max-content;
        }

        .heatmap-cell {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          cursor: pointer;
          transition: transform 0.1s;
        }

        .heatmap-cell:hover {
          transform: scale(1.2);
          box-shadow: var(--shadow-md);
        }

        .heatmap-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          margin-top: 16px;
          font-size: 11px;
          font-weight: 600;
          color: var(--color-text-light);
        }

        .legend-cell {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          margin: 0 2px;
        }
      `}</style>
    </div>
  )
}
