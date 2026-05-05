'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Code2, Server, Cloud, Database, MonitorPlay, Brain, Briefcase, Zap, ArrowRight, CheckCircle2, Target, MessageSquare, GitMerge, FileText } from 'lucide-react'

type Role = 'Frontend' | 'Backend' | 'DevOps' | 'Data Science' | 'Fullstack' | 'Other'
type Level = 'B1' | 'B2' | 'C1'
type Goal = 'Interviews' | 'Daily Communication' | 'Code Reviews' | 'Documentation'

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const [step, setStep] = useState(1)
  
  const [role, setRole] = useState<Role | null>(null)
  const [level, setLevel] = useState<Level | null>(null)
  const [goal, setGoal] = useState<Goal | null>(null)

  const roles: { label: Role, icon: any, desc: string }[] = [
    { label: 'Frontend', icon: MonitorPlay, desc: 'React, Vue, UI/UX' },
    { label: 'Backend', icon: Server, desc: 'Node, Python, Java' },
    { label: 'DevOps', icon: Cloud, desc: 'AWS, CI/CD, Docker' },
    { label: 'Data Science', icon: Database, desc: 'AI, ML, Analytics' },
    { label: 'Fullstack', icon: Code2, desc: 'End-to-end development' },
    { label: 'Other', icon: Briefcase, desc: 'Product, QA, Management' },
  ]

  const levels: { label: Level, title: string, desc: string }[] = [
    { label: 'B1', title: 'Intermediate', desc: 'I can communicate but struggle with complex technical discussions.' },
    { label: 'B2', title: 'Upper Intermediate', desc: 'I can handle most meetings but lack native-like fluency and polish.' },
    { label: 'C1', title: 'Advanced', desc: 'I am fluent but want to master executive presence and subtle idioms.' },
  ]

  const goals: { label: Goal, icon: any }[] = [
    { label: 'Interviews', icon: Target },
    { label: 'Daily Communication', icon: MessageSquare },
    { label: 'Code Reviews', icon: GitMerge },
    { label: 'Documentation', icon: FileText },
  ]

  const handleComplete = async () => {
    // In a real app, you would save this to Clerk publicMetadata via your API
    // await fetch('/api/user/onboarding', { method: 'POST', body: JSON.stringify({ role, level, goal }) })
    
    // For now, redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="onboarding-root">
      <div className="onboarding-container">
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: \`\${(step / 3) * 100}%\` }} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="step-content"
            >
              <div className="step-header">
                <h2>Welcome to Fluenix, {user?.firstName || 'Engineer'}.</h2>
                <p>What is your primary technical domain?</p>
              </div>

              <div className="grid-options">
                {roles.map(r => {
                  const Icon = r.icon
                  return (
                    <button
                      key={r.label}
                      className={\`option-card \${role === r.label ? 'selected' : ''}\`}
                      onClick={() => setRole(r.label)}
                    >
                      <div className="option-icon"><Icon size={24} /></div>
                      <div className="option-text">
                        <h3>{r.label}</h3>
                        <p>{r.desc}</p>
                      </div>
                      {role === r.label && <div className="check-icon"><CheckCircle2 size={20} /></div>}
                    </button>
                  )
                })}
              </div>

              <div className="step-actions">
                <button 
                  className="btn-next" 
                  disabled={!role} 
                  onClick={() => setStep(2)}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="step-content"
            >
              <div className="step-header">
                <h2>Calibrating AI Difficulty.</h2>
                <p>What is your current English proficiency level?</p>
              </div>

              <div className="list-options">
                {levels.map(l => (
                  <button
                    key={l.label}
                    className={\`list-card \${level === l.label ? 'selected' : ''}\`}
                    onClick={() => setLevel(l.label)}
                  >
                    <div className="level-badge">{l.label}</div>
                    <div className="list-text">
                      <h3>{l.title}</h3>
                      <p>{l.desc}</p>
                    </div>
                    {level === l.label && <div className="check-icon"><CheckCircle2 size={20} /></div>}
                  </button>
                ))}
              </div>

              <div className="step-actions split">
                <button className="btn-back" onClick={() => setStep(1)}>Back</button>
                <button 
                  className="btn-next" 
                  disabled={!level} 
                  onClick={() => setStep(3)}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="step-content"
            >
              <div className="step-header">
                <h2>Finalizing your curriculum.</h2>
                <p>What is your primary goal on Fluenix?</p>
              </div>

              <div className="grid-options two-col">
                {goals.map(g => {
                  const Icon = g.icon
                  return (
                    <button
                      key={g.label}
                      className={\`option-card \${goal === g.label ? 'selected' : ''}\`}
                      onClick={() => setGoal(g.label)}
                    >
                      <div className="option-icon"><Icon size={24} /></div>
                      <div className="option-text">
                        <h3>{g.label}</h3>
                      </div>
                      {goal === g.label && <div className="check-icon"><CheckCircle2 size={20} /></div>}
                    </button>
                  )
                })}
              </div>

              <div className="step-actions split">
                <button className="btn-back" onClick={() => setStep(2)}>Back</button>
                <button 
                  className="btn-next complete" 
                  disabled={!goal} 
                  onClick={handleComplete}
                >
                  Go to Dashboard <Zap size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .onboarding-root {
          min-height: 100vh;
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'Inter', sans-serif;
        }

        .onboarding-container {
          width: 100%;
          max-width: 600px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          padding: 48px;
          position: relative;
          overflow: hidden;
        }

        .progress-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #f1f5f9;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(to right, #3b82f6, #6366f1);
          transition: width 0.4s ease;
        }

        .step-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .step-header h2 {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .step-header p {
          font-size: 16px;
          color: #64748b;
        }

        .grid-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 40px;
        }

        .grid-options.two-col {
          grid-template-columns: 1fr 1fr;
        }

        .list-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 40px;
        }

        .option-card, .list-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          position: relative;
          outline: none;
        }

        .option-card:hover, .list-card:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }

        .option-card.selected, .list-card.selected {
          border-color: #3b82f6;
          background: #eff6ff;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.1);
        }

        .option-icon {
          color: #64748b;
          background: #f1f5f9;
          padding: 10px;
          border-radius: 10px;
        }

        .option-card.selected .option-icon {
          color: #3b82f6;
          background: #dbeafe;
        }

        .level-badge {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 800;
          color: #64748b;
          background: #f1f5f9;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
        }

        .list-card.selected .level-badge {
          background: #3b82f6;
          color: white;
        }

        .option-text h3, .list-text h3 {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .option-text p, .list-text p {
          font-size: 13px;
          color: #64748b;
          line-height: 1.4;
        }

        .check-icon {
          position: absolute;
          top: 20px; right: 20px;
          color: #3b82f6;
        }

        .step-actions {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
        }

        .step-actions.split {
          justify-content: space-between;
        }

        .btn-back {
          background: transparent;
          border: none;
          color: #64748b;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-back:hover {
          color: #0f172a;
        }

        .btn-next {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0f172a;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-next:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-next:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.2);
        }

        .btn-next.complete {
          background: #3b82f6;
        }

        @media (max-width: 640px) {
          .onboarding-container { padding: 32px 20px; }
          .grid-options { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
