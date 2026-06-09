import React from 'react'
import { ScenarioClient } from '@/components/scenario/ScenarioClient'

export const metadata = {
  title: 'Scenario Cockpit',
  description: 'Technical simulation environment for software engineers.',
}

export default function ScenarioPage() {
  return <ScenarioClient />
}