'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f1f5f9' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', maxWidth: '500px' }}>
            <h1 style={{ color: '#0f172a', fontWeight: 900, fontSize: '24px', margin: '0 0 16px 0' }}>Fatal Application Error</h1>
            <p style={{ color: '#64748b', margin: '0 0 24px 0', lineHeight: 1.6 }}>
              A critical error occurred at the root layout level. Fluenix could not recover.
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', background: '#fef2f2', color: '#dc2626', padding: '16px', borderRadius: '8px', textAlign: 'left', wordBreak: 'break-word', margin: '0 0 24px 0' }}>
              {error.message}
            </p>
            <button
              onClick={() => reset()}
              style={{ background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: 800, border: 'none', cursor: 'pointer' }}
            >
              Restart Application
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
