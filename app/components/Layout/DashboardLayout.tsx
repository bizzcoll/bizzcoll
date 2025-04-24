'use client'

import { useRoleGuard } from '@/lib/auth/checkRoleRedirect'
import MobileDrawer from '@/app/components/Sidebar/MobileDrawer'
import DealMakerSidebar from '@/app/components/Sidebar/DealMakerSidebar'
import InfluencerSidebar from '@/app/components/Sidebar/InfluencerSidebar'
import AdminSidebar from '@/app/components/Sidebar/AdminViewSwitcherSidebar'
import RoleTopbar from '@/app/components/Topbar/RoleTopbar' // ✅ ייבוא חדש

type Role = 'ADMIN' | 'DEAL_MAKER' | 'INFLUENCER'

export default function DashboardLayout({
  children,
  role,
}: {
  children: React.ReactNode
  role: Role
}) {
  const isAuthorized = useRoleGuard(role)
  if (!isAuthorized) return null

  const Sidebar =
    role === 'ADMIN'
      ? AdminSidebar
      : role === 'INFLUENCER'
      ? InfluencerSidebar
      : DealMakerSidebar

  return (
    <div className="flex flex-col md:flex-row-reverse h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <div className="block md:hidden">
        <MobileDrawer role={role} />
      </div>

      <div className="flex-1 flex flex-col">
        <RoleTopbar role={role} /> {/* ✅ שימוש ב-Topbar הכללי */}
        <main className="p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
