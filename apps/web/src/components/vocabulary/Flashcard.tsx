import React from 'react'
import { VocabWord } from '@/data/vocabulary'
import { Volume2 } from 'lucide-react'

interface FlashcardProps {
  word: VocabWord
  isFlipped: boolean
  setIsFlipped: (flipped: boolean) => void
}

export function Flashcard({ word, isFlipped, setIsFlipped }: FlashcardProps) {
  const playAudio = (e: React.MouseEvent) => {
    e.stopPropagation()
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Cancel any ongoing speech
      
      // Kelimenin başına virgül eklemek, tarayıcının TTS motorunun (özellikle Chrome/Edge) 
      // ilk heceyi yutmasını (cut-off) engeller.
      const utterance = new SpeechSynthesisUtterance(", " + word.word)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      
      const voices = window.speechSynthesis.getVoices().filter(v => !v.name.toLowerCase().includes('us english'))
      const preferredVoice = voices.find(v => v.name.includes('Google US English')) ||
                             voices.find(v => v.lang === 'en-US' && v.name.includes('Female')) ||
                             voices.find(v => v.lang.startsWith('en-US')) ||
                             voices[0]
                             
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>

        {/* ── FRONT ── */}
        <div className="flashcard-front">
          <div className="card-hint">Click to reveal definition</div>
          <h2 className="word-front">{word.word}</h2>
          <span className={`difficulty-badge ${word.difficulty}`}>
            {word.difficulty}
          </span>
        </div>

        {/* ── BACK ── */}
        <div className="flashcard-back">
          <div className="back-word-row">
            <h2 className="word-back">{word.word}</h2>
            <button className="audio-btn" onClick={playAudio} title="Pronounce">
              <Volume2 size={18} />
            </button>
          </div>

          <div className="phonetic">{word.phonetic}</div>

          <div className="tr-pill">
            <span className="tr-badge">TR</span>
            <span className="tr-text">{word.turkishMeaning}</span>
          </div>

          <div className="type-badge">{word.type}</div>

          <p className="definition">{word.definition}</p>

          <div className="context-box">
            <div className="context-label">Engineering Context</div>
            <p className="context-sentence">"{word.contextSentence}"</p>
          </div>
        </div>

      </div>
    </div>
  )
}
