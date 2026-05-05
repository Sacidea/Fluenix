'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, Check, Settings2, Sliders } from 'lucide-react'
import { useLevel } from '@/context/LevelContext'

const LEVEL_MAP = {
  'A2': { label: 'A2 - Elementary', desc: 'Standard operations', color: '#4a6fa5' },
  'B1': { label: 'B1 - Intermediate', desc: 'Technical fluency', color: '#8d7b68' },
  'B2': { label: 'B2 - Upper Inter.', desc: 'High-level analysis', color: '#c18161' },
  'C1': { label: 'C1 - Advanced', desc: 'Architectural mastery', color: '#4338ca' },
  'C2': { label: 'C2 - Mastery', desc: 'Strategic authority', color: '#0f172a' },
}

export function LevelSelector({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const { level, setLevel, loading } = useLevel()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleLevelChange = async (newLevel: string) => {
    setIsOpen(false)
    if (newLevel !== level) await setLevel(newLevel)
  }

  if (loading) return <div className="ls-skeleton" />

  const activeObj = LEVEL_MAP[level as keyof typeof LEVEL_MAP] || LEVEL_MAP['A2']

  return (
    <div className="ledger-level-selector" ref={menuRef}>
      <button 
        className={`selector-btn ${isOpen ? 'active' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Level Calibration"
      >
        <div className="btn-left">
          <div className="icon-box">
             <Sliders size={14} strokeWidth={3} />
          </div>
          {!isCollapsed && (
            <div className="label-group">
              <span className="eyebrow">Level Calibration</span>
              <span className="current-val" style={{ color: activeObj.color }}>{activeObj.label}</span>
            </div>
          )}
        </div>
        {!isCollapsed && <ChevronDown size={14} className={`chevron ${isOpen ? 'rotate' : ''}`} />}
      </button>

      {isOpen && (
        <div className="dropdown">
          <div className="dropdown-header">Select Target Proficiency</div>
          <div className="options-list">
            {Object.entries(LEVEL_MAP).map(([key, obj]) => (
              <button 
                key={key}
                className={`option-item ${level === key ? 'selected' : ''}`}
                onClick={() => handleLevelChange(key)}
              >
                <div className="option-info">
                   <span className="opt-label" style={{ color: level === key ? obj.color : 'inherit' }}>{obj.label}</span>
                   <span className="opt-desc">{obj.desc}</span>
                </div>
                {level === key && <Check size={14} strokeWidth={3} style={{ color: obj.color }} />}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .ledger-level-selector {
          position: relative;
          width: 100%;
        }

        .selector-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .selector-btn:hover, .selector-btn.active {
          border-color: #cbd5e1;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .btn-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-box {
          width: 32px;
          height: 32px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
        }

        .label-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .eyebrow {
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #94a3b8;
          margin-bottom: 2px;
        }

        .current-val {
          font-family: var(--font-serif);
          font-size: 15px;
          font-weight: 900;
          letter-spacing: -0.2px;
        }

        .chevron {
          color: #94a3b8;
          transition: transform 0.3s;
        }

        .chevron.rotate { transform: rotate(180deg); }

        .dropdown {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 0;
          width: 240px;
          background: white;
          border: 1px solid #e2e8f0;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          border-radius: 16px;
          overflow: hidden;
          z-index: 1000;
          padding: 8px;
        }

        .dropdown-header {
          padding: 12px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          color: #94a3b8;
          letter-spacing: 1px;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 8px;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .option-item {
          width: 100%;
          padding: 10px 12px;
          border: none;
          background: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .option-item:hover { background: #f8fafc; }
        .option-item.selected { background: #f8fafc; }

        .option-info { display: flex; flex-direction: column; }
        .opt-label { 
          font-family: var(--font-serif);
          font-size: 14px; 
          font-weight: 800; 
        }
        .opt-desc { 
          font-family: var(--font-mono);
          font-size: 9px; 
          font-weight: 600;
          text-transform: uppercase;
          color: #94a3b8; 
          letter-spacing: 0.5px;
        }

        .ls-skeleton {
          width: 100%;
          height: 60px;
          background: #f1f5f9;
          border-radius: 12px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
      `}</style>
    </div>
  )
}
