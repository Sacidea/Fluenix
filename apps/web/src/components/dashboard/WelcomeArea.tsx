import React from 'react'

export function WelcomeArea({ firstName }: { firstName?: string | null }) {
  return (
    <>
      <section className="welcome-area">
        <div className="eyebrow-group">
          <div className="line" />
          <span className="eyebrow">Operational Terminal</span>
        </div>

        <h1 className="welcome-text">
          Welcome, {firstName ?? 'Engineer'} —<br />
          <span className="serif-grad">Technical communication environment active.</span>
        </h1>
        <p className="description">
          Access your technical lab modules below. Each module is optimized for high-stakes FAANG-level communication standards.
        </p>
      </section>

      <style jsx>{`
        .welcome-area {
          margin-bottom: 60px;
        }

        .eyebrow-group {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .line {
          width: 32px;
          height: 1px;
          background: var(--color-primary);
        }

        .eyebrow {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--color-text-light);
        }

        .welcome-text {
          font-family: var(--font-base);
          font-size: 40px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1.5px;
          color: var(--color-text);
          margin-bottom: 16px;
        }

        .serif-grad {
          font-family: var(--font-serif);
          font-weight: 400;
          font-style: italic;
          background: linear-gradient(135deg, var(--color-primary), #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .description {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--color-text-light);
          max-width: 600px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .welcome-text { font-size: 32px; }
        }
      `}</style>
    </>
  )
}
