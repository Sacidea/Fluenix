'use client'

import React from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { Session } from '@/hooks/useProgressData'

interface CompetencyRadarProps {
  sessions: Session[]
}

// Map real session data into competencies.
// In a fully built app, this would be derived from NLP feedback tags.
// For now, we derive it from session types and scores.
const getCompetencyData = (sessions: Session[]) => {
  const scored = sessions.filter(s => typeof s.score === 'number')
  
  const getAvg = (type: string) => {
    const s = scored.filter(s => s.type === type)
    return s.length ? s.reduce((a, b) => a + Number(b.score), 0) / s.length : null
  }

  const scenarioAvg = getAvg('scenario') ?? 40
  const pronunciationAvg = getAvg('pronunciation') ?? 40
  const writingAvg = getAvg('writing') ?? 40
  const grammarAvg = getAvg('grammar') ?? 40
  const behavioralAvg = getAvg('behavioral') ?? 40
  const listeningAvg = getAvg('listening') ?? 40

  return [
    { subject: 'Clarity', A: scenarioAvg, fullMark: 100 },
    { subject: 'Vocabulary', A: writingAvg, fullMark: 100 },
    { subject: 'Grammar', A: grammarAvg, fullMark: 100 },
    { subject: 'Pronunciation', A: pronunciationAvg, fullMark: 100 },
    { subject: 'Leadership', A: behavioralAvg, fullMark: 100 },
    { subject: 'Listening', A: listeningAvg, fullMark: 100 },
  ]
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white',
        border: '1px solid #e2e8f0',
        padding: '8px 12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        fontSize: '12px',
        fontWeight: 600,
        color: '#0f172a'
      }}>
        {payload[0].payload.subject}: {Math.round(payload[0].value)}%
      </div>
    )
  }
  return null
}

export function CompetencyRadar({ sessions }: CompetencyRadarProps) {
  const data = getCompetencyData(sessions)

  return (
    <div className="radar-container">
      <div className="radar-header">
        <span className="card-label">Competency Profile</span>
      </div>
      <div className="radar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Competency"
              dataKey="A"
              stroke="#6366f1"
              strokeWidth={2}
              fill="#818cf8"
              fillOpacity={0.4}
              dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <style jsx>{`
        .radar-container {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .radar-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        .card-label {
          color: #0f172a;
          font-weight: 800;
          font-size: 14px;
        }
        .radar-chart-wrapper {
          flex: 1;
          min-height: 250px;
          width: 100%;
        }
      `}</style>
    </div>
  )
}
