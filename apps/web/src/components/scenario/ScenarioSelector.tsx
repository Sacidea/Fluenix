import React from 'react'
import { Terminal, Users, FileCode, Play } from 'lucide-react'
import { ScenarioType, scenarios } from '@fluenix/shared'

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

  const handleCardClick = (id: ScenarioType) => {
    setScenario(id)
    // Start automatically when a card is clicked
    setTimeout(() => {
      startScenario()
    }, 50)
  }

  return (
    <section className="selector-view">
      <div className="selector-intro">
        <div>
          <h2>Select Operational Context</h2>
          <p>Click on a scenario below to immediately initialize the AI simulation.</p>
        </div>
        
        {/* Voice Selector moved to top right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '200px' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AI Voice Persona
          </label>
          <select 
            value={selectedVoiceURI}
            onChange={(e) => setSelectedVoiceURI(e.target.value)}
            style={{ 
              padding: '10px 14px', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0',
              outline: 'none',
              fontFamily: 'inherit',
              cursor: 'pointer',
              background: '#f8fafc',
              fontSize: '13px',
              color: '#334155'
            }}
          >
            {availableVoices.length === 0 && <option>Loading voices...</option>}
            {availableVoices.map(v => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name.replace(/Google |Microsoft |English \([^)]+\)/gi, '').trim() || v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div className="scenarios-grid" style={{ marginTop: '20px' }}>
          {scenarios.map((s) => {
            const Icon = IconMap[s.icon]
            const isSelected = scenario === s.id
            return (
              <button
                key={s.id}
                className={`scenario-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleCardClick(s.id as ScenarioType)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '20px',
                  padding: '24px',
                  textAlign: 'left',
                  border: '1px solid var(--color-border)',
                  background: 'white',
                  borderRadius: '16px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                }} 
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: s.color }} />
                
                <div style={{ flexShrink: 0, width: '52px', height: '52px', borderRadius: '12px', background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'var(--font-serif)' }}>{s.label}</h3>
                    <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', letterSpacing: '1px' }}>{s.id.replace('_', ' ')}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
