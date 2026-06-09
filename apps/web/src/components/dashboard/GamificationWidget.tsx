import React from 'react'

interface Props {
  totalSessions: number
  currentWeeklyCount: number
  weeklyTarget: number
  weeklyProgress: number
}

export function GamificationWidget({ totalSessions, currentWeeklyCount, weeklyTarget, weeklyProgress }: Props) {
  return (
    <>
      <div className="gamification-card">
        <div className="gamification-header" style={{ justifyContent: 'flex-end' }}>
          <div className="xp-badge">
            <span className="xp-val">{totalSessions * 150}</span>
            <span className="xp-lbl">XP</span>
          </div>
        </div>
        
        <div className="goal-container">
          <div className="goal-text">
            <span className="goal-title">Weekly Goal</span>
            <span className="goal-progress">{currentWeeklyCount}/{weeklyTarget} Sessions</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${weeklyProgress}%` }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .gamification-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1.5px solid #e8edf5;
        }

        .gamification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .xp-badge {
          display: flex;
          align-items: baseline;
          gap: 4px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          padding: 6px 14px;
          border-radius: 12px;
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .xp-val { font-weight: 900; font-size: 18px; }
        .xp-lbl { font-size: 10px; font-weight: 800; opacity: 0.8; letter-spacing: 1px; }

        .goal-container { margin-top: auto; }
        .goal-text { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px; }
        .goal-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        .goal-progress { font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: #1e293b; }

        .progress-track {
          height: 6px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          border-radius: 4px;
          transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  )
}
