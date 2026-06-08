'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useScenarioSession } from '@/hooks/useScenarioSession'
import { ScenarioSelector } from '@/components/scenario/ScenarioSelector'
import { SimulationWorkspace } from '@/components/scenario/SimulationWorkspace'

export default function ScenarioPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const {
    scenario,
    setScenario,
    activeMission,
    messages,
    input,
    setInput,
    loading,
    started,
    startScenario,
    sendMessage,
    endSession,
    endAndAnalyzeSession,
    bottomRef,
    activeScenario,
    durationStr,
    listening,
    startListening,
    stopListening,
    availableVoices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    analysisResult,
    setAnalysisResult
  } = useScenarioSession()

  return (
    <div className="scenario-lab-root">
      {/* Header */}
      <header className="scenario-header">
        <div className="scenario-header-content">
          <Link href="/dashboard" className="scenario-back-link">
            <ChevronLeft size={16} />
            <span>Dashboard</span>
          </Link>
          <div>
            <span className="scenario-eyebrow">Simulation Environment</span>
            <h1 className="scenario-main-title">Scenario Cockpit</h1>
          </div>
        </div>
      </header>

      <main className="scenario-main">
        {analysisResult ? (
          <div className="scenario-feedback-view" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: analysisResult.overall_score >= 80 ? '#dcfce7' : '#fef9c3', color: analysisResult.overall_score >= 80 ? '#16a34a' : '#ca8a04', fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>
                {analysisResult.overall_score}
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Simulation Complete</h2>
              <p style={{ color: '#64748b' }}>Here is your comprehensive FAANG evaluation.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Fluency</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6' }}>{analysisResult.fluency_score}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Vocabulary</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#8b5cf6' }}>{analysisResult.vocabulary_score}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Tech Accuracy</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#f59e0b' }}>{analysisResult.technical_accuracy}</div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Manager's Note</h4>
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>{analysisResult.overall_feedback}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>Strengths</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysisResult.strengths?.map((s: string, i: number) => (
                    <li key={i} style={{ fontSize: '14px', color: '#334155', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#16a34a' }}>✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#dc2626', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>Areas to Improve</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {analysisResult.improvements?.map((s: string, i: number) => (
                    <li key={i} style={{ fontSize: '14px', color: '#334155', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#dc2626' }}>!</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              className="start-btn" 
              onClick={() => setAnalysisResult(null)}
              style={{ width: '100%', margin: 0 }}
            >
              Return to Cockpit
            </button>
          </div>
        ) : !started ? (
          <ScenarioSelector 
            scenario={scenario} 
            setScenario={setScenario} 
            startScenario={startScenario} 
            availableVoices={availableVoices}
            selectedVoiceURI={selectedVoiceURI}
            setSelectedVoiceURI={setSelectedVoiceURI}
          />
        ) : (
          <SimulationWorkspace
            activeScenario={activeScenario}
            activeMission={activeMission}
            durationStr={durationStr}
            messages={messages}
            input={input}
            setInput={setInput}
            loading={loading}
            listening={listening}
            startListening={startListening}
            stopListening={stopListening}
            sendMessage={sendMessage}
            endSession={endSession}
            endAndAnalyzeSession={endAndAnalyzeSession}
            bottomRef={bottomRef}
          />
        )}
      </main>
    </div>
  )
}