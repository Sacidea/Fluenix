import Link from 'next/link'

type NavBarProps = {
  title?: string
  showBack?: boolean
  rightContent?: React.ReactNode
}

export default function NavBar({ title, showBack = false, rightContent }: NavBarProps) {
  return (
    <nav className="pageNav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {showBack && (
          <>
            <Link href="/dashboard" className="backLink">← Back</Link>
            <span className="navSep">|</span>
          </>
        )}
        {title && <span className="navTitle">{title}</span>}
      </div>
      {rightContent && <div>{rightContent}</div>}
    </nav>
  )
}