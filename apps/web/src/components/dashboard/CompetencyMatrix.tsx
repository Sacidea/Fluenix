import React from 'react'
import { Target } from 'lucide-react'

interface Session {
  feedback?: any
}

interface Props {
  sessions: Session[]
}

export function CompetencyMatrix({ sessions }: Props) {
  // Aggregate scores from sessions with feedback
  let totalFluency = 0
  let totalVocab = 0
  let totalTech = 0
  let totalTone = 0
  let count = 0

  sessions.forEach(s => {
    if (s.feedback) {
      let fb = s.feedback
      if (typeof fb === 'string') {
        try { fb = JSON.parse(fb) } catch(e) {}
      }

      if (fb.fluency_score || fb.vocabulary_score || fb.technical_accuracy || fb.clarity_score) {
        totalFluency += (fb.fluency_score || fb.clarity_score || 0)
        totalVocab += (fb.vocabulary_score || 0)
        totalTech += (fb.technical_accuracy || fb.technical_score || 0)
        // Assume professional tone if clarity exists but maybe not an exact match
        totalTone += (fb.professional_tone ?? fb.overall_score ?? 0)
        count++
      }
    }
  })

  const avg = (total: number) => count > 0 ? Math.round(total / count) : 0

  const metrics = [
    { label: 'Technical Accuracy', score: avg(totalTech), color: '#38bdf8' }, // sky blue
    { label: 'Fluency & Clarity', score: avg(totalFluency), color: '#818cf8' }, // indigo
    { label: 'Vocabulary Depth', score: avg(totalVocab), color: '#a78bfa' }, // purple
    { label: 'Professional Tone', score: avg(totalTone), color: '#34d399' }  // emerald
  ]

  return (
    <div className="matrix-container">
      <div className="matrix-header">
        <Target size={16} className="matrix-icon" />
        <span className="matrix-title">Competency Radar</span>
      </div>

      <div className="bars-wrapper">
        {metrics.map((m, i) => (
          <div key={i} className="bar-row">
            <div className="bar-labels">
              <span className="bar-name">{m.label}</span>
              <span className="bar-score">{m.score ? `${m.score}/100` : 'N/A'}</span>
            </div>
            <div className="bar-track">
              <div 
                className="bar-fill" 
                style={{ 
                  width: `${m.score || 0}%`, 
                  backgroundColor: m.color,
                  opacity: m.score ? 1 : 0.2
                }} 
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .matrix-container {
          background: var(--color-white);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }

        .matrix-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }

        .matrix-icon {
          color: var(--color-primary);
        }

        .matrix-title {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-mid);
        }

        .bars-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .bar-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bar-labels {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
        }

        .bar-name {
          color: var(--color-text-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .bar-score {
          color: var(--color-text-mid);
        }

        .bar-track {
          height: 6px;
          background: var(--color-bg);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 1s ease-out;
        }
      `}</style>
    </div>
  )
}
