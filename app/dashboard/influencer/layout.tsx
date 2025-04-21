'use client'

import React from 'react'
import InfluencerSidebar from '@/app/components/Sidebar/InfluencerSidebar'
import InfluencerTopbar from '@/app/components/Topbar/InfluencerTopbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row-reverse h-screen">
      {/* Sidebar מימין */}
      <InfluencerSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <InfluencerTopbar />
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
