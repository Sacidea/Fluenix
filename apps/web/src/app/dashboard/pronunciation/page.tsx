'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { usePronunciationSession } from '@/hooks/usePronunciationSession'
import { WordIndexSidebar } from '@/components/pronunciation/WordIndexSidebar'
import { AnalysisWorkspace } from '@/components/pronunciation/AnalysisWorkspace'

export default function PronunciationPage() {
  const {
    words,
    filteredWords,
    paginatedWords,
    categories,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    totalPages,
    currentIndex,
    currentWord,
    listening,
    transcript,
    result,
    loading,
    supported,
    startListening,
    stopListening,
    speakWord,
    nextWord,
    setWordByIndex
  } = usePronunciationSession()

  return (
    <div className="ledger-dash">
      <main className="dash-container">
        
        {/* CORPORATE GREETING SECTION */}
        <section className="welcome-area">
          <Link href="/dashboard" className="back-link">
            <ChevronLeft size={14} />
            <span>Return to Dashboard</span>
          </Link>
          <div className="title-block">
            <div className="eyebrow-group">
              <div className="line" />
              <span className="eyebrow">Acoustic Analysis Lab</span>
            </div>
            
            <h1 className="welcome-text">
              Phonetic Reporting —<br />
              <span className="serif-grad">Voice pattern recognition active.</span>
            </h1>
          </div>
        </section>

        <div className="lab-workspace">
          
          <WordIndexSidebar 
            paginatedWords={paginatedWords}
            allWords={words}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentIndex={currentIndex} 
            setWordByIndex={setWordByIndex} 
          />

          <AnalysisWorkspace 
            supported={supported}
            currentWord={currentWord}
            listening={listening}
            transcript={transcript}
            result={result}
            loading={loading}
            startListening={startListening}
            stopListening={stopListening}
            speakWord={speakWord}
            nextWord={nextWord}
          />
          
        </div>
      </main>
    </div>
  )
}