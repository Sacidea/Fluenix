'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px', margin: '20px' }}>
          <h2 style={{ color: '#b91c1c', marginTop: 0 }}>Something went wrong.</h2>
          <p style={{ color: '#991b1b' }}>The application encountered an unexpected error.</p>
          <details style={{ whiteSpace: 'pre-wrap', color: '#7f1d1d', background: '#fee2e2', padding: '10px', borderRadius: '4px' }}>
            {this.state.error && this.state.error.toString()}
          </details>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{ marginTop: '20px', padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
