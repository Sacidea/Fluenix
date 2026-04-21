type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  message = 'Could not load data. Check your connection.',
  onRetry
}: ErrorStateProps) {
  return (
    <div className="errorState">
      <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
      <div style={{ color: 'var(--color-text-mid)', fontSize: 15 }}>{message}</div>
      {onRetry && (
        <button className="retryBtn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}