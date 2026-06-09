import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ErrorWorkspace } from '@/components/error-decoding/ErrorWorkspace'
import '@/styles/error-decoding.css'

export default function ErrorDecodingPage() {
  return (
    <div className="error-lab-root">
      {/* Premium Header */}
      <header className="lab-header">
        <div className="header-content">
          <Link href="/dashboard" className="back-link">
            <ArrowLeft size={14} />
            RETURN TO DASHBOARD
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <span className="eyebrow">Decoding Lab</span>
              <h1 className="main-title">Error Decoder</h1>
            </div>
            <div className="max-w-[300px] text-right">
              <p className="sub-title">Master stack traces, debug logs, and technical documentation.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="lab-main">
        <ErrorWorkspace />
      </main>
    </div>
  )
}
