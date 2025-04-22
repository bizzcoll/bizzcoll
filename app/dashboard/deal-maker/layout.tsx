'use client'

import { useRoleGuard } from '@/lib/auth/checkRoleRedirect'
import DealMakerSidebar from '@/app/components/Sidebar/DealMakerSidebar'
import DealMakerTopbar from '@/app/components/Topbar/DealMakerTopbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const checked = useRoleGuard('DEAL_MAKER')

  if (!checked) return null

  return (
    <div className="flex flex-row-reverse h-screen">
      <DealMakerSidebar />
      <div className="flex-1 flex flex-col">
        <DealMakerTopbar />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
