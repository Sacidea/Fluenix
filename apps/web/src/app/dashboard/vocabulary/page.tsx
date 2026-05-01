'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { FlashcardWorkspace } from '@/components/vocabulary/FlashcardWorkspace'
import '@/styles/vocabulary.css'

export default function VocabularyPage() {
  return (
    <div className="vocab-lab-root">
      <header className="lab-header">
        <div className="header-content">
          <Link href="/dashboard" className="back-link">
            <ChevronLeft size={14} />
            <span>Return to Dashboard</span>
          </Link>
          <span className="eyebrow">Language Lab</span>
          <h1 className="main-title">Tech Lexicon</h1>
          <p className="sub-title">Advanced terminology tailored for FAANG communications.</p>
        </div>
      </header>

      <main className="lab-main">
        <FlashcardWorkspace />
      </main>
    </div>
  )
}
