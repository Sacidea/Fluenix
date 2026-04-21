type SpinnerProps = {
  text?: string
}

export default function Spinner({ text = 'Loading...' }: SpinnerProps) {
  return (
    <div className="loadingState">
      <div className="spinner" />
      {text}
    </div>
  )
}