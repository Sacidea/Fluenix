'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Terminal, PenTool, ChevronRight, MessageSquare, Target, CheckSquare, Mic, BookOpen, Headphones, Check, Menu, X, Database, Brain, LineChart, Files, Search, GitBranch, Settings, Sparkles } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { FaqSection } from '@/components/landing/FaqSection'

const features = [
  { title: "Scenario Simulation Engine", icon: MessageSquare, desc: "Experience hyper-realistic technical interviews and system design loops driven by our fine-tuned AI." },
  { title: "Technical Writing Infrastructure", icon: PenTool, desc: "Generate and refine PR descriptions, RFCs, and architecture docs that meet FAANG readability standards." },
  { title: "Behavioral Matrix (STAR)", icon: Target, desc: "Map your career achievements to Amazon Leadership Principles with data-driven storytelling." },
  { title: "Pronunciation Lab v2", icon: Mic, desc: "Calibrate your accent with native comparisons for over 1000+ complex architectural terms." },
  { title: "Enterprise Lexicon", icon: BookOpen, desc: "A context-aware dictionary designed strictly for distributed systems and cloud terminology." },
  { title: "Error Decoder Intelligence", icon: Terminal, desc: "Train your brain to quickly parse massive stack traces and undocummented AWS errors." },
]

