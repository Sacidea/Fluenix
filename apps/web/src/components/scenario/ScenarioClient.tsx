'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useScenarioSession } from '@/hooks/useScenarioSession'
import { ScenarioSelector } from '@/components/scenario/ScenarioSelector'
import { SimulationWorkspace } from '@/components/scenario/SimulationWorkspace'

export function ScenarioClient() {
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
          <div className="scenario-feedback-view max-w-[800px] mx-auto bg-white rounded-2xl p-10 border border-slate-200">
            <div className="text-center mb-8">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-full text-[32px] font-black mb-4"
                style={{ 
                  background: analysisResult.overall_score >= 80 ? '#dcfce7' : '#fef9c3', 
                  color: analysisResult.overall_score >= 80 ? '#16a34a' : '#ca8a04'
                }}
              >
                {analysisResult.overall_score}
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Simulation Complete</h2>
              <p className="text-slate-500">Here is your comprehensive FAANG evaluation.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <div className="text-xs font-extrabold text-slate-500 uppercase">Fluency</div>
                <div className="text-2xl font-extrabold text-blue-500">{analysisResult.fluency_score}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <div className="text-xs font-extrabold text-slate-500 uppercase">Vocabulary</div>
                <div className="text-2xl font-extrabold text-purple-500">{analysisResult.vocabulary_score}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <div className="text-xs font-extrabold text-slate-500 uppercase">Tech Accuracy</div>
                <div className="text-2xl font-extrabold text-amber-500">{analysisResult.technical_accuracy}</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-extrabold text-slate-900 mb-2">Manager's Note</h4>
              <p className="text-[15px] text-slate-700 leading-relaxed">{analysisResult.overall_feedback}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-extrabold text-green-600 mb-3 flex items-center gap-1.5">Strengths</h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                  {analysisResult.strengths?.map((s: string, i: number) => (
                    <li key={i} className="text-sm text-slate-700 flex gap-2 items-start">
                      <span className="text-green-600">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-red-600 mb-3 flex items-center gap-1.5">Areas to Improve</h4>
                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                  {analysisResult.improvements?.map((s: string, i: number) => (
                    <li key={i} className="text-sm text-slate-700 flex gap-2 items-start">
                      <span className="text-red-600">!</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              className="start-btn w-full m-0" 
              onClick={() => setAnalysisResult(null)}
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
