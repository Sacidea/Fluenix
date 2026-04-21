'use client'

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'

type Word = {
  id: string
  word: string
  category: string
  phonetic: string
}

type Result = {
  accuracy_score: number
  is_correct: boolean
  feedback: string
  tip: string
}

export default function PronunciationPage() {
  const { user } = useUser()
  const [words, setWords] = useState<Word[]>([])
  const [userLevel, setUserLevel] = useState('B2')
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [supported, setSupported] = useState(true)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // 1. Fetch Words from DB
    axios.get('http://localhost:3001/api/pronunciation/words')
      .then(res => setWords(res.data))
      .catch(err => console.error('Failed to fetch words', err))
      
    // 2. Fetch User target level
    if (user) {
      axios.get(`http://localhost:3001/api/users/${user.id}`)
        .then(res => setUserLevel(res.data?.level || 'B2'))
        .catch(err => console.error('Failed relative user fetch', err))
    }

    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setSupported(false)
      }
    }
  }, [user])

  const currentWord = words[currentIndex] || null

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)

    recognition.onresult = async (event: any) => {
      const heard = event.results[0][0].transcript
      setTranscript(heard)
      setListening(false)
      await analyzeResult(heard)
    }

    recognition.onerror = () => {
      setListening(false)
      setTranscript('Could not hear. Try again.')
    }

    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const analyzeResult = async (heard: string) => {
    setLoading(true)
    setResult(null)
    try {
      const res = await axios.post('http://localhost:8000/pronunciation/analyze', {
        transcript: heard,
        target_word: currentWord.word,
        level: userLevel
      })
      const raw = res.data.result
      const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed: Result = JSON.parse(clean)
      setResult(parsed)
      setAttempted(a => a + 1)
      if (parsed.is_correct) setScore(s => s + 1)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const nextWord = () => {
    setCurrentIndex(i => (i + 1) % words.length)
    setTranscript('')
    setResult(null)
  }

  const prevWord = () => {
    setCurrentIndex(i => (i - 1 + words.length) % words.length)
    setTranscript('')
    setResult(null)
  }

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pn-root {
          min-height: 100vh;
          background: #f8faff;
          color: #102D47;
          font-family: 'DM Sans', sans-serif;
        }

        .pn-main {
          max-width: 800px;
          margin: 0 auto;
          padding: 48px 40px;
        }

        .pn-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #f59e0b;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pn-title {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
          color: #102D47;
          line-height: 1.2;
        }

        .pn-sub {
          font-size: 15px;
          color: #547593;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .pn-progress-bar {
          width: 100%;
          height: 6px;
          background: #e8edf5;
          border-radius: 99px;
          margin-bottom: 40px;
          overflow: hidden;
        }

        .pn-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b, #f97316);
          border-radius: 99px;
          transition: width 0.4s ease;
        }

        .pn-score-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .pn-score-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #ecfdf5;
          border: 1.5px solid #a7f3d0;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #065f46;
        }

        .pn-counter {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
        }

        .pn-card {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          margin-bottom: 24px;
          border-top: 4px solid #f59e0b;
        }

        .pn-category {
          display: inline-block;
          padding: 4px 12px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #92400e;
          margin-bottom: 20px;
        }

        .pn-word {
          font-size: 56px;
          font-weight: 700;
          color: #102D47;
          letter-spacing: -1px;
          margin-bottom: 12px;
          line-height: 1;
        }

        .pn-phonetic {
          font-family: 'JetBrains Mono', monospace;
          font-size: 18px;
          color: #f59e0b;
          margin-bottom: 32px;
          font-weight: 500;
        }

        .pn-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .pn-listen-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #fffbeb;
          border: 1.5px solid #fde68a;
          border-radius: 12px;
          color: #92400e;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pn-listen-btn:hover {
          background: #fef3c7;
          transform: translateY(-1px);
        }

        .pn-mic-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          border: none;
          border-radius: 14px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(245,158,11,0.3);
        }

        .pn-mic-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,158,11,0.4);
        }

        .pn-mic-btn.listening {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 4px 16px rgba(239,68,68,0.4);
          animation: micPulse 1s infinite;
        }

        @keyframes micPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        .pn-nav-btns {
          display: flex;
          gap: 10px;
        }

        .pn-nav-btn {
          width: 44px; height: 44px;
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 12px;
          color: #547593;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pn-nav-btn:hover {
          border-color: #f59e0b;
          color: #f59e0b;
        }

        .pn-transcript {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 14px;
          padding: 16px 20px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .pn-transcript-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .pn-transcript-text {
          font-size: 14px;
          color: #102D47;
          font-weight: 500;
          font-style: italic;
        }

        .pn-result {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          animation: fadeUp 0.3s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pn-result-header {
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f1f5f9;
        }

        .pn-result-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 20px;
        }

        .pn-result-score {
          font-size: 28px;
          font-weight: 700;
        }

        .pn-result-body { padding: 20px 24px; }

        .pn-result-feedback {
          font-size: 14px;
          color: #102D47;
          line-height: 1.6;
          margin-bottom: 12px;
          padding: 12px 16px;
          background: #f8faff;
          border-radius: 10px;
          border-left: 3px solid #6366f1;
        }

        .pn-result-tip {
          font-size: 13px;
          color: #547593;
          line-height: 1.6;
          padding: 12px 16px;
          background: #fffbeb;
          border-radius: 10px;
          border-left: 3px solid #f59e0b;
        }

        .pn-next-btn {
          width: 100%;
          margin-top: 16px;
          padding: 14px;
          background: linear-gradient(135deg, #6366f1, #0ea5e9);
          border: none;
          border-radius: 14px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(99,102,241,0.3);
        }

        .pn-next-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }

        .pn-unsupported {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .pn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          color: #547593;
          font-size: 14px;
        }

        .pn-spinner {
          width: 18px; height: 18px;
          border: 2px solid #e8edf5;
          border-top-color: #f59e0b;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="pn-root">
        <main className="pn-main">
          <p className="pn-eyebrow">Practice</p>
          <h1 className="pn-title">Pronunciation Lab</h1>
          <p className="pn-sub">Master technical terms with AI-powered feedback</p>

          <div className="pn-progress-bar">
            <div
              className="pn-progress-fill"
              style={{ width: `${words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0}%` }}
            />
          </div>

          <div className="pn-score-bar">
            <div className="pn-score-badge">
              ✅ {score} / {attempted} correct
            </div>
            <div className="pn-counter">
              {words.length > 0 ? `${currentIndex + 1} / ${words.length} words` : 'Loading...'}
            </div>
          </div>

          {!supported ? (
            <div className="pn-unsupported">
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎙️</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: '#102D47' }}>
                Microphone not supported
              </h3>
              <p style={{ color: '#547593', fontSize: 14 }}>
                Please use Chrome or Edge browser for speech recognition.
              </p>
            </div>
          ) : !currentWord ? (
            <div className="pn-loading">
              <div className="pn-spinner" />
              Loading words from Database...
            </div>
          ) : (
            <>
              <div className="pn-card" data-aos="fade-up">
                <span className="pn-category">{currentWord.category}</span>
                <div className="pn-word">{currentWord.word}</div>
                <div className="pn-phonetic">/{currentWord.phonetic}/</div>

                <div className="pn-actions">
                  <div className="pn-nav-btns">
                    <button className="pn-nav-btn" onClick={prevWord}>←</button>
                    <button className="pn-nav-btn" onClick={nextWord}>→</button>
                  </div>

                  <button className="pn-listen-btn" onClick={speakWord}>
                    🔊 Listen
                  </button>

                  <button
                    className={`pn-mic-btn ${listening ? 'listening' : ''}`}
                    onClick={listening ? stopListening : startListening}
                  >
                    {listening ? '⏹ Stop' : '🎙️ Speak'}
                  </button>
                </div>
              </div>

              {transcript && (
                <div className="pn-transcript" data-aos="fade-up">
                  <span className="pn-transcript-label">You said:</span>
                  <span className="pn-transcript-text">"{transcript}"</span>
                </div>
              )}

              {loading && (
                <div className="pn-loading">
                  <div className="pn-spinner" />
                  Analyzing pronunciation...
                </div>
              )}

              {result && (
                <div className="pn-result" data-aos="fade-up">
                  <div className="pn-result-header">
                    <div
                      className="pn-result-badge"
                      style={{
                        background: result.is_correct ? '#ecfdf5' : '#fef2f2',
                        color: result.is_correct ? '#065f46' : '#991b1b',
                      }}
                    >
                      {result.is_correct ? '✅ Correct!' : '❌ Try again'}
                    </div>
                    <div
                      className="pn-result-score"
                      style={{ color: result.accuracy_score >= 80 ? '#10b981' : result.accuracy_score >= 60 ? '#f59e0b' : '#ef4444' }}
                    >
                      {result.accuracy_score}
                    </div>
                  </div>
                  <div className="pn-result-body">
                    <div className="pn-result-feedback">{result.feedback}</div>
                    <div className="pn-result-tip">💡 {result.tip}</div>
                  </div>
                </div>
              )}

              {result && (
                <button className="pn-next-btn" onClick={nextWord} data-aos="fade-up">
                  Next Word →
                </button>
              )}
            </>
          )}
        </main>
      </div>
    </>
  )
}