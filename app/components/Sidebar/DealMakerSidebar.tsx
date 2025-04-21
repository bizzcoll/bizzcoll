'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function DealMakerSidebar() {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    clsx(
      'px-3 py-2 rounded-md transition-all duration-300 ease-in-out text-right',
      {
        'bg-gray-200/30 backdrop-blur-md border shadow-inner shadow-green-100/40 ring-1 ring-green-200/50 text-green-900 font-semibold scale-[1.10]':
          pathname === href,
        'text-green-700 hover:text-black hover:bg-green-50 hover:font-semibold hover:scale-[1.10]':
          pathname !== href,
      }
    )

  return (
    <aside className="bg-green-100/40 backdrop-blur-sm w-64 p-6 space-y-6 shadow-inner">
      <h2 className="text-xl font-bold text-green-700 text-right">ניהול עסק 💼</h2>
      <nav className="flex flex-col items-end space-y-2">
        <Link href="/dashboard/deal-maker" className={linkClass('/dashboard/deal-maker')}>🏠 ראשי</Link>
        <Link href="/dashboard/deal-maker/my-deals" className={linkClass('/dashboard/deal-maker/my-deals')}>📦 הדילים שלי</Link>
        <Link href="/dashboard/deal-maker/new" className={linkClass('/dashboard/deal-maker/new')}>➕ פרסם דיל</Link>
        <Link href="/dashboard/deal-maker/profile" className={linkClass('/dashboard/deal-maker/profile')}>👤 פרופיל</Link>
      </nav>
    </aside>
  )
}
