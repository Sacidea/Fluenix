'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useListeningSession } from '@/hooks/useListeningSession'
import { Play, Square, Eye, EyeOff, CheckCircle2, XCircle, Mic, Keyboard, ListChecks, Loader2 } from 'lucide-react'

// --- Types & Globals ---
type PracticeMode = 'quiz' | 'dictation' | 'shadowing'

// We rely on the global.d.ts definitions instead of redefining window here

// --- Helpers ---
function renderLineWithIdioms(line: { text: string, idiomHighlight?: { word: string, meaning: string } }) {
  if (!line.idiomHighlight || !line.idiomHighlight.word) return line.text

  const { word, meaning } = line.idiomHighlight
  const parts = line.text.split(new RegExp("(" + word + ")", 'gi'))

  return parts.map((part: string, i: number) => {
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
  const { activeScenario: scenario, isLoadingScenario, loadNextScenario, error } = useListeningSession()

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
  }, [isRecording])

  // Reset state when scenario changes
  useEffect(() => {
    if (synthRef.current) synthRef.current.cancel()
    setIsPlaying(false)
    setCurrentQuestionIdx(0)
    setSelectedOptionId(null)
    setIsAnswered(false)
    setShowTranscript(false)
    setActiveMode('quiz')
    
    if (scenario && scenario.dictation && scenario.dictation.answers) {
      setDictationAnswers(new Array(scenario.dictation.answers.length).fill(''))
      setDictationChecked(false)
    }
    setShadowScore(null)
    setSpokenText('')
  }, [scenario])

  if (isLoadingScenario || !scenario) {
    return (
      <div className="listening-workspace" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', minHeight: '400px' }}>
        <Loader2 className="animate-spin text-cyan-500" size={48} style={{ marginBottom: '16px', color: '#06b6d4', margin: '0 auto 16px auto' }} />
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '10px', color: '#0f172a' }}>Generating Audio Scenario...</h2>
        <p style={{ color: '#64748b' }}>Our AI is preparing a new FAANG-style listening comprehension task for you.</p>
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

    // Split into female and male pools based on name keywords
    const voices = synthRef.current?.getVoices() || []
    const englishVoices = voices.filter(v => v.lang.startsWith('en'))
    
    const femaleKeywords = ['female', 'woman', 'girl', 'zira', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'ava', 'susan', 'hazel', 'fiona', 'aria', 'jenny', 'amy', 'olivia', 'emma']
    const maleKeywords = ['male', 'man', 'boy', 'david', 'mark', 'james', 'daniel', 'george', 'alex', 'fred', 'christopher', 'guy', 'aaron', 'brian', 'andrew', 'ryan', 'steffan']
    
    const femalePool = englishVoices.filter(v => femaleKeywords.some(k => v.name.toLowerCase().includes(k)))
    const malePool = englishVoices.filter(v => maleKeywords.some(k => v.name.toLowerCase().includes(k)))
    
    // Fallback to all english voices if pools are empty
    const fPool = femalePool.length > 0 ? femalePool : englishVoices
    const mPool = malePool.length > 0 ? malePool : englishVoices

    const uniqueSpeakers = Array.from(new Set(scenario.dialogue.map((l: any) => l.speaker)))
    const speakerVoiceMap = new Map<string, SpeechSynthesisVoice | null>()

    uniqueSpeakers.forEach((speaker: unknown) => {
      const speakerStr = String(speaker)
      // find the gender from the scenario dialogue
      const dialogueLine = scenario.dialogue.find((l: any) => l.speaker === speakerStr)
      const gender = dialogueLine?.gender || 'male'
      
      const targetPool = gender === 'female' ? fPool : mPool
      const poolToUse = targetPool.length > 0 ? targetPool : voices
      
      const voiceIdx = (speakerStr.length || 0) % (poolToUse.length || 1)
      speakerVoiceMap.set(speakerStr, poolToUse[voiceIdx] || null)
    })
    
    const playNext = () => {
      if (utteranceIndex >= scenario.dialogue.length) {
        setIsPlaying(false)
        return
      }

      const line = scenario.dialogue[utteranceIndex]
      const utterance = new SpeechSynthesisUtterance(line.text)
      
      const voice = speakerVoiceMap.get(line.speaker)
      if (voice) {
        utterance.voice = voice
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
  const currentQuestion = scenario.questions ? scenario.questions[currentQuestionIdx] : null
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
        {parts.map((part: string, i: number) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <input 
                type="text" 
                className={"dictation-input " + (dictationChecked ? (dictationAnswers[i]?.toLowerCase().trim() === scenario.dictation.answers[i]?.toLowerCase() ? 'correct' : 'incorrect') : '')}
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
    targetWords.forEach((word: string) => {
      if (spokenWords.includes(word)) matchCount++
    })
    
    const accuracy = Math.round((matchCount / targetWords.length) * 100)
    setShadowScore(Math.min(100, accuracy))
  }

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
            {scenario.dialogue.map((line: { text: string, speaker: string, idiomHighlight?: { word: string, meaning: string } }, idx: number) => (
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
        {activeMode === 'quiz' && currentQuestion && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h3 className="l-question-text" style={{ margin: 0 }}>{currentQuestion.text}</h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: '#06b6d4' }}>
                Q {currentQuestionIdx + 1} / {scenario.questions.length}
              </span>
            </div>
            
            <div className="options-list">
              {currentQuestion.options.map((opt: { id: string, text: string, isCorrect: boolean, explanation: string }) => {
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

            {(() => {
              const selectedOption = currentQuestion.options.find((o: { id: string }) => o.id === selectedOptionId)
              return isAnswered && selectedOption && (
                <div className={"l-feedback " + (selectedOption.isCorrect ? 'correct' : 'incorrect')}>
                  <div className="feedback-header" style={{ fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: selectedOption.isCorrect ? '#059669' : '#dc2626' }}>
                    {selectedOption.isCorrect ? <><CheckCircle2 size={20} /> Correct!</> : <><XCircle size={20} /> Incorrect</>}
                  </div>
                  <p className="feedback-explanation" style={{ fontSize: '14px', lineHeight: 1.6, color: '#475569', margin: 0 }}>
                    {selectedOption.explanation}
                  </p>
                </div>
              )
            })()}

            {isAnswered && (
              <button 
                className="l-btn-next" 
                onClick={() => {
                  if (currentQuestionIdx < scenario.questions.length - 1) {
                    setCurrentQuestionIdx(p => p + 1)
                    setSelectedOptionId(null)
                    setIsAnswered(false)
                  } else {
                    loadNextScenario()
                  }
                }}
                style={{ marginTop: '24px', display: 'flex', background: currentQuestionIdx < scenario.questions.length - 1 ? '#3b82f6' : '#0891b2' }}
              >
                {currentQuestionIdx < scenario.questions.length - 1 ? 'Next Question' : 'Start Next AI Scenario'}
              </button>
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
          onClick={loadNextScenario}
          style={{ marginTop: '32px', background: '#0891b2' }}
        >
          Next AI Scenario
        </button>

      </div>

    </div>
  )
}
