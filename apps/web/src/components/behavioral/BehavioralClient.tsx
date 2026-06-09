'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { BehavioralWorkspace } from '@/components/behavioral/BehavioralWorkspace'
import { BehavioralHandbook } from '@/components/behavioral/BehavioralHandbook'
import { BehavioralReading } from '@/components/behavioral/BehavioralReading'
import '@/styles/behavioral.css'

export function BehavioralClient() {
  const [activeTab, setActiveTab] = useState<'handbook' | 'reading' | 'simulator'>('reading')

  return (
    <div className="module-page-container">

      {/* Global Header Area */}
      <header className="lab-header">
        <div className="header-content">
          <div className="header-left">
            <Link href="/dashboard" className="back-link">
              <ChevronLeft size={14} />
              <span>RETURN TO DASHBOARD</span>
            </Link>
            <div className="header-title-group">
              <span className="eyebrow">LEADERSHIP PREP</span>
              <h1 className="main-title">Behavioral STAR Simulator</h1>
              <p className="sub-title">Advanced interview methodologies tailored for FAANG communications.</p>
            </div>
          </div>

          <div className="header-right">
            <div className="grammar-tabs mb-0">
              <button
                className={"grammar-tab " + (activeTab === 'reading' ? 'active' : '')}
                onClick={() => setActiveTab('reading')}
              >
                <DynamicIcon name="BookText" size={16} />
                Reading Practice
              </button>
              <button
                className={"grammar-tab " + (activeTab === 'handbook' ? 'active' : '')}
                onClick={() => setActiveTab('handbook')}
              >
                <DynamicIcon name="BookOpen" size={16} />
                Methodology
              </button>
              <button
                className={"grammar-tab " + (activeTab === 'simulator' ? 'active' : '')}
                onClick={() => setActiveTab('simulator')}
              >
                <DynamicIcon name="Target" size={16} />
                Practice Simulator
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="lab-main w-full p-4 md:p-10">
        {activeTab === 'handbook' && <BehavioralHandbook />}
        {activeTab === 'reading' && <BehavioralReading />}
        {activeTab === 'simulator' && <BehavioralWorkspace />}
      </main>

    </div>
  )
}
