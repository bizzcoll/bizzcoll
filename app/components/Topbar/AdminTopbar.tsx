// ✅ קובץ: /components/Topbar/AdminTopbar.tsx - תומך מובייל ודסקטופ

'use client'

import { useUser } from '@/app/context/UserContext'
import { useEffect, useState } from 'react'

export default function AdminTopbar() {
  const { fullName } = useUser()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 text-white px-4 py-3 shadow-md backdrop-blur-md bg-opacity-40">
      <h1 className="text-sm md:text-xl font-semibold tracking-wide text-right">
        🛡️ {isMobile ? 'מנהל מערכת' : `BizzColl - מנהל מערכת${fullName ? ` | ${fullName}` : ''}`}
      </h1>
    </header>
  )
}