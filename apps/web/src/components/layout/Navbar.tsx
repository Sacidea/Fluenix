'use client'

import React from 'react'
import * as Icons from 'lucide-react'

interface NavbarProps {
    onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    return (
        <header className="ledger-navbar">
            <div className="nav-container">
                <div className="nav-left">
                    <button className="menu-trigger" onClick={onMenuClick}>
                        <Icons.Menu size={20} />
                    </button>
                    <div className="branding">
                        <div className="logo-sq">
                            <Icons.Zap size={18} fill="currentColor" />
                        </div>
                        <span className="brand-text">Fluenix <span className="mono-label">NAV-UNIT</span></span>
                    </div>
                </div>

                <div className="nav-right">
                    <div className="status-indicator">
                        <span className="pulse-dot" />
                        <span className="status-label">EN-CORE ACTIVE</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ledger-navbar {
                    position: sticky;
                    top: 0;
                    z-index: 900;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid #e2e8f0;
                    height: 64px;
                    display: flex;
                    align-items: center;
                }

                .nav-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .nav-left {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .menu-trigger {
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px;
                    border-radius: 8px;
                    transition: all 0.2s;
                }

                .menu-trigger:hover {
                    background: #f1f5f9;
                    color: #0f172a;
                }

                .branding {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .logo-sq {
                    width: 32px;
                    height: 32px;
                    background: #0f172a;
                    color: white;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .brand-text {
                    font-family: var(--font-serif);
                    font-size: 20px;
                    font-weight: 900;
                    color: #0f172a;
                    letter-spacing: -0.5px;
                }

                .mono-label {
                    font-family: var(--font-mono);
                    font-size: 9px;
                    font-weight: 800;
                    color: #94a3b8;
                    letter-spacing: 1px;
                    background: #f8fafc;
                    padding: 2px 6px;
                    border-radius: 4px;
                    margin-left: 4px;
                }

                .nav-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    background: #f0fdf4;
                    border: 1px solid #dcfce7;
                    border-radius: 99px;
                }

                .pulse-dot {
                    width: 6px;
                    height: 6px;
                    background: #22c55e;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                .status-label {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    font-weight: 800;
                    color: #166534;
                    letter-spacing: 1px;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                }

                @media (max-width: 768px) {
                    .status-indicator { display: none; }
                }
            `}</style>
        </header>
    )
}
