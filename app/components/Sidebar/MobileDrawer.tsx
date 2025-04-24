'use client'

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import DealMakerSidebar from '@/app/components/Sidebar/DealMakerSidebar'
import AdminViewSwitcherSidebar from '@/app/components/Sidebar/AdminViewSwitcherSidebar'
import InfluencerSidebar from '@/app/components/Sidebar/InfluencerSidebar'
import useIsMobile from '@/hook/useIsMobile'

export default function MobileDrawer({ role }: { role: 'ADMIN' | 'INFLUENCER' | 'DEAL_MAKER' }) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const SidebarComponent =
    role === 'DEAL_MAKER'
      ? DealMakerSidebar
      : role === 'ADMIN'
      ? AdminViewSwitcherSidebar
      : role === 'INFLUENCER'
      ? InfluencerSidebar
      : null

  if (!isMobile || !SidebarComponent) return null

  return (
    <Sheet>
      <SheetTrigger className="md:hidden text-gray-700 hover:text-black">
        <Menu className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[260px] p-4 shadow-lg h-full">
        <SheetTitle className="sr-only">תפריט צד למובייל</SheetTitle>
        <SheetDescription className="sr-only">בחר באפשרות מתוך התפריט הצדדי</SheetDescription>
        <SidebarComponent compact />
      </SheetContent>
    </Sheet>
  )
}
