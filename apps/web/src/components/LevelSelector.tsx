'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'

const LEVEL_MAP = {
  'beginner': { label: 'Beginner', color: '#64748b', bg: '#f1f5f9', border: '#cbd5e1' },
  'A1': { label: 'A1 - Starter', color: '#10b981', bg: '#ecfdf5', border: '#a7f3d0' },
  'A2': { label: 'A2 - Elementary', color: '#0ea5e9', bg: '#e0f2fe', border: '#bae6fd' },
  'B1': { label: 'B1 - Intermediate', color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe' },
  'B2': { label: 'B2 - Upper Inter.', color: '#8b5cf6', bg: '#f3e8ff', border: '#ddd6fe' },
  'C1': { label: 'C1 - Advanced', color: '#d946ef', bg: '#fae8ff', border: '#f5d0fe' },
  'C2': { label: 'C2 - Mastery', color: '#f43f5e', bg: '#ffe4e6', border: '#fecdd3' },
}

export function LevelSelector() {
  const { user } = useUser()
  const [level, setLevel] = useState('beginner')
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) return
    const fetchLevel = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/${user.id}`)
        if (res.data?.level) {
          setLevel(res.data.level)
        }
      } catch (err) {
        console.error('Failed to get user level', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLevel()
  }, [user])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleLevelChange = async (newLevel: string) => {
    if (!user || newLevel === level) {
      setIsOpen(false)
      return
    }
    setLevel(newLevel)
    setIsOpen(false)
    try {
      await axios.put(`http://localhost:3001/api/users/${user.id}/level`, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        level: newLevel
      })
    } catch (err) {
      console.error('Failed to update level', err)
    }
  }

  if (loading) return <div className="ls-skeleton" />

  const activeObj = LEVEL_MAP[level as keyof typeof LEVEL_MAP] || LEVEL_MAP['beginner']

  return (
    <div className="ls-wrapper" ref={menuRef}>
      <style>{`
        .ls-wrapper {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          width: 100%;
        }
        .ls-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          outline: none;
        }
        .ls-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .ls-btn:active {
          transform: scale(0.95);
        }
        .ls-btn-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .ls-eyebrow {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #94a3b8;
        }
        .ls-active-label {
          font-size: 14px;
          font-weight: 700;
          color: var(--color);
        }
        .ls-caret {
          color: var(--color);
          font-size: 10px;
          transition: transform 0.3s ease;
        }
        .ls-caret.open {
          transform: rotate(180deg);
        }

        .ls-dropdown {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 0;
          width: 100%;
          background: white;
          border-radius: 12px;
          border: 1.5px solid #e8edf5;
          padding: 8px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
          z-index: 100;
          transform-origin: bottom center;
          animation: popUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        @keyframes popUp {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ls-option {
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          color: #547593;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ls-option:hover {
          background: var(--bg);
          color: var(--color);
        }
        .ls-option.selected {
          background: var(--bg);
          color: var(--color);
          font-weight: 700;
        }

        .ls-skeleton {
          width: 100%;
          height: 52px;
          background: #f1f5f9;
          border-radius: 12px;
          animation: pulse 1.5s infinite;
        }
      `}</style>
      
      <button 
        className="ls-btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          '--bg': activeObj.bg, 
          '--border': activeObj.border,
          '--color': activeObj.color 
        } as React.CSSProperties}
      >
        <div className="ls-btn-content">
          <span className="ls-eyebrow">Target Level</span>
          <span className="ls-active-label">{activeObj.label}</span>
        </div>
        <span className={`ls-caret ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="ls-dropdown">
          {Object.entries(LEVEL_MAP).map(([key, obj]) => (
            <div 
              key={key}
              className={`ls-option ${level === key ? 'selected' : ''}`}
              onClick={() => handleLevelChange(key)}
              style={{ '--bg': obj.bg, '--color': obj.color } as React.CSSProperties}
            >
              {obj.label}
              {level === key && <span style={{ fontSize: '12px' }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
