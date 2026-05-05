'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useUser } from "@clerk/nextjs"
import { Terminal, ShieldCheck, PenTool, Activity, ChevronRight, MessageSquare, Target, CheckSquare, Mic, BookOpen, Headphones, Zap, Code, GitMerge, FileCode2 } from 'lucide-react'

export default function Home() {
  const { isLoaded, isSignedIn } = useUser()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const modulesList = [
    { title: "Scenario Simulation", icon: MessageSquare, desc: "Technical interviews, standups & code reviews with AI." },
    { title: "Technical Writing", icon: PenTool, desc: "PR descriptions, commit messages & documentation." },
    { title: "Behavioral STAR", icon: Target, desc: "Master Amazon Leadership Principles and storytelling." },
    { title: "Grammar Intelligence", icon: CheckSquare, desc: "Spot and fix common FAANG grammar mistakes." },
    { title: "Pronunciation Lab", icon: Mic, desc: "Master 500+ technical terms with native comparison." },
    { title: "Tech Lexicon", icon: BookOpen, desc: "Context-rich technical flashcards for FAANG terminology." },
    { title: "Error Decoder", icon: Terminal, desc: "Master reading stack traces and official AWS/React docs." },
    { title: "Listening Intelligence", icon: Headphones, desc: "Decode fast-paced engineering meetings and jargon." }
  ]

  if (!mounted) return null

  return (
    <div className="modern-landing-root">
      {/* ── HEADER ── */}
      <nav className="glass-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon-box"><Zap size={20} className="logo-bolt" /></div>
            <span className="logo-text">Fluenix <span className="logo-badge">LABS</span></span>
          </div>
          <div className="nav-links">
            <a href="#modules">Modules</a>
            <a href="#methodology">Methodology</a>
          </div>
          <div className="nav-auth">
            {!isLoaded ? null : !isSignedIn ? (
              <>
                <Link href="/sign-in" className="btn-ghost">Sign In</Link>
                <Link href="/sign-up" className="btn-primary">Get Access</Link>
              </>
            ) : (
              <Link href="/dashboard" className="btn-primary">
                Return to Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-badge">
              <span className="live-dot"></span>
              <span>v1.2 Operations Live</span>
            </div>
            
            <h1 className="hero-title">
              Precision in <br/>
              <span className="hero-gradient-text">Engineering English.</span>
            </h1>
            
            <p className="hero-subtitle">
              The first AI-driven communication laboratory built exclusively for software engineers targeting FAANG-level environments. Master your standups, code reviews, and behavioral interviews.
            </p>

            <div className="hero-actions">
              {!isLoaded ? null : !isSignedIn ? (
                <Link href="/sign-up" className="btn-hero-main">
                  <span>Initialize Protocol</span>
                  <ChevronRight size={18} />
                </Link>
              ) : (
                <Link href="/dashboard" className="btn-hero-main">
                  <span>Enter Command Center</span>
                  <ChevronRight size={18} />
                </Link>
              )}
              <div className="hero-trust">
                <ShieldCheck size={16} color="#10b981" />
                <span>CEFR-Calibrated Evaluation Engine</span>
              </div>
            </div>
          </motion.div>

          <div className="hero-visual">
            <motion.div style={{ y: y1 }} className="floating-card primary-card">
              <div className="mock-header">
                <Terminal size={14} color="#64748b"/>
                <span>bash — zsh — 80x24</span>
              </div>
              <div className="mock-body">
                <p><span className="c-blue">~/fluenix</span> $ analyze-standup --target=senior</p>
                <p className="c-gray">Analyzing syntax and technical phrasing...</p>
                <p className="c-yellow">⚡ Tip: Replace "delay" with "latency" for impact.</p>
                <p className="c-green">✓ Clarity: 98% (Executive Ready)</p>
                <p className="c-green">✓ Vocabulary: Advanced FAANG lexicon</p>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="floating-card secondary-card">
              <div className="mock-header">
                <GitMerge size={14} color="#64748b"/>
                <span>PR Review Analysis</span>
              </div>
              <div className="mock-body p-code">
                <p className="c-red strikethrough">I fixed the bug in the login.</p>
                <p className="c-yellow">⚠️ Action: Avoid passive phrasing in commits.</p>
                <p className="c-green">Refactored authentication middleware to resolve race condition during token refresh.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MODULES SECTION ── */}
      <section id="modules" className="modules-section">
        <div className="modules-container">
          <div className="section-header center">
            <h2 className="section-title">8 Specialized Engineering Modules</h2>
            <p className="section-desc">Stop studying general English. Start training for the situations you actually face as a software engineer.</p>
          </div>

          <div className="modules-grid">
            {modulesList.map((mod, i) => {
              const Icon = mod.icon
              return (
                <motion.div 
                  key={mod.title}
                  className="module-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="module-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{mod.title}</h3>
                  <p>{mod.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY SECTION ── */}
      <section id="methodology" className="methodology-section">
        <div className="methodology-container">
          <motion.div 
            className="methodology-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Engineered for High-Stakes Communication</h2>
            <ul className="method-list">
              <li>
                <div className="method-icon"><Activity size={20} color="#6366f1" /></div>
                <div>
                  <h4>Real-Time AI Simulation</h4>
                  <p>Practice live system design explanations and behavioral interviews with an AI trained on FAANG hiring managers.</p>
                </div>
              </li>
              <li>
                <div className="method-icon"><FileCode2 size={20} color="#10b981" /></div>
                <div>
                  <h4>Contextual Tech Grammar</h4>
                  <p>Learn grammar not through boring textbooks, but by analyzing stack traces, PRs, and system architectures.</p>
                </div>
              </li>
              <li>
                <div className="method-icon"><Target size={20} color="#f59e0b" /></div>
                <div>
                  <h4>CEFR Progressive Overload</h4>
                  <p>The system adapts from B1 to C2, increasing the complexity of jargon and forcing you to elevate your professional tone.</p>
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div 
            className="methodology-visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="tech-stack-graphic">
              <div className="circle-layer layer-1"></div>
              <div className="circle-layer layer-2"></div>
              <div className="circle-layer layer-3">
                <Zap size={40} className="core-icon" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="modern-footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="logo-icon-box small"><Zap size={14} color="white" /></div>
            <span className="footer-logo">Fluenix <span className="logo-badge">LABS</span></span>
          </div>
          <div className="footer-right">
            <span>© 2026 Fluenix. Engineering Communication.</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* ── GLOBAL RESET & VARIABLES ── */
        .modern-landing-root {
          min-height: 100vh;
          background-color: #f8fafc;
          color: #0f172a;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }

        /* ── NAVIGATION ── */
        .glass-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 72px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          z-index: 100;
          display: flex;
          align-items: center;
        }

        .nav-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon-box {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
        }
        
        .logo-icon-box.small { width: 24px; height: 24px; border-radius: 6px; }

        .logo-bolt { color: white; fill: white; }

        .logo-text {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #0f172a;
        }

        .logo-badge {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-links a {
          color: #64748b;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: #0f172a; }

        .nav-auth { display: flex; align-items: center; gap: 16px; }

        .btn-ghost {
          color: #475569;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s;
        }
        .btn-ghost:hover { color: #2563eb; }

        .btn-primary {
          background: #0f172a;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
        }

        /* ── HERO SECTION ── */
        .hero-section {
          position: relative;
          padding: 160px 24px 100px;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-bg-glow {
          position: absolute;
          top: -20%; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 800px;
          background: radial-gradient(circle, rgba(79,70,229,0.08) 0%, rgba(248,250,252,0) 70%);
          z-index: 0;
          pointer-events: none;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #e2e8f0;
          padding: 6px 14px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          margin-bottom: 32px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .live-dot {
          width: 6px; height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(16,185,129,0.4);
        }

        .hero-title {
          font-size: 72px;
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -3px;
          margin-bottom: 24px;
          color: #0f172a;
        }

        .hero-gradient-text {
          background: linear-gradient(135deg, #2563eb, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 18px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .btn-hero-main {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
          color: white;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          width: fit-content;
          transition: all 0.3s;
          box-shadow: 0 15px 35px -5px rgba(59, 130, 246, 0.3);
        }

        .btn-hero-main:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px -5px rgba(59, 130, 246, 0.4);
        }

        .hero-trust {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
        }

        .hero-visual {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 16px;
          padding: 24px;
          width: 400px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
          position: absolute;
        }

        .primary-card { right: 0; top: 10%; z-index: 2; }
        .secondary-card { left: 0; bottom: 10%; z-index: 1; opacity: 0.9; transform: scale(0.9); }

        .mock-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #64748b;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding-bottom: 12px;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .mock-body {
          font-family: var(--font-mono);
          font-size: 13px;
          line-height: 1.8;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mock-body.p-code p { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; }

        .c-blue { color: #2563eb; }
        .c-gray { color: #475569; }
        .c-green { color: #059669; }
        .c-red { color: #dc2626; }
        .c-yellow { color: #f59e0b; font-weight: 700; }
        .strikethrough { text-decoration: line-through; opacity: 0.7; }


        /* ── MODULES SECTION ── */
        .modules-section {
          padding: 120px 24px;
          background: #ffffff;
          position: relative;
        }

        .modules-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,0,0,0.05), transparent);
        }

        .modules-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header { margin-bottom: 60px; }
        .section-header.center { text-align: center; }

        .section-title {
          font-size: 40px;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 16px;
          color: #0f172a;
        }

        .section-desc {
          font-size: 16px;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .module-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 32px 24px;
          transition: all 0.3s;
        }

        .module-card:hover {
          background: #ffffff;
          border-color: #cbd5e1;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -5px rgba(0,0,0,0.05);
        }

        .module-icon {
          width: 48px; height: 48px;
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }

        .module-card h3 {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 12px;
          color: #0f172a;
        }

        .module-card p {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
        }

        /* ── METHODOLOGY SECTION ── */
        .methodology-section {
          padding: 120px 24px;
          background: #f8fafc;
        }

        .methodology-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .method-list {
          list-style: none;
          padding: 0;
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .method-list li {
          display: flex;
          gap: 20px;
        }

        .method-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: white;
          border: 1px solid #e2e8f0;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .method-list h4 {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .method-list p {
          font-size: 15px;
          color: #475569;
          line-height: 1.6;
        }

        .tech-stack-graphic {
          position: relative;
          width: 100%;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .circle-layer {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.05);
          display: flex; align-items: center; justify-content: center;
        }

        .layer-1 { width: 400px; height: 400px; animation: pulse 4s infinite alternate; }
        .layer-2 { width: 250px; height: 250px; border-color: rgba(37, 99, 235, 0.2); animation: pulse 3s infinite alternate-reverse; }
        .layer-3 { width: 100px; height: 100px; background: linear-gradient(135deg, #4f46e5, #3b82f6); box-shadow: 0 0 40px rgba(59,130,246,0.3); }
        .core-icon { color: white; fill: white; }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.05); opacity: 1; }
        }

        /* ── FOOTER ── */
        .modern-footer {
          border-top: 1px solid rgba(0,0,0,0.05);
          padding: 40px 24px;
          background: #ffffff;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo {
          font-size: 16px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #0f172a;
        }

        .footer-right {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .hero-container, .methodology-container { grid-template-columns: 1fr; text-align: center; }
          .hero-content { display: flex; flex-direction: column; align-items: center; }
          .hero-title { font-size: 56px; }
          .hero-visual, .nav-links { display: none; }
          .modules-grid { grid-template-columns: repeat(2, 1fr); }
          .method-list li { flex-direction: column; align-items: center; text-align: center; }
        }

        @media (max-width: 640px) {
          .modules-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 40px; }
        }
      `}</style>
    </div>
  )
}

