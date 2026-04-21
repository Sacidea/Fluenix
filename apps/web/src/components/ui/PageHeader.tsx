type PageHeaderProps = {
  eyebrow?: string
  eyebrowColor?: string
  title: string
  subtitle?: string
}

export default function PageHeader({ eyebrow, eyebrowColor = 'var(--color-primary)', title, subtitle }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 36 }}>
      {eyebrow && (
        <p className="eyebrow" style={{ color: eyebrowColor }}>{eyebrow}</p>
      )}
      <h1 className="pageTitle">{title}</h1>
      {subtitle && <p className="pageSub">{subtitle}</p>}
    </div>
  )
}