import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ListeningWorkspace } from '@/components/listening-lab/ListeningWorkspace'
import '@/styles/listening-lab.css'

export default function ListeningLabPage() {
  return (
    <div className="listening-lab-root">
      {/* Premium Header */}
      <header className="lab-header border-cyan-100">
        <div className="header-content">
          <Link href="/dashboard" className="back-link">
            <ArrowLeft size={14} />
            RETURN TO DASHBOARD
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <span className="eyebrow text-cyan-600 bg-cyan-100">Audio Lab</span>
              <h1 className="main-title">Listening Intelligence</h1>
            </div>
            <div className="max-w-[300px] text-right">
              <p className="sub-title">Decode fast-paced engineering meetings, idioms, and technical jargon.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="lab-main items-center">
        <ListeningWorkspace />
      </main>
    </div>
  )
}
