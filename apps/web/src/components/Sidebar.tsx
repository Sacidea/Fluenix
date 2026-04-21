'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { LevelSelector } from './LevelSelector'

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/dashboard', label: 'Home', icon: '🏠' },
    { href: '/dashboard/scenario', label: 'Scenario Sim', icon: '🎭' },
    { href: '/dashboard/writing', label: 'Technical Writing', icon: '✍️' },
    { href: '/dashboard/pronunciation', label: 'Pronunciation Lab', icon: '🎙️' },
    { href: '/dashboard/progress', label: 'Progress Map', icon: '📊' },
  ]

  return (
    <>
      <button 
        className={`sb-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <div className="sb-hamburger">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
      </button>

      {isOpen && (
        <div className="sb-overlay" onClick={() => setIsOpen(false)} data-aos="fade-in" data-aos-duration="300" />
      )}

      <aside className={`sb-root ${isOpen ? 'open' : ''}`}>
        <style>{`
          .sb-toggle {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 100;
            background: white;
            border: 1.5px solid #e8edf5;
            border-radius: 12px;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .sb-toggle:hover {
            box-shadow: 0 6px 16px rgba(0,0,0,0.08);
            transform: translateY(-1px);
          }
          .sb-toggle.open {
            left: 260px; /* offset to slide with the menu */
            background: #ffffff;
            border-color: #eef2ff;
          }
          
          .sb-hamburger {
            width: 20px;
            height: 14px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .line {
            display: block;
            height: 2px;
            width: 100%;
            background: #102D47;
            border-radius: 2px;
            transition: all 0.3s ease;
          }
          .sb-toggle.open .line1 { transform: translateY(6px) rotate(45deg); }
          .sb-toggle.open .line2 { opacity: 0; }
          .sb-toggle.open .line3 { transform: translateY(-6px) rotate(-45deg); }

          .sb-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(16, 45, 71, 0.2);
            backdrop-filter: blur(4px);
            z-index: 40;
          }

          .sb-root {
            width: 300px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            font-family: 'DM Sans', sans-serif;
            z-index: 50;
            box-shadow: 4px 0 24px rgba(0,0,0,0.05);
            transform: translateX(-100%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .sb-root.open {
            transform: translateX(0);
          }

          .sb-header {
            padding: 32px 24px 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1.5px solid #f0f4f8;
          }
          .sb-logo-icon { font-size: 28px; }
          .sb-logo-text {
            font-size: 22px;
            font-weight: 700;
            color: #102D47;
            letter-spacing: -0.5px;
          }

          .sb-nav {
            flex: 1;
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            overflow-y: auto;
          }
          .sb-link {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 14px 18px;
            border-radius: 12px;
            text-decoration: none;
            color: #547593;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.2s ease;
          }
          .sb-link:hover {
            background: #f8faff;
            color: #102D47;
            transform: translateX(4px);
          }
          .sb-link.active {
            background: #eef2ff;
            color: #6366f1;
          }
          .sb-link-icon { font-size: 18px; }

          .sb-footer {
            padding: 24px;
            background: #fcfdfe;
            border-top: 1.5px solid #f0f4f8;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .sb-user-card {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: white;
            border: 1.5px solid #f0f4f8;
            border-radius: 12px;
          }
          .sb-user-info { display: flex; flex-direction: column; gap: 2px; }
          .sb-user-name { font-size: 14px; font-weight: 700; color: #102D47; }
          .sb-user-role { font-size: 12px; color: #64748b; }
        `}</style>

        <div className="sb-header">
          <span className="sb-logo-icon">🚀</span>
          <span className="sb-logo-text">Fluenix</span>
        </div>

        <nav className="sb-nav">
          {links.map((link, i) => {
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`sb-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                data-aos={isOpen ? "slide-right" : ""}
                data-aos-delay={i * 50}
                data-aos-duration="400"
              >
                <span className="sb-link-icon">{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="sb-footer">
          <LevelSelector />
          <div className="sb-user-card">
            <UserButton afterSignOutUrl="/" />
            <div className="sb-user-info">
              <span className="sb-user-name">My Account</span>
              <span className="sb-user-role">Manage Profile</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
