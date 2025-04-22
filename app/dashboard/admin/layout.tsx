'use client'

import { useRoleGuard } from '@/lib/auth/checkRoleRedirect'
import AdminSidebar from '@/app/components/Sidebar/AdminViewSwitcherSidebar'
import AdminTopbar from '@/app/components/Topbar/AdminTopbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const isAuthorized = useRoleGuard('ADMIN')

  if (!isAuthorized) return null

  return (
    <div className="flex flex-row-reverse h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
