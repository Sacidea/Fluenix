import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ListeningWorkspace } from '@/components/listening-lab/ListeningWorkspace'
import '@/styles/listening-lab.css'

export default function ListeningLabPage() {
  return (
    <div className="listening-lab-root">
      {/* Premium Header */}
      <header className="lab-header" style={{ borderBottomColor: '#cffafe' }}>
        <div className="header-content">
          <Link href="/dashboard" className="back-link">
            <ArrowLeft size={14} />
            RETURN TO DASHBOARD
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="eyebrow" style={{ color: '#0891b2', backgroundColor: '#cffafe' }}>Audio Lab</span>
              <h1 className="main-title">Listening Intelligence</h1>
            </div>
            <div style={{ maxWidth: '300px', textAlign: 'right' }}>
              <p className="sub-title">Decode fast-paced engineering meetings, idioms, and technical jargon.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="lab-main" style={{ alignItems: 'center' }}>
        <ListeningWorkspace />
      </main>
    </div>
  )
}
