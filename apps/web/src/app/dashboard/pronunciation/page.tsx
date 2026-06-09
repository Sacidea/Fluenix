import React from 'react'
import { PronunciationClient } from '@/components/pronunciation/PronunciationClient'
import '@/styles/pronunciation.css'

export const metadata = {
  title: 'Acoustic Analysis Lab',
  description: 'Phonetic Reporting — Voice pattern recognition active.',
}

export default function PronunciationPage() {
  return <PronunciationClient />
}