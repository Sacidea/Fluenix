'use client'

import React, { useState } from 'react'
import { GrammarWorkspace } from '@/components/grammar-lab/GrammarWorkspace'
import { GrammarHandbook } from '@/components/grammar-lab/GrammarHandbook'
import { CheckSquare, BookOpen } from 'lucide-react'
import '@/styles/grammar-lab.css'

export default function GrammarLabPage() {
  const [activeTab, setActiveTab] = useState<'linter' | 'handbook'>('handbook')

  return (
    <div className="module-page-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="module-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
          Grammar Intelligence
        </h1>
        <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '600px' }}>
          Spot and fix common FAANG grammar mistakes, or consult the Handbook for technical English rules.
        </p>
      </div>

      {/* Tabs */}
      <div className="grammar-tabs">
        <button 
          className={`grammar-tab ${activeTab === 'linter' ? 'active' : ''}`}
          onClick={() => setActiveTab('linter')}
        >
          <CheckSquare size={18} />
          Linter Lab
        </button>
        <button 
          className={`grammar-tab ${activeTab === 'handbook' ? 'active' : ''}`}
          onClick={() => setActiveTab('handbook')}
        >
          <BookOpen size={18} />
          FAANG Handbook
        </button>
      </div>

      {/* Content */}
      {activeTab === 'linter' ? <GrammarWorkspace /> : <GrammarHandbook />}

    </div>
  )
}
