'use client'

import { ReactNode, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/layout/Navbar'
import { LevelProvider } from '@/context/LevelContext'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <LevelProvider>
            <div className="dashboard-root">
                <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
                
                <div className="main-viewport">
                    <Navbar onMenuClick={() => setSidebarOpen(true)} />
                    <main className="content-area">
                        {children}
                    </main>
                </div>

                <style jsx>{`
                    .dashboard-root {
                        display: flex;
                        min-height: 100vh;
                        background-color: #f8fafc;
                    }

                    .main-viewport {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        min-width: 0;
                    }

                    .content-area {
                        flex: 1;
                        padding: 0;
                        overflow-x: hidden;
                    }
                `}</style>
            </div>
        </LevelProvider>
    )
}
