// ✅ קובץ: /components/Sidebar/DealMakerSidebar.tsx - רספונסיבי

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function DealMakerSidebar({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    clsx(
      'px-4 py-2 w-full rounded-lg text-right transition-all duration-300 ease-in-out tracking-wide font-medium',
      {
        'bg-white/10 text-green-900 scale-[1.10] font-semibold border border-gray-400/40 shadow-md shadow-green-200/30':
          pathname === href,
        'text-green-700 hover:text-black hover:bg-green-50/50 hover:scale-[1.10]':
          pathname !== href,
      }
    )

  const content = (
    <>
      {!compact && <h2 className="text-2xl font-semibold text-green-800 text-right tracking-wide mb-4">💼 ניהול עסק</h2>}
      <nav className="flex flex-col items-end space-y-2 text-sm">
        <Link href="/dashboard/deal-maker/my-deals" className={linkClass('/dashboard/deal-maker/my-deals')}>📦 הדילים שלי</Link>
        <Link href="/dashboard/deal-maker/new" className={linkClass('/dashboard/deal-maker/new')}>➕ פרסם דיל</Link>
        <Link href="/dashboard/deal-maker/profile" className={linkClass('/dashboard/deal-maker/profile')}>👤 פרופיל</Link>
      </nav>
    </>
  )

  return compact ? content : (
    <aside className="bg-gradient-to-b from-green-100/40 to-green-50/30 backdrop-blur-sm w-64 p-6 space-y-6 shadow-inner hidden md:block h-full">
      <div className="flex flex-col h-full justify-start">
        {content}
      </div>
    </aside>
  )
}
