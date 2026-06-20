'use client'

import React from 'react'
import { Session } from '@/hooks/useProgressData'
import { Flame } from 'lucide-react'

interface ActivityHeatmapProps {
  sessions: Session[]
}

const WEEKS = 5 // Display ~30 days (5 weeks to maintain grid)
const DAYS = 7

const getLocalYMD = (date: Date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Utility to generate the last N weeks of dates
function generateHeatmapData(sessions: Session[]) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Start from N weeks ago, rounded to the nearest Sunday
  const start = new Date(today)
  start.setDate(start.getDate() - (WEEKS * DAYS - 1))
  const dayOfWeek = start.getDay()
  start.setDate(start.getDate() - dayOfWeek) // Force start on Sunday

  const grid: { date: Date; intensity: number; count: number }[][] = Array.from({ length: DAYS }, () => [])

  // Map session dates to counts
  const countMap = sessions.reduce((acc, session) => {
    const dateStr = getLocalYMD(new Date(session.createdAt))
    acc[dateStr] = (acc[dateStr] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Fill the grid (column major: weeks -> days)
  let curr = new Date(start)
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const key = getLocalYMD(curr)
      const count = countMap[key] || 0
      
      let intensity = 0
      if (count === 1) intensity = 1
      else if (count === 2) intensity = 2
      else if (count >= 3) intensity = 3

      // Don't color future dates
      if (curr > today) {
        intensity = -1
      }

      grid[d].push({ date: new Date(curr), intensity, count })
      curr.setDate(curr.getDate() + 1)
    }
  }

  return grid
}

export function ActivityHeatmap({ sessions }: ActivityHeatmapProps) {
  const grid = generateHeatmapData(sessions)

  return (
    <div className="heatmap-container">
      <div className="heatmap-header">
        <span className="card-label">Activity Heatmap</span>
        <div className="streak-badge">
          <Flame size={14} color="#f59e0b" />
          <span>Consistency Streak</span>
        </div>
      </div>

      <div className="heatmap-scroll">
        <div className="heatmap-grid">
          {grid.map((dayRow, rIndex) => (
            <div key={rIndex} className="heatmap-row">
              {dayRow.map((cell, cIndex) => {
                let colorClass = 'lvl-0'
                if (cell.intensity === -1) colorClass = 'future'
                else if (cell.intensity === 1) colorClass = 'lvl-1'
                else if (cell.intensity === 2) colorClass = 'lvl-2'
                else if (cell.intensity === 3) colorClass = 'lvl-3'

                const title = cell.intensity === -1 
                  ? '' 
                  : `${cell.count} sessions on ${cell.date.toLocaleDateString()}`

                return (
                  <div 
                    key={cIndex} 
                    className={`heatmap-cell ${colorClass}`}
                    title={title}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .heatmap-container {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        .heatmap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .card-label {
          color: #0f172a;
          font-weight: 800;
          font-size: 14px;
        }
        .streak-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: #f59e0b;
          background: #fffbeb;
          padding: 4px 10px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .heatmap-scroll {
          overflow-x: auto;
          padding-bottom: 10px;
        }
        .heatmap-grid {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: max-content;
        }
        .heatmap-row {
          display: flex;
          gap: 4px;
        }
        .heatmap-cell {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          transition: transform 0.1s;
        }
        .heatmap-cell:hover {
          transform: scale(1.2);
        }
        
        /* FAANG-style Heatmap Colors (Blue/Indigo based instead of GitHub Green) */
        .lvl-0 { background: #f1f5f9; }
        .lvl-1 { background: #c7d2fe; }
        .lvl-2 { background: #818cf8; }
        .lvl-3 { background: #4f46e5; }
        .future { background: transparent; border: 1px dashed #e2e8f0; }

        /* Scrollbar styles */
        .heatmap-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .heatmap-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .heatmap-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}
