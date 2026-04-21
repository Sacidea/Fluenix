'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

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
    const { available, href, color, icon, title, description } = moduleData
    const IconComponent = (Icons as any)[icon] || Icons.HelpCircle

    if (!available) {
        return (
            <div className="ledger-module-card disabled">
                <style jsx>{`
                    .ledger-module-card.disabled {
                        background: #f1f5f9;
                        border: 1px dashed #cbd5e1;
                        padding: 32px;
                        border-radius: 12px;
                        opacity: 0.6;
                        cursor: not-allowed;
                    }
                    .module-title { font-size: 20px; font-weight: 900; margin-bottom: 8px; color: #475569; }
                    .module-desc { font-size: 14px; color: #94a3b8; line-height: 1.5; }
                `}</style>
                <h3 className="module-title">{title}</h3>
                <p className="module-desc">{description}</p>
            </div>
        )
    }

    return (
        <Link href={href} className="card-link">
            <motion.div 
                className="ledger-module-card"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                <div className="card-accent" style={{ background: color }} />
                
                <div className="card-main-content">
                    <div className="card-top">
                        <IconComponent size={24} style={{ color }} strokeWidth={2.5} />
                        <span className="card-id">MOD_{index + 1}</span>
                    </div>

                    <div className="card-inner-body">
                        <h3 className="module-title">{title}</h3>
                        <p className="module-desc">{description}</p>
                    </div>

                    <div className="card-footer">
                        <span className="cta-text">Enter Module</span>
                        <Icons.ArrowRight size={16} className="cta-icon" />
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
                .card-link {
                    text-decoration: none;
                    color: inherit;
                    display: block;
                    height: 100%;
                }

                .ledger-module-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-left: 0; /* Removed gray left border to avoid double lines */
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                    transition: all 0.3s ease;
                }

                .ledger-module-card:hover {
                    border-color: #cbd5e1;
                    box-shadow: 0 20px 40px -12px rgba(0,0,0,0.08);
                }

                .card-accent {
                    position: absolute;
                    top: 35px;
                    bottom: 35px;
                    left: 0;
                    width: 3px;
                    border-radius: 0 4px 4px 0;
                    transition: all 0.3s ease;
                }

                /* Neutral hover, no extra glow */
                .ledger-module-card:hover .card-accent {
                    width: 3px;
                }

                .card-main-content {
                    padding: 40px 40px 40px 32px; /* Adjusted indentation for edge-aligned line */
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .card-id {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 10px;
                    font-weight: 800;
                    color: #cbd5e1;
                    letter-spacing: 1px;
                }

                .module-title {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 22px;
                    font-weight: 900;
                    color: #0f172a;
                    margin-bottom: 12px;
                    letter-spacing: -0.8px;
                }

                .module-desc {
                    font-size: 14px;
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 40px;
                }

                .card-footer {
                    margin-top: auto;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #4338ca;
                    font-weight: 700;
                    font-size: 14px;
                }

                .cta-icon {
                    transition: transform 0.3s;
                }

                .ledger-module-card:hover .cta-icon {
                    transform: translateX(4px);
                }
            `}</style>
        </Link>
    )
}
