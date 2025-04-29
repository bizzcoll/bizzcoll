'use client'

import { useUser } from '@/app/context/UserContext'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function Header() {
  const { user, fullName } = useUser()
  const [isMobile, setIsMobile] = useState(false)
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace('/auth')
  }

  const handleLogoClick = () => {
    if (user) {
      router.push('/dashboard-redirect')
    } else {
      router.push('/auth')
    }
  }
  

  return (
    <header className="px-6 py-2 bg-white/40 backdrop-blur-lg shadow-md rounded-b-2xl flex justify-between items-center border-b border-blue-100 h-[72px] transition-all duration-300">

      {/* ימין – טקסט + כפתור */}
      <div className="flex items-center gap-4 text-sm text-gray-700">
        {user ? (
          <>
            {!isMobile && (
              <span className="text-md font-semibold whitespace-nowrap flex items-center gap-2">
                <span className="text-[22px] font-extrabold tracking-tight text-gray-900">
                  <span className="text-blue-900">Bizz</span>
                  <span className="text-yellow-400">Coll</span>
                </span>
                <span className="text-gray-400 font-light">|</span>
                <span>שלום,</span>
                <span className="text-blue-800">{fullName}</span>
              </span>
            )}
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleSignOut}
              className={`px-4 py-1.5 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-sm ${
                hovered ? 'bg-red-500 hover:shadow-md' : 'bg-green-500 hover:shadow-md'
              } text-white text-sm`}
            >
              <LogOut size={18} />
              {hovered ? 'התנתק' : 'מחובר'}
            </button>
          </>
        ) : (
          <span className="text-gray-400 italic">לא מחובר</span>
        )}
      </div>

      {/* שמאל – לוגו */}
      <div
        className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={handleLogoClick}
      >
        <Image
          src="/logo.png"
          alt="BizzColl Logo"
          width={isMobile ? 44 : 70}
          height={isMobile ? 44 : 70}
          className=""
        />
      </div>
    </header>
  )
}
