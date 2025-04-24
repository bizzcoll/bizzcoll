// ✅ קובץ: /components/Sidebar/InfluencerSidebar.tsx - רספונסיבי

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function InfluencerSidebar({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    clsx(
      'px-4 py-2 w-full rounded-lg text-right transition-all duration-300 ease-in-out tracking-wide font-medium',
      {
        'bg-white/10 text-blue-900 scale-[1.10] font-semibold border border-gray-400/40 shadow-md shadow-blue-200/30':
          pathname === href,
        'text-blue-700 hover:text-black hover:bg-blue-50/50 hover:scale-[1.10]':
          pathname !== href,
      }
    )

  const content = (
    <>
      {!compact && <h2 className="text-2xl font-semibold text-blue-800 text-right tracking-wide mb-4">🎥 יוצר תוכן</h2>}
      <nav className="flex flex-col items-end space-y-2 text-sm">
        <Link href="/dashboard/influencer/deals" className={linkClass('/dashboard/influencer/deals')}>📦 מצא דילים</Link>
        <Link href="/dashboard/influencer/applied" className={linkClass('/dashboard/influencer/applied')}>💡 ההגשות שלך</Link>
        <Link href="/dashboard/influencer/profile" className={linkClass('/dashboard/influencer/profile')}>👤 פרופיל</Link>
      </nav>
    </>
  )

  return compact ? content : (
    <aside className="bg-gradient-to-b from-blue-100/40 to-blue-50/30 backdrop-blur-sm w-64 p-6 space-y-6 shadow-inner hidden md:block h-full">
      <div className="flex flex-col h-full justify-start">
        {content}
      </div>
    </aside>
  )
}
