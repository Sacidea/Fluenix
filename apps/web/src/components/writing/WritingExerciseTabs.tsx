'use client'

import React from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { writingExercises, WritingExerciseId } from '@/data/writingExercises'

interface Props {
  activeId: WritingExerciseId
  onSelect: (id: WritingExerciseId) => void
}

export function WritingExerciseTabs({ activeId, onSelect }: Props) {
  return (
    <nav className="wr-tabs">
      {writingExercises.map((ex) => {
        const IconComponent = (Icons as any)[ex.icon] || Icons.HelpCircle
        const isActive = activeId === ex.id

        return (
          <button
            key={ex.id}
            className={`wr-tab ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(ex.id)}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabGlow"
                className="wr-tab-bg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <span className="wr-tab-content">
              <IconComponent 
                size={14} 
                className="wr-tab-icon" 
              />
              <span className="wr-tab-label">{ex.label}</span>
            </span>
          </button>
        )
      })}

      <style jsx>{`
        .wr-tabs {
          display: flex;
          gap: 6px;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .wr-tab {
          position: relative;
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #64748b;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.2s ease;
          outline: none;
        }

        .wr-tab.active {
          color: #4338ca;
        }

        .wr-tab-bg {
          position: absolute;
          inset: 0;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }

        .wr-tab-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 640px) {
          .wr-tab-label { display: none; }
          .wr-tab { padding: 8px; }
        }
      `}</style>
    </nav>
  )
}
