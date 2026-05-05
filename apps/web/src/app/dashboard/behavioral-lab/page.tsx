'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Target, BookOpen } from 'lucide-react'
import { BehavioralWorkspace } from '@/components/behavioral/BehavioralWorkspace'
import { BehavioralHandbook } from '@/components/behavioral/BehavioralHandbook'

export default function BehavioralLabPage() {
  const [activeTab, setActiveTab] = useState<'handbook' | 'simulator'>('handbook')

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
              <span className="eyebrow">Leadership Prep</span>
              <h1 className="main-title">Behavioral STAR Simulator</h1>
            </div>
          </div>
          
          <div className="header-right">
            <div className="grammar-tabs" style={{ marginBottom: 0 }}>
              <button 
                className={`grammar-tab ${activeTab === 'handbook' ? 'active' : ''}`}
                onClick={() => setActiveTab('handbook')}
              >
                <BookOpen size={16} />
                Methodology
              </button>
              <button 
                className={`grammar-tab ${activeTab === 'simulator' ? 'active' : ''}`}
                onClick={() => setActiveTab('simulator')}
              >
                <Target size={16} />
                Practice Simulator
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="lab-main" style={{ padding: '40px', width: '100%' }}>
        {activeTab === 'handbook' ? <BehavioralHandbook /> : <BehavioralWorkspace />}
      </main>

    </div>
  )
}
