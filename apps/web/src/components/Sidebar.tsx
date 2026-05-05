'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { LevelSelector } from './LevelSelector'
import * as Icons from 'lucide-react'
import { useSidebarStore } from '@/store/useSidebarStore'

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle, setIsOpen } = useSidebarStore()

  const links = [
    { href: '/dashboard', label: 'Home', icon: 'Layout' },
    { href: '/dashboard/behavioral-lab', label: 'Behavioral Prep', icon: 'Target' },
    { href: '/dashboard/scenario', label: 'Scenario Sim', icon: 'MessagesSquare' },
    { href: '/dashboard/writing', label: 'Technical Writing', icon: 'PenTool' },
    { href: '/dashboard/grammar-lab', label: 'Grammar Intelligence', icon: 'CheckSquare' },
    { href: '/dashboard/pronunciation', label: 'Pronunciation Lab', icon: 'Mic' },
    { href: '/dashboard/vocabulary', label: 'Tech Lexicon', icon: 'BookOpen' },
  ]

  return (
    <>
      {/* Mobile-only toggle button */}
      <button
        className={`sb-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={toggle}
        aria-label="Menu"
      >
        {isOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}
      </button>

      {isOpen && (
        <motion.div
          className="sb-overlay"
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      <aside className={`sb-root ${isOpen ? 'open' : 'collapsed'}`}>
        <div className="sb-header">
          <div className="header-left">
            <div className="logo-box">
              <Icons.Zap size={24} className="logo-icon" />
            </div>
            <span className="sb-logo-text">Fluenix <span className="lab-tag">LAB</span></span>
          </div>
          <button className="collapse-btn" onClick={toggle} aria-label="Toggle Menu">
            {isOpen ? <Icons.PanelLeftClose size={18} /> : <Icons.PanelLeft size={18} />}
          </button>
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
            <LevelSelector isCollapsed={!isOpen} />
          </div>

          <div className="footer-section profile">
            <div className="footer-label">System Operator</div>
            <div className="sb-user-card">
              <div className="clerk-wrapper">
                <UserButton
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
          .sb-toggle-btn {
            position: fixed;
            top: 24px;
            left: 24px;
            z-index: 1010;
            width: 44px;
            height: 44px;
            display: none;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            color: #0f172a;
            transition: all 0.2s;
          }

          @media (max-width: 1024px) {
            .sb-toggle-btn {
              display: flex;
            }
          }

          .sb-toggle-btn:hover {
            border-color: #cbd5e1;
            transform: scale(1.05);
          }

          .sb-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.15);
            backdrop-filter: blur(4px);
            z-index: 990;
            display: none;
          }

          @media (max-width: 1024px) {
            .sb-overlay {
              display: block;
            }
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
            overflow: visible;
            transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .sb-root.collapsed {
            width: 80px;
          }

          @media (max-width: 1024px) {
            .sb-root.collapsed {
              width: 280px;
              transform: translateX(-100%);
            }
          }

          .sb-header { padding: 40px 24px 24px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
          .sb-root.collapsed .sb-header { padding: 40px 0 24px; justify-content: center; }
          
          .header-left { display: flex; align-items: center; gap: 12px; }
          .sb-root.collapsed .header-left { display: none; }
          
          .logo-box { width: 40px; height: 40px; background: #0f172a; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; }
          
          .collapse-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            border: 1px solid transparent;
            background: transparent;
            color: #94a3b8;
            cursor: pointer;
            transition: all 0.2s;
          }
          .collapse-btn:hover {
            background: #f1f5f9;
            color: #0f172a;
          }
          
          @media (max-width: 1024px) {
            .collapse-btn { display: none; }
          }
          
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

          .sb-nav { flex: 1; padding: 20px 16px; display: flex; flex-direction: column; gap: 4px; overflow: hidden; }
          .sb-link { 
            display: flex; 
            align-items: center; 
            gap: 14px; 
            padding: 12px 16px; 
            border-radius: 12px; 
            text-decoration: none; 
            color: #64748b; 
            transition: all 0.2s; 
            white-space: nowrap;
          }
          .sb-link:hover, .sb-link.active { background: #f1f5f9; color: #0f172a; }

          .sb-link-label {
            font-family: var(--font-serif);
            font-size: 16px;
            font-weight: 700;
            letter-spacing: -0.2px;
            transition: opacity 0.2s;
          }

          .sb-root.collapsed .sb-link { padding: 12px; justify-content: center; }
          .sb-root.collapsed .sb-link-label { display: none; }
          .sb-root.collapsed .sb-link-icon { margin: 0; }

          .sb-footer { 
            padding: 24px; 
            border-top: 1px solid #f1f5f9; 
            display: flex; 
            flex-direction: column; 
            gap: 24px; 
            background: #fafafa;
            overflow: visible;
          }
          .sb-root.collapsed .sb-footer { padding: 24px 0; align-items: center; }

          .footer-section { display: flex; flex-direction: column; gap: 8px; overflow: visible; width: 100%; }
          .sb-root.collapsed .footer-section { align-items: center; }

          .footer-label { 
            font-family: var(--font-mono);
            font-size: 9px; 
            font-weight: 800; 
            text-transform: uppercase; 
            letter-spacing: 2px; 
            color: #94a3b8; 
          }
          .sb-root.collapsed .footer-label { display: none; }
          
          .sb-user-card { 
            display: flex; 
            align-items: center; 
            gap: 12px; 
            padding: 10px; 
            background: white; 
            border: 1px solid #e2e8f0; 
            border-radius: 12px;
            overflow: hidden; 
            width: 100%;
          }
          .sb-root.collapsed .sb-user-card { padding: 10px; justify-content: center; border: none; background: transparent; }
          
          .clerk-wrapper { display: flex; align-items: center; justify-content: center; overflow: visible; flex-shrink: 0; }
          .sb-user-info { display: flex; flex-direction: column; white-space: nowrap; }
          .sb-root.collapsed .sb-user-info { display: none; }
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
      </aside>
    </>
  )
}
