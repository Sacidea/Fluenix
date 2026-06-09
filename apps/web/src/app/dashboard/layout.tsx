'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import { LevelProvider } from '@/context/LevelContext'
import { useSidebarStore } from '@/store/useSidebarStore'
import { GlobalErrorBoundary } from '@/components/GlobalErrorBoundary'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { isOpen } = useSidebarStore()

    return (
        <LevelProvider>
            <div className="dashboard-layout">
                <Sidebar />
                <main className={`dashboard-main ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                    <GlobalErrorBoundary>
                        {children}
                    </GlobalErrorBoundary>
                </main>
            </div>
        </LevelProvider>
    )
}
