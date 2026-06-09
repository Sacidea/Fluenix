'use client'

import React, { useState, useEffect } from 'react'
import { apiClient } from '@/lib/apiClient'
import { useAuth } from '@clerk/nextjs'
import { BookOpen, CheckCircle2, XCircle, AlertCircle, Loader2, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import '@/styles/handbook.css'

type GrammarRule = {
  id: string
  category: string
  title: string
  explanation: string
  correctExample: string
  wrongExample: string
  lessonContent?: string | null
  level: string
}

export function GrammarHandbook() {
  const [groupedRules, setGroupedRules] = useState<Record<string, GrammarRule[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [activeRuleId, setActiveRuleId] = useState<string | null>(null)
  const [showLesson, setShowLesson] = useState(false)
  const { getToken } = useAuth()

  // Reset showLesson when rule changes
  useEffect(() => {
    setShowLesson(false)
  }, [activeRuleId])

  useEffect(() => {
    const loadRules = async () => {
      const token = await getToken()
      if (!token) return
      setIsLoading(true)
      apiClient.get('/api/handbook/rules', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (res.data.success) {
          const rules = res.data.data
          setGroupedRules(rules)
          // Set first rule as active
          const firstCategory = Object.keys(rules)[0]
          if (firstCategory && rules[firstCategory].length > 0) {
            setActiveRuleId(rules[firstCategory][0].id)
          }
        }
      })
      .catch(err => console.error("Failed to load grammar rules", err))
      .finally(() => setIsLoading(false))
    }
    loadRules()
  }, [getToken])

  if (isLoading) {
    return (
      <div className="handbook-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin text-blue-500" size={48} style={{ marginBottom: '16px', color: '#3b82f6' }} />
        <h2 style={{ color: '#0f172a' }}>Loading Handbook...</h2>
      </div>
    )
  }

  // Find active rule
  let activeRule: GrammarRule | null = null
  for (const category in groupedRules) {
    const found = groupedRules[category].find(r => r.id === activeRuleId)
    if (found) {
      activeRule = found
      break
    }
  }

  return (
    <div className="handbook-container">
      {/* Sidebar Navigation */}
      <div className="handbook-sidebar">
        <div className="handbook-sidebar-header">
          <BookOpen size={20} color="#3b82f6" />
          Rule Index
        </div>
        <div className="handbook-sidebar-nav">
          {Object.keys(groupedRules).map(category => (
            <div key={category} className="category-group">
              <div className="category-title">{category}</div>
              {groupedRules[category].map(rule => (
                <button
                  key={rule.id}
                  className={`rule-link ${activeRuleId === rule.id ? 'active' : ''}`}
                  onClick={() => setActiveRuleId(rule.id)}
                >
                  {rule.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="handbook-content">
        {activeRule ? (
          <div className="handbook-content-inner">
            <div className="rule-category-badge">{activeRule.category}</div>
            <h2 className="rule-header-title">{activeRule.title}</h2>
            
            <div className="rule-explanation">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 700, color: '#1e40af' }}>
                <AlertCircle size={20} /> The Rule
              </div>
              {activeRule.explanation}
            </div>

            <div className="rule-examples">
              <div className="example-block">
                <div className="example-header wrong">
                  <XCircle size={18} /> Incorrect
                </div>
                <div className="example-body wrong-text">
                  - {activeRule.wrongExample}
                </div>
              </div>

              <div className="example-block">
                <div className="example-header correct">
                  <CheckCircle2 size={18} /> Correct
                </div>
                <div className="example-body correct-text">
                  + {activeRule.correctExample}
                </div>
              </div>
            </div>

            {activeRule.lessonContent && (
              <div className="lesson-section" style={{ marginTop: '32px' }}>
                <button 
                  onClick={() => setShowLesson(!showLesson)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer',
                    width: '100%',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={20} color="#3b82f6" />
                    {showLesson ? 'Dersi Kapat' : 'Sıfırdan Öğren (Read Full Lesson)'}
                  </div>
                  <ChevronRight 
                    size={20} 
                    style={{ 
                      transform: showLesson ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }} 
                  />
                </button>

                {showLesson && (
                  <div className="lesson-content-markdown" style={{
                    marginTop: '16px',
                    padding: '24px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    lineHeight: '1.7',
                    color: '#334155',
                    fontSize: '15px'
                  }}>
                    <ReactMarkdown>{activeRule.lessonContent}</ReactMarkdown>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div style={{ color: '#64748b' }}>Select a rule from the menu to read the details.</div>
        )}
      </div>
    </div>
  )
}
