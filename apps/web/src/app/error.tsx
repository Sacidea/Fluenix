'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Next.js UI Error caught:', error)
  }, [error])

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '40px auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', textAlign: 'center' }}>
      <h2 style={{ color: '#0f172a', fontWeight: 900, marginBottom: '16px' }}>Component Error Encountered</h2>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        A module within the dashboard failed to load. The system has automatically isolated the failure to prevent full crash.
      </p>
      <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #f1f5f9', color: '#dc2626', fontSize: '13px', fontFamily: 'monospace', marginBottom: '24px', wordBreak: 'break-word', textAlign: 'left' }}>
        {error.message || 'Unknown Rendering Error'}
      </div>
      <button
        onClick={() => reset()}
        style={{ background: '#4338ca', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 800, cursor: 'pointer' }}
      >
        Retry Component
      </button>
    </div>
  )
}
