'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Lock } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { ModuleItem } from '@fluenix/shared'

interface ModuleCardProps {
    moduleData: ModuleItem
    index: number
}

export function ModuleCard({ moduleData, index }: ModuleCardProps) {
    const { available, href, color, icon, title, description, image } = moduleData
    if (!available) {
        return (
            <div 
                className="saas-module-card disabled"
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                data-aos-once="true"
            >
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
                        overflow: hidden;
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
                    <Lock size={32} />
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
            <div 
                className="saas-module-card" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                data-aos-once="true"
            >
                
                <div className="asymmetric-wrapper">
                    {/* The colored background block that is offset to bottom-left */}
                    <div className="colored-backdrop" style={{ backgroundColor: `${color}30` }} />
                    
                    {/* The image offset to top-right */}
                    {image && (
                        <div className="card-image-container">
                            <Image 
                                src={image} 
                                alt={title} 
                                className="card-image"
                                fill
                                sizes="(max-width: 768px) 100vw, 350px"
                                style={{ objectFit: 'cover', objectPosition: moduleData.imagePosition || 'center' }}
                            />
                        </div>
                    )}
                    
                    <div className="card-content">
                        <h3 className="module-title">{title}</h3>
                        <p className="module-desc">{description}</p>
                    </div>
                </div>
                
                <div 
                    className="premium-cta" 
                    style={{ 
                        background: color, 
                        color: '#ffffff',
                        boxShadow: `0 4px 10px -2px ${color}60`
                    }}
                >
                    <span className="cta-text">ENTER MODULE</span>
                </div>
            </div>

            <style jsx>{`
                .card-link, .card-link:focus, .card-link:active {
                    outline: none !important;
                    box-shadow: none !important;
                    -webkit-tap-highlight-color: transparent;
                }

                .saas-module-card {
                    background: transparent;
                    border: none;
                    position: relative;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    padding-bottom: 16px;
                }

                .saas-module-card:hover {
                    transform: translateY(-6px);
                }

                .asymmetric-wrapper {
                    position: relative;
                    width: 100%;
                    margin-bottom: 8px; /* Reduced margin to bring button closer */
                }

                .colored-backdrop {
                    position: absolute;
                    top: 24px; 
                    left: 0;
                    right: 32px; 
                    bottom: 0px; /* Fully extend to the bottom of the card content area */
                    border-radius: 12px;
                    z-index: 1;
                    transition: all 0.4s ease;
                }

                .saas-module-card:hover .colored-backdrop {
                    transform: scale(1.02);
                }

                .card-image-container {
                    position: relative;
                    z-index: 2;
                    width: calc(100% - 32px);
                    margin-left: auto;
                    aspect-ratio: 1.15;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.12);
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .saas-module-card:hover .card-image-container {
                    transform: scale(1.04) rotate(1deg);
                }

                .card-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-content {
                    position: relative;
                    z-index: 2;
                    width: calc(100% - 32px);
                    padding: 16px 16px 16px 16px; /* Restored more breathing room at the bottom */
                    text-align: center;
                }

                .module-title {
                    font-family: var(--font-base);
                    font-size: 20px;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 8px;
                    letter-spacing: -0.3px;
                }

                .module-desc {
                    font-family: var(--font-base);
                    font-size: 13px;
                    color: #64748b;
                    line-height: 1.5;
                    font-weight: 500;
                    max-width: 280px;
                    margin: 0 auto;
                    
                    /* Clamp to 2 lines to prevent the box from stretching too tall */
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .premium-cta {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px 24px;
                    border-radius: 8px;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    margin-top: 8px;
                    
                    /* Align to the bottom right of the background block */
                    align-self: flex-end;
                    margin-right: 32px;
                }

                .cta-text {
                    font-family: var(--font-base);
                    font-weight: 800;
                    font-size: 13px;
                    letter-spacing: 1px;
                }

                .saas-module-card:hover .premium-cta {
                    transform: translateY(-2px);
                    filter: brightness(1.1);
                    box-shadow: 0 8px 16px -2px rgba(0,0,0,0.2) !important;
                }
            `}</style>
        </Link>
    )
}
