'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, CheckSquare, BookOpen } from 'lucide-react'
import { GrammarWorkspace } from '@/components/grammar-lab/GrammarWorkspace'
import { GrammarHandbook } from '@/components/grammar-lab/GrammarHandbook'
import '@/styles/grammar-lab.css'

export default function GrammarLabPage() {
  const [activeTab, setActiveTab] = useState<'linter' | 'handbook'>('handbook')

  return (
    <div className="module-page-container">
      
      {/* Global Header Area */}
      <header className="lab-header">
        <div className="header-content">
          <div className="header-left">
            <Link href="/dashboard" className="back-link">
              <ChevronLeft size={16} />
              <span>Dashboard</span>
            </Link>
            <div className="header-title-group">
              <span className="eyebrow">Structural Refinement</span>
              <h1 className="main-title">Grammar Intelligence</h1>
            </div>
          </div>
          
          {/* Tabs moved to header right to match other modules */}
          <div className="header-right">
            <div className="grammar-tabs" style={{ marginBottom: 0 }}>
              <button 
                className={`grammar-tab ${activeTab === 'linter' ? 'active' : ''}`}
                onClick={() => setActiveTab('linter')}
              >
                <CheckSquare size={16} />
                Linter Lab
              </button>
              <button 
                className={`grammar-tab ${activeTab === 'handbook' ? 'active' : ''}`}
                onClick={() => setActiveTab('handbook')}
              >
                <BookOpen size={16} />
                FAANG Handbook
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="lab-main" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {activeTab === 'linter' ? <GrammarWorkspace /> : <GrammarHandbook />}
      </main>

    </div>
  )
}
