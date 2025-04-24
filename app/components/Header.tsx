'use client'

import { useUser } from '@/app/context/UserContext'
import LogoutButton from '@/app/components/LogoutButton'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Header() {
  const { user, fullName } = useUser()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="px-4 py-1.5 bg-white/60 backdrop-blur-md shadow-md flex justify-between items-center border-b border-gray-200 h-[70px]">
      {/* ימין – פרופיל משתמש */}
      <div className="flex items-center gap-3 text-sm text-gray-700">
        {user ? (
          <>
            {!isMobile && (
              <span className="text-md font-semibold whitespace-nowrap">
                שלום, <span className="text-blue-900">{fullName}</span>
              </span>
            )}
            <LogoutButton />
          </>
        ) : (
          <span className="text-gray-400 italic">לא מחובר</span>
        )}
      </div>

      {/* שמאל – לוגו וטקסט */}
      <div className="flex items-center gap-3">
      {!isMobile && (
          <h1 className="text-[26px] font-extrabold tracking-tight text-gray-900">
            <span className="text-blue-900">Bizz</span>
            <span className="text-yellow-400">Coll</span>
          </h1>
        )}
        <Image
          src="/logo.png"
          alt="BizzColl Logo"
          width={isMobile ? 48 : 80}
          height={isMobile ? 48 : 80}
          className="rounded-xl "
        />
      </div>
    </header>
  )
}
