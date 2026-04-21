import Link from 'next/link'

export type ModuleItem = {
    id: string
    title: string
    description: string
    icon: string
    href: string
    available: boolean
    tag: string
    color: string
    bg: string
    border: string
}

interface ModuleCardProps {
    moduleData: ModuleItem
    index: number
}

export function ModuleCard({ moduleData, index }: ModuleCardProps) {
    const { available, href, color, bg, border, tag, icon, title, description } = moduleData

    if (!available) {
        return (
            <div
                className="module-card disabled"
                data-aos="fade-up"
                data-aos-delay={index * 80}
            >
                <div className="module-card-accent" style={{ background: color }} />
                <span
                    className="module-tag"
                    style={{ background: bg, color, border: `1px solid ${border}` }}
                >
                    {tag}
                </span>
                <span className="module-icon">{icon}</span>
                <div className="module-title">{title}</div>
                <div className="module-desc">{description}</div>
            </div>
        )
    }

    return (
        <Link
            href={href}
            className="module-card active"
            data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            data-aos-delay={index * 80}
        >
            <div className="module-card-accent" style={{ background: color }} />
            <span className="module-icon">{icon}</span>
            <div className="module-title">{title}</div>
            <div className="module-desc">{description}</div>
            <div className="module-cta" style={{ background: bg, color }}>
                Start practicing →
            </div>
        </Link>
    )
}
