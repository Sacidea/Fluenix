'use client'

export default function DashboardLoading() {
  return (
    <div className="loading-page">
      <div className="loading-content">
        <div className="loading-spinner" />
        <p className="loading-text">Loading your workspace...</p>
      </div>

      <style jsx>{`
        .loading-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          font-family: 'DM Sans', -apple-system, sans-serif;
        }

        .loading-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e2e8f0;
          border-top-color: #4f46e5;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .loading-text {
          font-size: 14px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.3px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
