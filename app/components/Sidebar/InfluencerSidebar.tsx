'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function InfluencerSidebar() {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    clsx(
      'px-3 py-2 rounded-md transition-all duration-300 ease-in-out text-right',
      {
        'bg-gray-400/20 backdrop-blur-md border shadow-inner shadow-blue-100/40 ring-1 ring-blue-200/50 text-blue-900 font-semibold scale-[1.10]':
          pathname === href,
        'text-blue-700 font-normal hover:text-black hover:bg-blue-50 hover:font-semibold hover:scale-[1.10]':
          pathname !== href,
      }
    )

  return (
    <aside className="bg-blue-100/40 backdrop-blur-sm w-64 p-6 space-y-6 shadow-inner">
      <h2 className="text-xl font-bold text-blue-700 text-right">יוצר תוכן 🎥</h2>
      <nav className="flex flex-col items-end space-y-2">
        <Link href="/dashboard/influencer" className={linkClass('/dashboard/influencer')}>🏠 ראשי</Link>
        <Link href="/dashboard/influencer/deals" className={linkClass('/dashboard/influencer/deals')}>📦 מצא דילים</Link>
        <Link href="/dashboard/influencer/applied" className={linkClass('/dashboard/influencer/applied')}>💡 ההגשות שלך</Link>
        <Link href="/dashboard/influencer/profile" className={linkClass('/dashboard/influencer/profile')}>👤 פרופיל</Link>
      </nav>
    </aside>
  )
}
