'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useScenarioSession } from '@/hooks/useScenarioSession'
import { ScenarioSelector } from '@/components/scenario/ScenarioSelector'
import { SimulationWorkspace } from '@/components/scenario/SimulationWorkspace'

export default function ScenarioPage() {
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
    setSelectedVoiceURI
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
        {!started ? (
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