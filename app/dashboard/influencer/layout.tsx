'use client'

import { useRoleGuard } from '@/lib/auth/checkRoleRedirect'
import InfluencerSidebar from '@/app/components/Sidebar/InfluencerSidebar'
import InfluencerTopbar from '@/app/components/Topbar/InfluencerTopbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const checked = useRoleGuard('INFLUENCER')

  if (!checked) return null // לא מציג כלום עד שתאומת הרשאה

  return (
    <div className="flex flex-row-reverse h-screen">
      <InfluencerSidebar />
      <div className="flex-1 flex flex-col">
        <InfluencerTopbar />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
