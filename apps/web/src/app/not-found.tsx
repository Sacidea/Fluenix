'use client'

import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="not-found-btn primary">
            <Home size={16} />
            <span>Back to Home</span>
          </Link>
          <Link href="/dashboard" className="not-found-btn secondary">
            <Search size={16} />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          font-family: 'DM Sans', -apple-system, sans-serif;
          padding: 24px;
        }

        .not-found-content {
          text-align: center;
          max-width: 480px;
        }

        .not-found-code {
          font-size: 120px;
          font-weight: 900;
          letter-spacing: -6px;
          background: linear-gradient(135deg, #4f46e5, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          margin-bottom: 16px;
        }

        .not-found-title {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .not-found-desc {
          font-size: 16px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .not-found-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .not-found-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }

        .not-found-btn.primary {
          background: #0f172a;
          color: white;
        }

        .not-found-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
        }

        .not-found-btn.secondary {
          background: white;
          color: #475569;
          border: 1.5px solid #e2e8f0;
        }

        .not-found-btn.secondary:hover {
          border-color: #cbd5e1;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}
