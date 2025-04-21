'use client'

import { useUser } from '@/app/context/UserContext'
import LogoutButton from '@/app/components/LogoutButton'
import Image from 'next/image'

export default function Header() {
  const { user, fullName } = useUser()

  return (
    <header className="px-6 py-3 bg-white/30 backdrop-blur-lg shadow-lg rounded-b-xl flex justify-between items-center border-b border-white/20">
      {/* ימין - מידע על המשתמש */}
      <div className="flex items-center gap-4 text-sm text-gray-800">
        {user ? (
          <>
            <span className="text-md font-medium tracking-tight">
              <span className="font-semibold"> {fullName}</span>
            </span>
            <LogoutButton />
          </>
        ) : (
          <span className="text-gray-500">לא מחובר</span>
        )}
      </div>

      {/* שמאל - לוגו וטקסט מותג */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="BizzColl Logo"
          width={48}
          height={48}
          className="rounded-full shadow-sm border border-white/40"
        />
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide uppercase">
          Bizz<span className="text-blue-600">Co</span><span className="text-yellow-600">ll</span>
        </h1>
      </div>
    </header>
  )
}
