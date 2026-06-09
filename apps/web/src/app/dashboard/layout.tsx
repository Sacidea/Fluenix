'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import { LevelProvider } from '@/context/LevelContext'
import { useSidebarStore } from '@/store/useSidebarStore'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { isOpen } = useSidebarStore()

    return (
        <LevelProvider>
            <div className="dashboard-layout">
                <Sidebar />
                <main className={`dashboard-main ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                    {children}
                </main>
            </div>
            <style jsx>{`
                .dashboard-layout {
                    display: flex;
                    min-height: 100vh;
                    width: 100%;
                }
                .dashboard-main {
                    flex: 1;
                    background: #f8fafc;
                    min-height: 100vh;
                    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .dashboard-main.sidebar-open {
                    margin-left: 280px;
                }
                
                .dashboard-main.sidebar-closed {
                    margin-left: 80px;
                }
                
                @media (max-width: 1024px) {
                    .dashboard-main.sidebar-open,
                    .dashboard-main.sidebar-closed {
                        margin-left: 0 !important;
                        padding-top: 64px !important;
                        width: 100% !important;
                    }
                }
            `}</style>
        </LevelProvider>
    )
}
