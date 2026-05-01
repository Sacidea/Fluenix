'use client'

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { DialogueLine } from '@/data/listening-scenarios'
import { useLevel } from '@/context/LevelContext'
import { Play, Square, Eye, EyeOff, CheckCircle2, XCircle, Mic, Keyboard, ListChecks, Loader2 } from 'lucide-react'

// --- Types & Globals ---
type PracticeMode = 'quiz' | 'dictation' | 'shadowing'

// Type declaration for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

// --- Helpers ---
function renderLineWithIdioms(line: DialogueLine) {
  if (!line.idiomHighlight) return line.text

  const { word, meaning } = line.idiomHighlight
  const parts = line.text.split(new RegExp("(" + word + ")", 'gi'))

  return parts.map((part, i) => {
    if (part.toLowerCase() === word.toLowerCase()) {
      return (
        <span key={i} className="idiom-highlight">
          {part}
          <span className="tooltip">{meaning}</span>
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

// --- Component ---
export function ListeningWorkspace() {
  const { level } = useLevel()
  const [scenarios, setScenarios] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  
  // Practice Modes
  const [activeMode, setActiveMode] = useState<PracticeMode>('quiz')

  // Mode 1: Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  // Mode 2: Dictation state
  const [dictationAnswers, setDictationAnswers] = useState<string[]>([])
  const [dictationChecked, setDictationChecked] = useState(false)

  // Mode 3: Shadowing state
  const [isRecording, setIsRecording] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [shadowScore, setShadowScore] = useState<number | null>(null)

  const synthRef = useRef<SpeechSynthesis | null>(null)
  const recognitionRef = useRef<any>(null)

  // Fetch scenarios when level changes
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/listening?level=${level}`)
      .then(res => {
        if (res.data.success) {
          setScenarios(res.data.data)
          // Reset UI state for new level
          setCurrentIndex(0)
          setCurrentQuestionIdx(0)
          setSelectedOptionId(null)
          setIsAnswered(false)
          setShowTranscript(false)
          setActiveMode('quiz')
          if (synthRef.current) synthRef.current.cancel()
          setIsPlaying(false)
        }
      })
      .catch(err => console.error("Failed to load scenarios", err))
      .finally(() => setIsLoading(false))
  }, [level])

  // Initialize Speech APIs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis

      // Initialize Speech Recognition for Shadowing mode
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setSpokenText(transcript)
          calculateShadowScore(transcript)
          setIsRecording(false)
        }

        recognitionRef.current.onerror = () => {
          setIsRecording(false)
        }
        
        recognitionRef.current.onend = () => {
          setIsRecording(false)
        }
      }
    }
    return () => {
      if (synthRef.current) synthRef.current.cancel()
      if (recognitionRef.current && isRecording) recognitionRef.current.stop()
    }
  }, [currentIndex, isRecording])

  const scenario = scenarios[currentIndex]

  // Initialize dictation answers array when scenario changes
  useEffect(() => {
    if (scenario && scenario.dictation) {
      setDictationAnswers(new Array(scenario.dictation.answers.length).fill(''))
      setDictationChecked(false)
    }
    setShadowScore(null)
    setSpokenText('')
  }, [currentIndex, scenario])

  if (isLoading) {
    return (
      <div className="listening-workspace" style={{ alignItems: 'center', justifyContent: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <Loader2 className="animate-spin text-cyan-500" size={48} style={{ marginBottom: '16px', color: '#06b6d4' }} />
        <h2 style={{ color: '#0f172a' }}>Loading Scenarios...</h2>
      </div>
    )
  }

  // --- End of Session UI ---
  if (currentIndex >= scenarios.length && scenarios.length > 0) {
    return (
      <div className="listening-workspace" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'white', padding: '60px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px' }}>Session Complete!</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>You have completed all listening scenarios.</p>
        <button 
          className="l-btn-next" 
          style={{ width: 'auto', padding: '12px 30px' }}
          onClick={() => {
            setCurrentIndex(0)
            setCurrentQuestionIdx(0)
            setSelectedOptionId(null)
            setIsAnswered(false)
            setShowTranscript(false)
          }}
        >
          Restart Session
        </button>
      </div>
    )
  }

  // --- Audio Player Logic ---
  const handlePlayPause = () => {
    if (!synthRef.current) return

    if (isPlaying) {
      synthRef.current.cancel()
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    let utteranceIndex = 0
    
    const playNext = () => {
      if (utteranceIndex >= scenario.dialogue.length) {
        setIsPlaying(false)
        return
      }

      const line = scenario.dialogue[utteranceIndex]
      const utterance = new SpeechSynthesisUtterance(line.text)
      
      const voices = synthRef.current?.getVoices() || []
      const englishVoices = voices.filter(v => v.lang.startsWith('en'))
      
      if (englishVoices.length > 0) {
        const voiceIdx = line.speaker.length % englishVoices.length
        utterance.voice = englishVoices[voiceIdx]
      }

      utterance.rate = 1.1
      utterance.onend = () => {
        utteranceIndex++
        playNext()
      }

      synthRef.current?.speak(utterance)
    }

    playNext()
  }

  // --- Mode: Quiz Logic ---
  const currentQuestion = scenario.questions[currentQuestionIdx]
  const handleOptionClick = (id: string) => {
    if (isAnswered) return
    setSelectedOptionId(id)
    setIsAnswered(true)
  }

  // --- Mode: Dictation Logic ---
  const handleDictationChange = (idx: number, value: string) => {
    const newAnswers = [...dictationAnswers]
    newAnswers[idx] = value
    setDictationAnswers(newAnswers)
    setDictationChecked(false)
  }

  const checkDictation = () => {
    setDictationChecked(true)
  }

  const renderDictationLine = () => {
    if (!scenario.dictation) return null
    
    // Split by "____" and inject inputs
    const parts = scenario.dictation.textWithBlanks.split('____')
    return (
      <div className="dictation-line">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <input 
                type="text" 
                className={"dictation-input " + (dictationChecked ? (dictationAnswers[i].toLowerCase().trim() === scenario.dictation.answers[i].toLowerCase() ? 'correct' : 'incorrect') : '')}
                value={dictationAnswers[i] || ''}
                onChange={(e) => handleDictationChange(i, e.target.value)}
                placeholder="type here"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  // --- Mode: Shadowing Logic ---
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser. Please use Chrome.")
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      if (synthRef.current) synthRef.current.cancel() // Stop playing if recording
      setIsPlaying(false)
      setSpokenText('')
      setShadowScore(null)
      recognitionRef.current.start()
      setIsRecording(true)
    }
  }

  const calculateShadowScore = (spoken: string) => {
    if (!scenario.shadowing) return
    const targetWords = scenario.shadowing.targetText.toLowerCase().replace(/[.,?!]/g, '').split(' ')
    const spokenWords = spoken.toLowerCase().replace(/[.,?!]/g, '').split(' ')
    
    let matchCount = 0
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) matchCount++
    })
    
    const accuracy = Math.round((matchCount / targetWords.length) * 100)
    setShadowScore(Math.min(100, accuracy))
  }

  // --- Next Scenario Logic ---
  const handleNextScenario = () => {
    if (synthRef.current) synthRef.current.cancel()
    setIsPlaying(false)
    setCurrentIndex(p => p + 1)
    setCurrentQuestionIdx(0)
    setSelectedOptionId(null)
    setIsAnswered(false)
    setShowTranscript(false)
    setActiveMode('quiz')
  }

  // Fallback check
  if (!scenario) return null

  return (
    <div className="listening-workspace">
      
      {/* Audio Player Card */}
      <div className="audio-player-card">
        <h2 className="scenario-title">{scenario.title}</h2>
        <p className="scenario-context">{scenario.context}</p>

        <button className="play-btn" onClick={handlePlayPause}>
          {isPlaying ? <Square size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" style={{ marginLeft: '6px' }} />}
        </button>

        <div className="waveform">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
            <div key={i} className={"wave-bar " + (isPlaying ? 'playing' : '')} />
          ))}
        </div>

        <button 
          className="toggle-transcript-btn"
          onClick={() => setShowTranscript(!showTranscript)}
        >
          {showTranscript ? <><EyeOff size={14} /> Hide Transcript</> : <><Eye size={14} /> Show Transcript</>}
        </button>

        {showTranscript && (
          <div className="transcript-panel">
            {scenario.dialogue.map((line, idx) => (
              <div key={idx} className="dialogue-line">
                <span className="speaker-name">{line.speaker}</span>
                <span className="speaker-text">{renderLineWithIdioms(line)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Practice Area */}
      <div className="listening-quiz">
        
        {/* Mode Tabs */}
        <div className="practice-modes-nav">
          <button className={"mode-tab " + (activeMode === 'quiz' ? 'active' : '')} onClick={() => setActiveMode('quiz')}>
            <ListChecks size={16} /> Comprehension
          </button>
          <button className={"mode-tab " + (activeMode === 'dictation' ? 'active' : '')} onClick={() => setActiveMode('dictation')}>
            <Keyboard size={16} /> Dictation
          </button>
          <button className={"mode-tab " + (activeMode === 'shadowing' ? 'active' : '')} onClick={() => setActiveMode('shadowing')}>
            <Mic size={16} /> Shadowing
          </button>
        </div>

        {/* --- QUIZ MODE --- */}
        {activeMode === 'quiz' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 className="l-question-text" style={{ margin: 0 }}>{currentQuestion.text}</h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: '#06b6d4' }}>
                Q {currentQuestionIdx + 1} / {scenario.questions.length}
              </span>
            </div>
            
            <div className="options-list">
              {currentQuestion.options.map(opt => {
                const isSelected = selectedOptionId === opt.id
                let btnClass = 'l-option-btn'
                
                if (isAnswered) {
                  if (opt.isCorrect) btnClass += ' correct'
                  else if (isSelected) btnClass += ' incorrect'
                } else if (isSelected) {
                  btnClass += ' selected'
                }

                return (
                  <button
                    key={opt.id}
                    className={btnClass}
                    onClick={() => handleOptionClick(opt.id)}
                    disabled={isAnswered}
                  >
                    {opt.text}
                  </button>
                )
              })}
            </div>

            {isAnswered && selectedOption && (
              <div className={"l-feedback " + (selectedOption.isCorrect ? 'correct' : 'incorrect')}>
                <div className="feedback-header" style={{ fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: selectedOption.isCorrect ? '#059669' : '#dc2626' }}>
                  {selectedOption.isCorrect ? <><CheckCircle2 size={20} /> Correct!</> : <><XCircle size={20} /> Incorrect</>}
                </div>
                <p className="feedback-explanation" style={{ fontSize: '14px', lineHeight: 1.6, color: '#475569', margin: 0 }}>
                  {selectedOption.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* --- DICTATION MODE --- */}
        {activeMode === 'dictation' && scenario.dictation && (
          <div className="dictation-container">
            <h3 className="l-question-text" style={{ marginBottom: '8px' }}>Listen to the audio and fill in the missing words.</h3>
            
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              {renderDictationLine()}
            </div>

            <button className="check-answers-btn" onClick={checkDictation}>
              Check Spelling
            </button>
          </div>
        )}

        {/* --- SHADOWING MODE --- */}
        {activeMode === 'shadowing' && scenario.shadowing && (
          <div className="shadowing-container">
            <h3 className="l-question-text" style={{ marginBottom: '0' }}>Listen and Repeat</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: 0 }}>Read the exact sentence below into the microphone.</p>

            <div className="target-text-box">
              <p className="target-text">"{scenario.shadowing.targetText}"</p>
            </div>

            <button 
              className={"mic-btn " + (isRecording ? 'recording' : '')} 
              onClick={toggleRecording}
            >
              {isRecording ? <Square size={24} /> : <Mic size={24} />}
            </button>

            {shadowScore !== null && (
              <div className="spoken-feedback">
                <div className="score">{shadowScore}% Accuracy</div>
                <div style={{ fontSize: '14px' }}>
                  <strong>You said:</strong> "{spokenText}"
                </div>
              </div>
            )}
          </div>
        )}

        <button 
          className="l-btn-next" 
          onClick={handleNextScenario}
          style={{ marginTop: '32px' }}
        >
          {currentIndex === scenarios.length - 1 ? 'Finish Session' : 'Next Scenario'}
        </button>

      </div>

    </div>
  )
}
