'use client'

import React from 'react'
import DealMakerSidebar from '@/app/components/Sidebar/DealMakerSidebar'
import DealMakerTopbar from '@/app/components/Topbar/DealMakerTopbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row-reverse h-screen">
      {/* Sidebar מימין */}
      <DealMakerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DealMakerTopbar />
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
