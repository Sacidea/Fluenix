'use client'

import React from 'react'
import { ClipboardList } from 'lucide-react'
import { WritingExercise } from '@/data/writingExercises'

interface Props {
  exercise: WritingExercise
}

export function WritingTaskPanel({ exercise }: Props) {
  return (
    <div className="wr-panel">
      <div className="wr-panel-header">
        <ClipboardList size={18} className="wr-panel-icon-svg" />
        <span className="wr-panel-title">Your Task</span>
      </div>
      <div className="wr-prompt">
        {exercise.prompt}
      </div>

      <style jsx>{`
        .wr-panel {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .wr-panel-header {
          padding: 16px 24px;
          border-bottom: 1.5px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fcfdfe;
        }

        .wr-panel-icon-svg {
          color: #6366f1;
        }

        .wr-panel-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .wr-prompt {
          padding: 24px;
          font-size: 14px;
          line-height: 1.8;
          color: #547593;
          font-family: 'JetBrains Mono', monospace;
          background: #fbfcfd;
          flex: 1;
        }
      `}</style>
    </div>
  )
}
