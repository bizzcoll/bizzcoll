'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function AdminViewSwitcherSidebar() {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    clsx(
      'px-4 py-2 w-full rounded-lg text-right transition-all duration-300 ease-in-out tracking-wide font-medium',
      {
        'bg-white/10 text-purple-900 scale-[1.10] font-semibold border border-gray-400/40 shadow-md shadow-purple-200/30':
          pathname === href,
        'text-purple-700 hover:text-black hover:bg-purple-50/50 hover:scale-[1.10]':
          pathname !== href,
      }
    )

  return (
    <aside className="bg-gradient-to-b from-purple-100/40 to-purple-50/30 backdrop-blur-sm w-64 p-6 space-y-6 shadow-inner hidden md:block">
      <h2 className="text-2xl font-semibold text-purple-800 text-right tracking-wide">🛠️ צפייה כאדמין</h2>
      <nav className="flex flex-col items-end space-y-2 text-sm">
        <Link href="/dashboard/admin" className={linkClass('/dashboard/admin')}>
          🔐 Admin Dashboard
        </Link>
        <Link href="/dashboard/deal-maker/my-deals" className={linkClass('/dashboard/deal-maker/my-deals')}>
          💼 צפייה כ־Deal Maker
        </Link>
        <Link href="/dashboard/influencer/deals" className={linkClass('/dashboard/influencer/deals')}>
          🌟 צפייה כ־Influencer
        </Link>
      </nav>
    </aside>
  )
}
