// ✅ קובץ: /components/Topbar/DealMakerTopbar.tsx - תומך מובייל ודסקטופ

'use client'

import { useUser } from '@/app/context/UserContext'
import { useEffect, useState } from 'react'

export default function DealMakerTopbar() {
  const { fullName } = useUser()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-4 py-3 shadow-md backdrop-blur-md bg-opacity-40">
      <h1 className="text-sm md:text-xl font-semibold tracking-wide text-right">
        💼 {isMobile ? 'בעל עסק' : `BizzColl - בעל עסק${fullName ? ` | ${fullName}` : ''}`}
      </h1>
    </header>
  )
}
