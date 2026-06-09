import React from 'react'
import { GrammarClient } from '@/components/grammar-lab/GrammarClient'

export const metadata = {
  title: 'Grammar Intelligence',
  description: 'Structural refinement and grammar linter for professional writing.',
}

export default function GrammarLabPage() {
  return <GrammarClient />
}
