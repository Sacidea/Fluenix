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
            <div className="saas-module-card disabled">
                <style jsx>{`
                    .saas-module-card.disabled {
                        background: #ffffff;
                        border: 1px dashed #cbd5e1;
                        padding: 32px;
                        border-radius: 24px;
                        opacity: 0.6;
                        cursor: not-allowed;
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                    }
                    .lock-icon {
                        color: #94a3b8;
                        margin-bottom: 16px;
                    }
                    .module-title { 
                        font-family: var(--font-base); 
                        font-size: 20px; 
                        font-weight: 800; 
                        margin-bottom: 8px; 
                        color: #64748b; 
                        letter-spacing: -0.5px;
                    }
                    .module-desc { 
                        font-size: 14px; 
                        color: #94a3b8; 
                        line-height: 1.6; 
                        font-weight: 500;
                    }
                `}</style>
                <div className="lock-icon">
                    <Icons.Lock size={32} />
                </div>
                <h3 className="module-title">{title}</h3>
                <p className="module-desc">{description}</p>
            </div>
        )
    }

    return (
        <Link 
            href={href} 
            className="card-link" 
            style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
        >
            <div className="saas-module-card">
                <div className="card-top-accent" style={{ background: color }} />
                
                <div className="card-content">
                    <div className="card-header">
                        <div className="icon-wrapper" style={{ color: color, backgroundColor: `${color}15` }}>
                            <IconComponent size={24} strokeWidth={2.5} />
                        </div>
                        <div className="badge-wrapper">
                            <span className="mod-badge">MODULE {index + 1}</span>
                        </div>
                    </div>

                    <div className="card-body">
                        <h3 className="module-title">{title}</h3>
                        <p className="module-desc">{description}</p>
                    </div>

                    <div className="card-footer">
                        <span className="cta-text" style={{ color: color }}>Launch Application</span>
                        <div className="cta-arrow" style={{ background: color }}>
                            <Icons.ArrowRight size={14} color="white" strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .saas-module-card {
                    background: #ffffff;
                    border: 1px solid #f1f5f9;
                    border-radius: 24px;
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.04);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .saas-module-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 50px -15px rgba(15, 23, 42, 0.08);
                    border-color: #e2e8f0;
                }

                .card-top-accent {
                    height: 4px;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.8;
                    transition: opacity 0.3s;
                }

                .saas-module-card:hover .card-top-accent {
                    opacity: 1;
                }

                .card-content {
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .icon-wrapper {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .saas-module-card:hover .icon-wrapper {
                    transform: scale(1.1) rotate(-5deg);
                }

                .mod-badge {
                    font-family: var(--font-mono);
                    font-size: 10px;
                    font-weight: 800;
                    color: #64748b;
                    background: #f8fafc;
                    padding: 6px 12px;
                    border-radius: 99px;
                    letter-spacing: 1px;
                }

                .module-title {
                    font-family: var(--font-base);
                    font-size: 22px;
                    font-weight: 800;
                    color: #0f172a;
                    margin-bottom: 12px;
                    letter-spacing: -0.5px;
                }

                .module-desc {
                    font-family: var(--font-base);
                    font-size: 15px;
                    color: #64748b;
                    line-height: 1.6;
                    margin-bottom: 40px;
                    font-weight: 500;
                }

                .card-footer {
                    margin-top: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 24px;
                    border-top: 1px solid #f1f5f9;
                }

                .cta-text {
                    font-family: var(--font-base);
                    font-weight: 700;
                    font-size: 14px;
                }

                .cta-arrow {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s;
                }

                .saas-module-card:hover .cta-arrow {
                    transform: translateX(4px);
                }
            `}</style>
        </Link>
    )
}
