import React from 'react'
import { Terminal, Users, FileCode } from 'lucide-react'
import { ScenarioType, scenarios } from '@/hooks/useScenarioSession'

interface ScenarioSelectorProps {
  scenario: ScenarioType
  setScenario: (sc: ScenarioType) => void
  startScenario: () => void
  availableVoices: SpeechSynthesisVoice[]
  selectedVoiceURI: string
  setSelectedVoiceURI: (uri: string) => void
}

const IconMap: Record<string, any> = { Terminal, Users, FileCode }

export function ScenarioSelector({ 
  scenario, 
  setScenario, 
  startScenario,
  availableVoices,
  selectedVoiceURI,
  setSelectedVoiceURI
}: ScenarioSelectorProps) {
  return (
    <section className="selector-view">
      <div className="selector-intro">
        <h2>Select Operational Context</h2>
        <p>AI will simulate a high-stakes professional environment based on your selection.</p>
      </div>

      <div className="scenarios-grid">
        {scenarios.map((s) => {
          const Icon = IconMap[s.icon]
          return (
            <button
              key={s.id}
              className={`scenario-card ${scenario === s.id ? 'active' : ''}`}
              onClick={() => setScenario(s.id as ScenarioType)}
            >
              <div className="card-accent" style={{ background: s.color }} />
              <div className="card-top">
                <Icon size={24} style={{ color: scenario === s.id ? s.color : '#94a3b8' }} />
                <span className="sc-tag">{s.id.replace('_', ' ')}</span>
              </div>
              <h3 className="sc-title">{s.label}</h3>
              <p className="sc-desc">{s.desc}</p>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>AI Voice Persona</label>
          <select 
            value={selectedVoiceURI}
            onChange={(e) => setSelectedVoiceURI(e.target.value)}
            style={{ 
              padding: '12px', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0',
              outline: 'none',
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
          >
            {availableVoices.length === 0 && <option>Loading voices...</option>}
            {availableVoices.map(v => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        <button className="start-btn" onClick={startScenario} style={{ flex: 1, margin: 0, marginTop: '22px' }}>
          Initialize
        </button>
      </div>
    </section>
  )
}
