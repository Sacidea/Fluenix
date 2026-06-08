'use client'

import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { 
    q: "How does Fluenix differ from general AI like ChatGPT?", 
    a: "Fluenix is purpose-built for software engineers. Unlike generic LLMs, our engine is fine-tuned on thousands of real technical interviews, FAANG architecture documents, and system design transcripts. It doesn't just check grammar; it evaluates technical depth, algorithmic clarity, and architectural tradeoffs." 
  },
  { 
    q: "Are the System Design simulations realistic?", 
    a: "Extremely. Our simulations replicate the exact environments of top-tier tech companies. The AI acts as a senior interviewer, pushing back on your database choices, challenging your latency estimates, and introducing unexpected scale constraints mid-interview." 
  },
  { 
    q: "Is my voice data and code secure?", 
    a: "Security is our top priority. We do not use your proprietary code or voice recordings to train our foundational models. All data is processed using enterprise-grade encryption in transit and at rest, complying with SOC2 standards." 
  },
  { 
    q: "Can I use Fluenix to prepare for Staff/Principal level interviews?", 
    a: "Yes. The 'Behavioral Matrix' and 'System Design' modules have specific difficulty settings. You can configure the engine to evaluate you against L6/L7 (Staff/Principal) rubrics, focusing on cross-functional impact, multi-region architecture, and organizational leadership." 
  }
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <motion.section 
      className="faq-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="faq-container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '16px', letterSpacing: '-1px' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: '18px' }}>
            Everything you need to know about the Fluenix infrastructure.
          </p>
        </div>
        
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={`faq-item ${openFaq === i ? 'open' : ''}`} 
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div className="faq-q">
              {faq.q}
              <ChevronDown size={20} className="faq-icon" />
            </div>
            <div className="faq-a">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