const testimonials = [
  { quote: "Fluenix completely changed how I approach system design interviews. The AI's pushback on my caching strategies was exactly what I faced in my Meta loop.", author: "Alex R.", role: "Senior Engineer", initial: "A" },
  { quote: "I used to struggle with writing RFCs that executives could understand. The Technical Writing module taught me how to communicate impact over implementation.", author: "Sarah C.", role: "Staff Engineer", initial: "S" },
  { quote: "The behavioral STAR matrix is a game changer. It forces you to quantify your impact, which helped me land an L6 offer at Amazon.", author: "David M.", role: "Engineering Manager", initial: "D" }
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export function LandingClient({ userId }: { userId: string | null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="layout-root">
      {/* ── BACKGROUND ── */}
      <div className="dark-grid-bg"></div>
      <div className="glow-orb orb-purple"></div>
      <div className="glow-orb orb-cyan"></div>
      <div className="glow-orb orb-center"></div>
      
      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand-logo">
            <Logo size={24} color="#ffffff" />
            <span className="brand-name">Fluenix</span>
          </Link>
          <nav className="header-nav">
            <a href="#engine">Engine</a>
            <a href="#architecture">Architecture</a>
            <a href="#features">Infrastructure</a>
            <a href="#testimonials">Success</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="header-auth">
            {!userId ? (
              <>
                <Link href="/sign-in" className="btn-glass">Log in</Link>
                <Link href="/sign-up" className="btn-primary">Get Access</Link>
              </>
            ) : (
              <Link href="/dashboard" className="btn-primary">Dashboard</Link>
            )}
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ── MOBILE NAV OVERLAY ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-nav-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          >
            <button className="mobile-menu-btn" style={{ alignSelf: 'flex-end', marginBottom: '20px' }} onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <Link href="#engine" onClick={() => setIsMobileMenuOpen(false)}>Engine</Link>
            <Link href="#architecture" onClick={() => setIsMobileMenuOpen(false)}>Architecture</Link>
            <Link href="#features" onClick={() => setIsMobileMenuOpen(false)}>Infrastructure</Link>
            <Link href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Success Stories</Link>
            <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {!userId ? (
                <>
                  <Link href="/sign-in" className="btn-glass" style={{ textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                  <Link href="/sign-up" className="btn-primary" style={{ textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Get Access</Link>
                </>
              ) : (
                <Link href="/dashboard" className="btn-primary" style={{ textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ── HERO SECTION ── */}
        <motion.section 
          className="hero"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="hero-pill" variants={fadeInUp}>
            <span className="dot"></span> Fluenix Engine v2.0 Live
          </motion.div>
          <motion.h1 className="hero-title" variants={fadeInUp}>
            Engineering communication,<br/>
            <span className="text-gradient">redefined.</span>
          </motion.h1>
          <motion.p className="hero-desc" variants={fadeInUp}>
            The AI-native communication infrastructure designed exclusively for high-performance software engineers. Master complex system design loops, bulletproof code reviews, and executive-level behavioral storytelling.
          </motion.p>
          <motion.div className="hero-cta-group" variants={fadeInUp} style={{ marginTop: '20px' }}>
            <Link href={userId ? "/dashboard" : "/sign-up"} className="btn-marker-link">
              Launch Application <ChevronRight size={24} />
            </Link>
          </motion.div>

          {/* ── MASSIVE GLOWING MOCK IDE ── */}
          <motion.div id="engine" className="ide-wrapper" variants={fadeInUp}>
            <div className="ide-container-mock">
              
              {/* Left Sidebar (Activity Bar) */}
              <div className="ide-sidebar">
                <div className="ide-icon active"><Files size={20} /></div>
                <div className="ide-icon"><Search size={20} /></div>
                <div className="ide-icon"><GitBranch size={20} /></div>
                <div className="ide-spacer"></div>
                <div className="ide-icon"><Settings size={20} /></div>
              </div>

              {/* Main Editor Area */}
              <div className="ide-main">
                {/* Tabs & Controls */}
                <div className="ide-tabs-header">
                  <div className="ide-window-controls">
                    <div className="ide-dot r"></div>
                    <div className="ide-dot y"></div>
                    <div className="ide-dot g"></div>
                  </div>
                  <div className="ide-tabs">
                    <div className="ide-tab active">
                      <span className="tab-icon" style={{color: '#eab308'}}>◰</span> python.py
                    </div>
                    <div className="ide-tab">
                      <Sparkles size={14} color="#a78bfa" /> AI Copilot
                    </div>
                  </div>
                </div>

                {/* Code Content */}
                <div className="ide-body">
                  <div className="ide-line"><span className="ide-line-num">101</span><span className="code-keyword">import</span> fluenix <span className="code-keyword">as</span> fx</div>
                  <div className="ide-line"><span className="ide-line-num">102</span></div>
                  <div className="ide-line"><span className="ide-line-num">103</span><span className="code-keyword">data</span> = fx.analyze(repo=<span className="code-string">"analytics-v2"</span>)</div>
                  <div className="ide-line"><span className="ide-line-num">104</span></div>
                  <div className="ide-line"><span className="ide-line-num">105</span><span className="code-keyword">def</span> <span className="code-function">calculate_impact</span>():</div>
                  <div className="ide-line"><span className="ide-line-num">106</span>  <span className="code-keyword">if</span> processData(data, meta):</div>
                  <div className="ide-line"><span className="ide-line-num">107</span>    <span className="code-keyword">return</span> fx.calculate_impact()</div>
                  <div className="ide-line"><span className="ide-line-num">108</span></div>
                  
                  {/* Highlighted Block */}
                  <div className="code-highlight-block">
                    <div className="highlight-icon">💡</div>
                    <div className="ide-line"><span className="ide-line-num">110</span><span className="code-keyword">def</span> <span className="code-function">processData</span>(<span className="code-string">"processData"</span>):</div>
                    <div className="ide-line"><span className="ide-line-num">111</span>  constData = <span className="code-keyword">function</span></div>
                    <div className="ide-line"><span className="ide-line-num">112</span>    processData(data)<span className="code-keyword">from</span>(<span className="code-string">"limit"</span>)</div>
                    <div className="ide-line"><span className="ide-line-num">113</span>    <span className="code-keyword">return</span> fx.analyze(<span className="code-string">"convert"</span>)</div>
                    <div className="ide-line"><span className="ide-line-num">114</span></div>
                  </div>

                  <div className="ide-line"><span className="ide-line-num">116</span><span className="code-keyword">return</span> num_result() == (</div>
                  <div className="ide-line"><span className="ide-line-num">117</span>  <span className="code-keyword">if</span> (processData.data) {'{'}</div>
                  <div className="ide-line"><span className="ide-line-num">118</span>    fx.update_process(data)</div>
                  
                  {/* Floating AI Panel Overlay */}
                  <div className="ai-overlay-panel">
                    <div className="ai-overlay-header">
                      <Brain size={16} color="#a78bfa" />
                      <span>Fluenix (AI):</span>
                    </div>
                    <div className="ai-overlay-body">
                      Optimizing 'processData' function (Lines 110-118).
                      <br/><br/>
                      Refactoring suggestion accepted.
                    </div>
                    <div className="ai-overlay-footer">
                      <div className="ai-progress-bar">
                        <div className="ai-progress-fill"></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ── SOCIAL PROOF ── */}
        <motion.section 
          className="social-proof"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <p>Trusted by elite engineers from top tech companies</p>
          <div className="logos-row">
            <span>AMAZON</span>
            <span className="dot"></span>
            <span>META</span>
            <span className="dot"></span>
            <span>GOOGLE</span>
            <span className="dot"></span>
            <span>STRIPE</span>
            <span className="dot"></span>
            <span>NETFLIX</span>
          </div>
        </motion.section>

        {/* ── ARCHITECTURE PIPELINE ── */}
        <motion.section 
          id="architecture" 
          className="section-wrapper" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5,5,5,0.3)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="section-header" variants={fadeInUp}>
            <h2 style={{ color: '#fff' }}>The Intelligence Pipeline</h2>
            <p>How our engine translates your raw input into FAANG-level career advancement.</p>
          </motion.div>
          
          <div className="pipeline-container">
            <motion.div className="pipeline-step" variants={fadeInUp}>
              <div className="pipeline-icon"><Database size={24} /></div>
              <h3>1. Context Ingestion</h3>
              <p>Submit your PR descriptions, system design diagrams, or raw voice recordings. The engine securely processes the technical context.</p>
              <div className="pipeline-connector"></div>
            </motion.div>

            <motion.div className="pipeline-step" variants={fadeInUp}>
              <div className="pipeline-icon"><Brain size={24} /></div>
              <h3>2. FAANG-Calibrated Analysis</h3>
              <p>Our fine-tuned LLMs evaluate your submission against L6/L7 rubrics, checking for architectural depth and Amazon Leadership Principles.</p>
              <div className="pipeline-connector"></div>
            </motion.div>

            <motion.div className="pipeline-step" variants={fadeInUp}>
              <div className="pipeline-icon"><LineChart size={24} /></div>
              <h3>3. Actionable Telemetry</h3>
              <p>Receive concrete feedback. Not just grammar fixes, but strategic recommendations to elevate your engineering communication.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── FEATURES GRID ── */}
        <motion.section 
          id="features" 
          className="section-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="section-header" variants={fadeInUp}>
            <h2>Infrastructure for Excellence</h2>
            <p>Specialized intelligence modules built specifically for the complexities of modern software engineering.</p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((mod, i) => {
              const Icon = mod.icon
              return (
                <motion.div key={i} className="feature-card" variants={fadeInUp}>
                  <div className="feature-icon-wrapper"><Icon size={24} /></div>
                  <h3>{mod.title}</h3>
                  <p>{mod.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* ── TESTIMONIALS ── */}
        <motion.section 
          id="testimonials" 
          className="section-wrapper" style={{ background: 'rgba(5,5,5,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="section-header" variants={fadeInUp}>
            <h2>Proven Career Impact</h2>
            <p>See how engineers are leveling up their communication and passing elite interviews.</p>
          </motion.div>
          
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="testimonial-card" variants={fadeInUp}>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="t-avatar">{t.initial}</div>
                  <div className="t-info">
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── PRICING ── */}
        <motion.section 
          id="pricing" 
          className="section-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="section-header">
            <h2>Transparent Pricing</h2>
            <p>Invest in the highest ROI skill in software engineering: Clear Communication.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Developer</h3>
              <div className="price">Free<span>/forever</span></div>
              <p className="desc">For junior developers learning the ropes of professional communication.</p>
              <ul className="features-list">
                <li><Check size={18} className="icon-check" /> 5 Scenario simulations/mo</li>
                <li><Check size={18} className="icon-check" /> Basic grammar correction</li>
                <li><Check size={18} className="icon-check" /> Standard lexicon access</li>
              </ul>
              <Link href="/sign-up" className="btn-pricing-outline">Get Started for Free</Link>
            </div>
            
            <div className="pricing-card pro">
              <div className="popular-badge">Enterprise Standard</div>
              <h3>Fluenix Pro</h3>
              <div className="price">$19<span>/mo</span></div>
              <p className="desc">For high-performance engineers targeting FAANG and Staff+ roles.</p>
              <ul className="features-list">
                <li><Check size={18} className="icon-check" /> Unlimited AI simulations</li>
                <li><Check size={18} className="icon-check" /> Advanced architectural lexicon</li>
                <li><Check size={18} className="icon-check" /> Pronunciation Lab full access</li>
                <li><Check size={18} className="icon-check" /> Priority AI processing (GPT-4)</li>
              </ul>
              <Link href="/sign-up" className="btn-pricing-solid">Start 14-Day Trial</Link>
            </div>
          </div>
        </motion.section>

        {/* ── FAQ ── */}
        <FaqSection />
      </main>

      {/* ── FOOTER ── */}
      <footer className="cta-footer">
        <div className="footer-inner">
          <div className="brand">
            <Logo size={18} color="#a1a1aa" />
            <span>Fluenix © 2026</span>
          </div>
          <div className="footer-links">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
