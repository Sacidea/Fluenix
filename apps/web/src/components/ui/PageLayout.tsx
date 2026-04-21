type PageLayoutProps = {
  children: React.ReactNode
  wide?: boolean
}

export default function PageLayout({ children, wide = false }: PageLayoutProps) {
  return (
    <div className="pageRoot">
      {children}
    </div>
  )
}