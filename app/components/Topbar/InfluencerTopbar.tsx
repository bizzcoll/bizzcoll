// ✅ קובץ: /components/Topbar/InfluencerTopbar.tsx - תומך מובייל ודסקטופ

'use client'

import { useUser } from '@/app/context/UserContext'
import { useEffect, useState } from 'react'

export default function InfluencerTopbar() {
  const { fullName } = useUser()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-4 py-3 shadow-md backdrop-blur-md bg-opacity-40">
      <h1 className="text-sm md:text-xl font-semibold tracking-wide text-right">
        🎥 {isMobile ? 'יוצר תוכן' : `BizzColl - יוצר תוכן${fullName ? ` | ${fullName}` : ''}`}
      </h1>
    </header>
  )
}
