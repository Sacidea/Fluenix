import React from 'react'
import { List } from 'lucide-react'

interface Word {
  id: string
  word: string
  phonetic: string
  category: string
}

interface WordIndexSidebarProps {
  paginatedWords: Word[]
  allWords: Word[]
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  currentIndex: number
  setWordByIndex: (index: number) => void
}

export function WordIndexSidebar({
  paginatedWords,
  allWords,
  categories,
  selectedCategory,
  setSelectedCategory,
  currentPage,
  totalPages,
  setCurrentPage,
  currentIndex,
  setWordByIndex
}: WordIndexSidebarProps) {
  return (
    <aside className="word-index">
      <div className="index-header">
        <List size={14} />
        <span>TERMINOLOGY INDEX</span>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs" style={{
        display: 'flex',
        gap: '8px',
        padding: '12px 20px',
        overflowX: 'auto',
        borderBottom: '1px solid var(--color-border)',
        scrollbarWidth: 'none'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
            style={{
              padding: '6px 12px',
              borderRadius: '99px',
              border: 'none',
              background: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-bg)',
              color: selectedCategory === cat ? 'white' : 'var(--color-text-mid)',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition-fast)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="index-list">
        {paginatedWords.map((w, i) => {
          // Find the actual global index of this word to pass to setWordByIndex
          const globalIndex = allWords.findIndex(aw => aw.id === w.id)
          return (
            <button
              key={w.id}
              className={`index-item ${currentIndex === globalIndex ? 'active' : ''}`}
              onClick={() => setWordByIndex(globalIndex)}
            >
              <span className="item-num">{String(globalIndex + 1).padStart(2, '0')}</span>
              <span className="item-word">{w.word}</span>
            </button>
          )
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
          marginTop: 'auto'
        }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style={{
              padding: '6px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              background: currentPage === 1 ? 'transparent' : 'white',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--color-text-dark)'
            }}
          >
            PREV
          </button>
          
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 800,
            color: 'var(--color-text-mid)'
          }}>
            PAGE {currentPage} / {totalPages}
          </span>
          
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{
              padding: '6px 12px',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              background: currentPage === totalPages ? 'transparent' : 'white',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--color-text-dark)'
            }}
          >
            NEXT
          </button>
        </div>
      )}
    </aside>
  )
}

