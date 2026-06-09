'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { GrammarWorkspace } from '@/components/grammar-lab/GrammarWorkspace'
import { GrammarHandbook } from '@/components/grammar-lab/GrammarHandbook'
import '@/styles/grammar-lab.css'

export function GrammarClient() {
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
            <div className="grammar-tabs mb-0">
              <button 
                className={`grammar-tab ${activeTab === 'linter' ? 'active' : ''}`}
                onClick={() => setActiveTab('linter')}
              >
                <DynamicIcon name="CheckSquare" size={16} />
                Linter Lab
              </button>
              <button 
                className={`grammar-tab ${activeTab === 'handbook' ? 'active' : ''}`}
                onClick={() => setActiveTab('handbook')}
              >
                <DynamicIcon name="BookOpen" size={16} />
                FAANG Handbook
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="lab-main w-full max-w-[1200px] mx-auto p-4 md:p-10">
        {activeTab === 'linter' ? <GrammarWorkspace /> : <GrammarHandbook />}
      </main>

    </div>
  )
}
