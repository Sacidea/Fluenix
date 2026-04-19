'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'

type Exercise = 'pr_description' | 'commit_message' | 'email'

export default function WritingPage() {
  const { user } = useUser()
  const [exercise, setExercise] = useState<Exercise>('pr_description')
  const [userText, setUserText] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const exercises = [
    {
      id: 'pr_description',
      label: 'PR Description',
      icon: '🔀',
      desc: 'Write a pull request description',
      color: '#6366f1',
      bg: '#eef2ff',
      border: '#c7d2fe',
      prompt: `You have just implemented a feature that adds user authentication using JWT tokens to a Node.js REST API. The changes include: new middleware for token validation, login/register endpoints, and password hashing with bcrypt. Write a professional PR description for this change.`,
    },
    {
      id: 'commit_message',
      label: 'Commit Message',
      icon: '📝',
      desc: 'Write a clear commit message',
      color: '#0ea5e9',
      bg: '#e0f2fe',
      border: '#bae6fd',
      prompt: `You fixed a bug where the user profile image was not updating correctly after upload. The issue was in the image processing service — it was caching old URLs. Write a proper git commit message following conventional commits format.`,
    },
    {
      id: 'email',
      label: 'Technical Email',
      icon: '📧',
      desc: 'Write a professional tech email',
      color: '#10b981',
      bg: '#ecfdf5',
      border: '#a7f3d0',
      prompt: `You need to inform your team that the production deployment scheduled for Friday has been postponed to Monday. The reason is that the QA team found a critical bug in the payment module. Write a professional email to your team.`,
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
      const clean = raw
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      const parsed = typeof clean === 'string' ? JSON.parse(clean) : clean
      setFeedback(parsed)

      if (user) {
        await axios.post('http://localhost:3001/api/sessions', {
          userId: user.id,
          type: 'writing',
          scenario: exercise,
          duration: 0,
          score: parsed.overall_score ?? null,
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .wr-root {
          min-height: 100vh;
          background: #f8faff;
          color: #102D47;
          font-family: 'DM Sans', sans-serif;
        }

        .wr-nav {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 40px;
          height: 68px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #e8edf5;
          box-shadow: 0 1px 12px rgba(0,0,0,0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .wr-back {
          font-size: 13px;
          font-weight: 500;
          color: #547593;
          text-decoration: none;
          transition: color 0.2s;
        }

        .wr-back:hover { color: #102D47; }

        .wr-nav-sep { color: #cbd5e1; }

        .wr-nav-title {
          font-size: 15px;
          font-weight: 600;
          color: #102D47;
        }

        .wr-main {
          max-width: 960px;
          margin: 0 auto;
          padding: 48px 40px;
        }

        .wr-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #0ea5e9;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .wr-title {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
          color: #102D47;
          line-height: 1.2;
        }

        .wr-sub {
          font-size: 15px;
          color: #547593;
          margin-bottom: 36px;
          line-height: 1.6;
        }

        .wr-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 28px;
        }

        .wr-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 12px;
          border: 1.5px solid #e8edf5;
          background: white;
          color: #547593;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }

        .wr-tab:hover {
          border-color: #6366f1;
          color: #6366f1;
        }

        .wr-tab.active {
          border-color: var(--tab-color);
          background: var(--tab-bg);
          color: var(--tab-color);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .wr-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .wr-panel {
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .wr-panel-header {
          padding: 14px 20px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8faff;
        }

        .wr-panel-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .wr-prompt {
          padding: 20px;
          font-size: 13px;
          line-height: 1.7;
          color: #547593;
          font-family: 'JetBrains Mono', monospace;
        }

        .wr-textarea {
          width: 100%;
          min-height: 200px;
          background: none;
          border: none;
          padding: 20px;
          font-size: 14px;
          line-height: 1.7;
          color: #102D47;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          resize: none;
          outline: none;
        }

        .wr-textarea::placeholder { color: #94a3b8; }

        .wr-submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #2eb3f1, #7173f1);
          border: none;
          border-radius: 14px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 16px rgba(14,165,233,0.3);
        }

        .wr-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(14,165,233,0.4);
        }

        .wr-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .wr-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 32px;
          color: #547593;
          font-size: 14px;
        }

        .wr-spinner {
          width: 20px; height: 20px;
          border: 2.5px solid #e8edf5;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .wr-feedback {
          margin-top: 24px;
          background: white;
          border: 1.5px solid #e8edf5;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          animation: fadeUp 0.3s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wr-feedback-header {
          padding: 16px 24px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #94a3b8;
          text-transform: uppercase;
          background: #f8faff;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wr-feedback-body { padding: 24px; }

        .wr-scores {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .wr-score {
          background: #f8faff;
          border: 1.5px solid #e8edf5;
          border-radius: 14px;
          padding: 16px;
          text-align: center;
        }

        .wr-score-value {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .wr-score-label {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 600;
        }

        .wr-fb-section { margin-bottom: 20px; }

        .wr-fb-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #94a3b8;
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
          color: #102D47;
          padding: 10px 14px;
          border-radius: 10px;
          border-left: 3px solid;
          line-height: 1.5;
        }

        .wr-fb-item.strength {
          background: #f0fdf4;
          border-color: #10b981;
          color: #065f46;
        }

        .wr-fb-item.improve {
          background: #fffbeb;
          border-color: #f59e0b;
          color: #78350f;
        }

        .wr-fb-overall {
          font-size: 14px;
          color: #102D47;
          line-height: 1.7;
          padding: 16px;
          background: #eef2ff;
          border: 1.5px solid #c7d2fe;
          border-radius: 12px;
        }
      `}</style>

      <div className="wr-root">
        <nav className="wr-nav">
          <Link href="/dashboard" className="wr-back">← Back</Link>
          <span className="wr-nav-sep">|</span>
          <span className="wr-nav-title">Technical Writing</span>
        </nav>

        <main className="wr-main">
          <p className="wr-eyebrow">Practice</p>
          <h1 className="wr-title">Technical Writing</h1>
          <p className="wr-sub">Practice PR descriptions, commit messages and professional emails</p>

          <div className="wr-tabs">
            {exercises.map(ex => (
              <button
                key={ex.id}
                className={`wr-tab ${exercise === ex.id ? 'active' : ''}`}
                style={{
                  '--tab-color': ex.color,
                  '--tab-bg': ex.bg,
                } as React.CSSProperties}
                onClick={() => { setExercise(ex.id as Exercise); setFeedback(null); setUserText('') }}
              >
                {ex.icon} {ex.label}
              </button>
            ))}
          </div>

          <div className="wr-content" data-aos="fade-up">
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
            data-aos="fade-up"
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
              <div className="wr-feedback-header">
                ✨ AI Feedback
              </div>
              <div className="wr-feedback-body">
                <div className="wr-scores">
                  {[
                    { label: 'Clarity', value: feedback.clarity_score, color: '#6366f1' },
                    { label: 'Technical', value: feedback.technical_score, color: '#0ea5e9' },
                    { label: 'Overall', value: feedback.overall_score, color: '#10b981' },
                  ].map(s => (
                    <div key={s.label} className="wr-score" style={{ borderTopColor: s.color, borderTopWidth: '3px' }}>
                      <div className="wr-score-value" style={{ color: s.color }}>{s.value}</div>
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