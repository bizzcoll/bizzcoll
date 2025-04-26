'use client'

import { useUser } from '@/app/context/UserContext'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react' // אייקון יציאה

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

  return (
    <header className="px-4 py-1.5 bg-white/60 backdrop-blur-md shadow-md flex justify-between items-center border-b border-gray-200 h-[70px]">

      {/* ימין – BizzColl + שלום נירן */}
      <div className="flex items-center gap-3 text-sm text-gray-700">
        {user ? (
          <>
            {!isMobile && (
              <span className="text-md font-semibold whitespace-nowrap flex items-center gap-2">
                <span className="text-[20px] font-extrabold tracking-tight text-gray-900">
                  <span className="text-blue-900">Bizz</span>
                  <span className="text-yellow-400">Coll</span>
                </span>
                <span className="text-gray-400 font-light">|</span>
                <span>שלום,</span>
                <span className="text-blue-900">{fullName}</span>
              </span>
            )}
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={handleSignOut}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all duration-200 shadow-sm ${
                hovered ? 'bg-red-500 hover:shadow-md' : 'bg-green-500 hover:shadow-md'
              } text-white`}
            >
              <LogOut size={18} />
              {hovered ? 'התנתק' : 'מחובר'}
            </button>
          </>
        ) : (
          <span className="text-gray-400 italic">לא מחובר</span>
        )}
      </div>

      {/* שמאל – לוגו תמונה בלבד */}
      <div className="flex items-center">
        <Image
          src="/logo.png"
          alt="BizzColl Logo"
          width={isMobile ? 48 : 80}
          height={isMobile ? 48 : 80}
          className="rounded-xl"
        />
      </div>
    </header>
  )
}
