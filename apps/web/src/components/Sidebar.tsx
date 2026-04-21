'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { LevelSelector } from './LevelSelector'
import * as Icons from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Home', icon: 'Layout' },
    { href: '/dashboard/scenario', label: 'Scenario Sim', icon: 'MessagesSquare' },
    { href: '/dashboard/writing', label: 'Technical Writing', icon: 'PenTool' },
    { href: '/dashboard/pronunciation', label: 'Pronunciation Lab', icon: 'Mic' },
    { href: '/dashboard/progress', label: 'Progress Map', icon: 'Activity' },
  ]

  return (
    <>
      <div className={`sb-overlay ${isOpen ? 'visible' : ''}`} onClick={() => setIsOpen(false)} />

      <motion.aside 
        className={`sb-root ${isOpen ? 'open' : ''}`}
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="sb-header">
           <div className="header-top">
              <div className="logo-box">
                <Icons.Zap size={24} className="logo-icon" />
              </div>
              <button className="sb-close-btn" onClick={() => setIsOpen(false)}>
                <Icons.X size={20} />
              </button>
           </div>
           <span className="sb-logo-text">Fluenix <span className="lab-tag">LAB</span></span>
        </div>
        
        <nav className="sb-nav">
          {links.map((link) => {
            const Icon = (Icons as any)[link.icon] || Icons.HelpCircle
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))
            
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`sb-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} className="sb-link-icon" />
                <span className="sb-link-label">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="sb-footer">
          <div className="footer-section">
            <div className="footer-label">System Calibration</div>
            <LevelSelector />
          </div>
          
          <div className="footer-section profile">
            <div className="footer-label">System Operator</div>
            <div className="sb-user-card">
              <div className="clerk-wrapper">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: { width: 32, height: 32, borderRadius: 8 }
                    }
                  }}
                />
              </div>
              <div className="sb-user-info">
                <span className="sb-user-name">Professional ID</span>
                <span className="sb-user-role">Account & Security</span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .sb-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.15);
            backdrop-filter: blur(4px);
            z-index: 990;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
          }
          .sb-overlay.visible {
            opacity: 1;
            pointer-events: auto;
          }

          .sb-root {
            width: 280px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0; 
            left: 0; 
            height: 100dvh;
            z-index: 1000;
            border-right: 1px solid #e2e8f0;
            box-shadow: 10px 0 40px rgba(0,0,0,0.03); 
          }

          .sb-header { padding: 32px 24px 24px; display: flex; flex-direction: column; gap: 20px; }
          .header-top { display: flex; justify-content: space-between; align-items: center; }
          
          .logo-box { width: 40px; height: 40px; background: #0f172a; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; }
          
          .sb-close-btn {
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.2s;
          }
          .sb-close-btn:hover { background: #f1f5f9; color: #0f172a; }

          .sb-logo-text { 
            font-family: var(--font-serif);
            font-size: 22px; 
            font-weight: 900; 
            color: #0f172a; 
            letter-spacing: -0.5px; 
            display: flex; 
            align-items: center; 
            gap: 6px; 
          }
          .lab-tag { 
            font-family: var(--font-mono);
            font-size: 9px; 
            font-weight: 800; 
            letter-spacing: 1.5px; 
            background: #f1f5f9; 
            color: #64748b; 
            padding: 2px 6px; 
            border-radius: 4px; 
          }

          .sb-nav { flex: 1; padding: 10px 16px; display: flex; flex-direction: column; gap: 4px; }
          .sb-link { 
            display: flex; 
            align-items: center; 
            gap: 14px; 
            padding: 12px 16px; 
            border-radius: 12px; 
            text-decoration: none; 
            color: #64748b; 
            transition: all 0.2s; 
          }
          .sb-link:hover, .sb-link.active { background: #f1f5f9; color: #0f172a; }

          .sb-link-label {
            font-family: var(--font-serif);
            font-size: 16px;
            font-weight: 700;
            letter-spacing: -0.2px;
          }

          .sb-footer { 
            padding: 24px; 
            border-top: 1px solid #f1f5f9; 
            display: flex; 
            flex-direction: column; 
            gap: 24px; 
            background: #fafafa;
          }
          .footer-section { display: flex; flex-direction: column; gap: 8px; }
          .footer-label { 
            font-family: var(--font-mono);
            font-size: 9px; 
            font-weight: 800; 
            text-transform: uppercase; 
            letter-spacing: 2px; 
            color: #94a3b8; 
          }
          
          .sb-user-card { 
            display: flex; 
            align-items: center; 
            gap: 12px; 
            padding: 10px; 
            background: white; 
            border: 1px solid #e2e8f0; 
            border-radius: 12px;
          }
          .sb-user-info { display: flex; flex-direction: column; }
          .sb-user-name { 
            font-family: var(--font-serif);
            font-size: 13px; 
            font-weight: 800; 
            color: #0f172a; 
          }
          .sb-user-role { 
            font-family: var(--font-mono);
            font-size: 9px; 
            font-weight: 700; 
            color: #94a3b8; 
            text-transform: uppercase; 
          }
        `}</style>
      </motion.aside>
    </>
  )
}
