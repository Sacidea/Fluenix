'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

type Exercise = 'pr_description' | 'commit_message' | 'email'

export default function WritingPage() {
  const [exercise, setExercise] = useState<Exercise>('pr_description')
  const [userText, setUserText] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)

  const exercises = [
    {
      id: 'pr_description',
      label: 'PR Description',
      icon: '🔀',
      desc: 'Write a pull request description',
      prompt: `You have just implemented a feature that adds user authentication using JWT tokens to a Node.js REST API. 
      The changes include: new middleware for token validation, login/register endpoints, and password hashing with bcrypt.
      Write a professional PR description for this change.`,
    },
    {
      id: 'commit_message',
      label: 'Commit Message',
      icon: '📝',
      desc: 'Write a clear commit message',
      prompt: `You fixed a bug where the user profile image was not updating correctly after upload. 
      The issue was in the image processing service — it was caching old URLs.
      Write a proper git commit message following conventional commits format.`,
    },
    {
      id: 'email',
      label: 'Technical Email',
      icon: '📧',
      desc: 'Write a professional tech email',
      prompt: `You need to inform your team that the production deployment scheduled for Friday has been postponed to Monday. 
      The reason is that the QA team found a critical bug in the payment module that needs to be fixed first.
      Write a professional email to your team.`,
    },
  ]

  const currentExercise = exercises.find(e => e.id === exercise)!

  const analyzeWriting = async () => {
    if (!userText.trim()) return
    setLoading(true)
    setFeedback(null)
    try {
      const res = await axios.post('http://localhost:8000/writing/analyze', {
        exercise,
        text: userText,
        prompt: currentExercise.prompt,
      })
      const raw = res.data.feedback
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
      setFeedback(parsed)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .wr-root {
          min-height: 100vh;
          background: #080b12;
          color: #e8eaf0;
          font-family: 'DM Sans', sans-serif;
        }

        .wr-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          background: rgba(8,11,18,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .wr-nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .wr-back {
          font-size: 13px;
          color: #4b5563;
          text-decoration: none;
          transition: color 0.2s;
        }

        .wr-back:hover { color: #e8eaf0; }

        .wr-nav-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
        }

        .wr-sep { color: #1f2937; }

        .wr-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 48px 40px;
        }

        .wr-header {
          margin-bottom: 40px;
        }

        .wr-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
        }

        .wr-sub {
          font-size: 15px;
          color: #4b5563;
        }

        .wr-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 6px;
        }

        .wr-tab {
          flex: 1;
          padding: 10px 16px;
          border-radius: 10px;
          border: none;
          background: none;
          color: #4b5563;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .wr-tab:hover { color: #e8eaf0; }

        .wr-tab.active {
          background: rgba(79,124,255,0.12);
          color: #4f7cff;
          border: 1px solid rgba(79,124,255,0.2);
        }

        .wr-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .wr-panel {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
        }

        .wr-panel-header {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wr-panel-title {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #6b7280;
          text-transform: uppercase;
        }

        .wr-prompt {
          padding: 20px;
          font-size: 14px;
          line-height: 1.7;
          color: #6b7280;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
        }

        .wr-textarea {
          width: 100%;
          min-height: 280px;
          background: none;
          border: none;
          padding: 20px;
          font-size: 14px;
          line-height: 1.7;
          color: #e8eaf0;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          resize: none;
          outline: none;
        }

        .wr-textarea::placeholder { color: #374151; }

        .wr-submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #4f7cff, #7c5cfc);
          border: none;
          border-radius: 12px;
          color: white;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 16px;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(79,124,255,0.25);
        }

        .wr-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(79,124,255,0.35);
        }

        .wr-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .wr-feedback {
          margin-top: 24px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          overflow: hidden;
          animation: fadeUp 0.3s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wr-feedback-header {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #6b7280;
          text-transform: uppercase;
        }

        .wr-feedback-body { padding: 24px; }

        .wr-scores {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .wr-score {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 16px;
          text-align: center;
        }

        .wr-score-value {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #4f7cff;
          margin-bottom: 4px;
        }

        .wr-score-label {
          font-size: 11px;
          color: #4b5563;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .wr-fb-section {
          margin-bottom: 20px;
        }

        .wr-fb-title {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #374151;
          margin-bottom: 10px;
        }

        .wr-fb-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .wr-fb-item {
          font-size: 14px;
          color: #9ca3af;
          padding: 8px 12px;
          background: rgba(255,255,255,0.03);
          border-radius: 8px;
          border-left: 2px solid;
          line-height: 1.5;
        }

        .wr-fb-item.strength { border-color: #10b981; }
        .wr-fb-item.improve { border-color: #f59e0b; }

        .wr-fb-overall {
          font-size: 14px;
          color: #9ca3af;
          line-height: 1.7;
          padding: 16px;
          background: rgba(79,124,255,0.05);
          border: 1px solid rgba(79,124,255,0.1);
          border-radius: 12px;
        }

        .wr-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 32px;
          color: #4b5563;
          font-size: 14px;
        }

        .wr-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(79,124,255,0.2);
          border-top-color: #4f7cff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="wr-root">
        <nav className="wr-nav">
          <div className="wr-nav-left">
            <Link href="/dashboard" className="wr-back">← Back</Link>
            <span className="wr-sep">|</span>
            <span className="wr-nav-title">Technical Writing</span>
          </div>
        </nav>

        <main className="wr-main">
          <div className="wr-header">
            <h1 className="wr-title">Technical Writing</h1>
            <p className="wr-sub">Practice writing PR descriptions, commit messages and professional emails</p>
          </div>

          <div className="wr-tabs">
            {exercises.map(ex => (
              <button
                key={ex.id}
                className={`wr-tab ${exercise === ex.id ? 'active' : ''}`}
                onClick={() => { setExercise(ex.id as Exercise); setFeedback(null); setUserText('') }}
              >
                {ex.icon} {ex.label}
              </button>
            ))}
          </div>

          <div className="wr-content">
            <div className="wr-panel">
              <div className="wr-panel-header">
                <span>📋</span>
                <span className="wr-panel-title">Task</span>
              </div>
              <div className="wr-prompt">{currentExercise.prompt}</div>
            </div>

            <div className="wr-panel">
              <div className="wr-panel-header">
                <span>✍️</span>
                <span className="wr-panel-title">Your Writing</span>
              </div>
              <textarea
                className="wr-textarea"
                placeholder="Write your response here..."
                value={userText}
                onChange={e => setUserText(e.target.value)}
              />
            </div>
          </div>

          <button
            className="wr-submit-btn"
            onClick={analyzeWriting}
            disabled={loading || !userText.trim()}
          >
            {loading ? 'Analyzing...' : 'Analyze My Writing →'}
          </button>

          {loading && (
            <div className="wr-loading">
              <div className="wr-spinner" />
              AI is analyzing your writing...
            </div>
          )}

          {feedback && (
            <div className="wr-feedback">
              <div className="wr-feedback-header">AI Feedback</div>
              <div className="wr-feedback-body">
                <div className="wr-scores">
                  {[
                    { label: 'Clarity', value: feedback.clarity_score },
                    { label: 'Technical', value: feedback.technical_score },
                    { label: 'Overall', value: feedback.overall_score },
                  ].map(s => (
                    <div key={s.label} className="wr-score">
                      <div className="wr-score-value">{s.value}</div>
                      <div className="wr-score-label">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="wr-fb-section">
                  <div className="wr-fb-title">✅ Strengths</div>
                  <ul className="wr-fb-list">
                    {feedback.strengths?.map((s: string, i: number) => (
                      <li key={i} className="wr-fb-item strength">{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="wr-fb-section">
                  <div className="wr-fb-title">💡 Improvements</div>
                  <ul className="wr-fb-list">
                    {feedback.improvements?.map((s: string, i: number) => (
                      <li key={i} className="wr-fb-item improve">{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="wr-fb-section">
                  <div className="wr-fb-title">📝 Overall Feedback</div>
                  <div className="wr-fb-overall">{feedback.overall_feedback}</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}