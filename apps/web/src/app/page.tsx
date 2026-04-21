'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useUser } from "@clerk/nextjs"
import { Terminal, ShieldCheck, PenTool, Activity, ChevronRight } from 'lucide-react'

export default function Home() {
  const { isLoaded, isSignedIn } = useUser()

  return (
    <div className="ledger-landing-root">
      {/* HEADER / NAV */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="logo-group">
            <div className="logo-box">
              <Terminal size={20} />
            </div>
            <span className="logo-text">Fluenix <span className="tag">LABS</span></span>
          </div>
          
          <div className="nav-actions">
            {!isLoaded ? null : !isSignedIn ? (
              <>
                <Link href="/sign-in" className="nav-btn-link">Sign In</Link>
                <Link href="/sign-up" className="nav-btn-primary">Register Account</Link>
              </>
            ) : (
              <Link href="/dashboard" className="nav-btn-primary">
                Return to Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="hero-section">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <div className="eyebrow-group">
              <div className="line" />
              <span className="eyebrow">Professional Proficiency Steering</span>
            </div>
            <h1 className="hero-title">
              Precision in <br/>
              <span className="serif-title">Technical Communication.</span>
            </h1>
            <p className="hero-desc">
              A high-stakes simulation environment for engineers to master 
              technical English through AI-driven lab exercises and rigorous 
              interview transcripts. 
            </p>

            <div className="hero-cta">
              {!isLoaded ? null : !isSignedIn ? (
                <Link href="/sign-up" className="cta-main">
                  <span>Initialize Training Session</span>
                  <ChevronRight size={18} />
                </Link>
              ) : (
                <Link href="/dashboard" className="cta-main">
                  <span>Enter Command Center</span>
                  <ChevronRight size={18} />
                </Link>
              )}
              <div className="cta-meta">
                <ShieldCheck size={14} color="#059669" />
                <span>Verified CEFR-Based Evaluation Engine</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="technical-dossier">
              <div className="dossier-header">
                <div className="dossier-line" />
                <span>OPERATIONAL SPEC_v4.2</span>
              </div>
              <div className="dossier-body">
                <div className="d-item">
                  <Activity size={16} />
                  <span>Acoustic Waveform Analysis</span>
                </div>
                <div className="d-item">
                  <PenTool size={16} />
                  <span>Technical Writing Ledger</span>
                </div>
                <div className="d-item">
                  <Terminal size={16} />
                  <span>Interview Simulation Logs</span>
                </div>
              </div>
              <div className="dossier-footer">
                <div className="barcode" />
                <span>FLX-ENG-ID-7721</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="landing-footer">
        <p>© 2026 Fluenix Technical Engagements. All rights reserved.</p>
        <div className="footer-links">
          <span>Operational Security</span>
          <span>Terms of Service</span>
        </div>
      </footer>

      <style jsx>{`
        .ledger-landing-root {
          min-height: 100vh;
          background-color: #f8fafc;
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
        }
        .landing-nav { padding: 32px 60px; }
        .nav-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .logo-group { display: flex; align-items: center; gap: 12px; }
        .logo-box { width: 36px; height: 36px; background: #0f172a; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .logo-text { font-size: 20px; font-weight: 900; color: #0f172a; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px; }
        .tag { font-size: 9px; font-weight: 800; background: #f1f5f9; color: #64748b; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0; }
        .nav-actions { display: flex; align-items: center; gap: 20px; }
        .nav-btn-link { text-decoration: none; font-weight: 700; color: #64748b; cursor: pointer; font-size: 14px; }
        .nav-btn-primary { background: #0f172a; color: white; padding: 10px 20px; border-radius: 10px; font-weight: 800; font-size: 14px; text-decoration: none; cursor: pointer; transition: all 0.3s; }
        .nav-btn-primary:hover { background: #334155; transform: translateY(-2px); }
        .hero-section { flex: 1; display: flex; align-items: center; padding: 60px; }
        .hero-content { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 80px; align-items: center; }
        .eyebrow-group { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .line { width: 40px; height: 1px; background: #4338ca; }
        .eyebrow { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px; color: #94a3b8; }
        .hero-title { font-size: 64px; font-weight: 900; color: #0f172a; line-height: 1.1; letter-spacing: -2.5px; margin-bottom: 32px; }
        .serif-title { font-family: 'Georgia', serif; font-style: italic; color: #4338ca; font-weight: 400; }
        .hero-desc { font-size: 18px; color: #64748b; line-height: 1.8; max-width: 580px; margin-bottom: 48px; }
        .cta-main { display: flex; align-items: center; gap: 12px; padding: 18px 32px; background: #4338ca; color: white; border-radius: 16px; font-weight: 800; font-size: 16px; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 25px -5px rgba(67, 56, 202, 0.4); text-decoration: none; }
        .cta-main:hover { transform: translateY(-4px); background: #3730a3; box-shadow: 0 20px 35px -5px rgba(67, 56, 202, 0.5); }
        .cta-meta { display: flex; align-items: center; gap: 8px; margin-top: 20px; font-size: 12px; font-weight: 700; color: #94a3b8; }
        .technical-dossier { background: white; border: 1px solid #e2e8f0; border-radius: 24px; padding: 40px; box-shadow: 30px 30px 100px rgba(0,0,0,0.05); position: relative; }
        .dossier-header { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; font-size: 10px; font-weight: 800; color: #cbd5e1; letter-spacing: 1px; }
        .dossier-line { flex: 1; height: 1px; background: #f1f5f9; }
        .dossier-body { display: flex; flex-direction: column; gap: 24px; }
        .d-item { display: flex; align-items: center; gap: 16px; color: #475569; font-weight: 700; font-size: 14px; padding: 16px; border: 1px solid #f1f5f9; border-radius: 12px; }
        .dossier-footer { margin-top: 40px; display: flex; justify-content: space-between; align-items: center; font-size: 9px; font-weight: 800; color: #cbd5e1; }
        .barcode { width: 100px; height: 2px; background: #e2e8f0; position: relative; }
        .barcode::after { content: ''; position: absolute; top:0; left: 20px; width: 40px; height: 100%; background: #4338ca; }
        .landing-footer { padding: 40px 60px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 700; color: #94a3b8; }
        .footer-links { display: flex; gap: 40px; }
        @media (max-width: 1024px) { .hero-content { grid-template-columns: 1fr; text-align: center; } .hero-text { display: flex; flex-direction: column; align-items: center; } .eyebrow-group { justify-content: center; } .hero-title { font-size: 48px; } .hero-visual { display: none; } }
      `}</style>
    </div>
  )
}
