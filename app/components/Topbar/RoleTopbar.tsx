'use client'

import { useUser } from '@/app/context/UserContext'
import { useEffect, useState } from 'react'

export default function RoleTopbar({ role }: { role: 'ADMIN' | 'DEAL_MAKER' | 'INFLUENCER' }) {
  const { fullName } = useUser()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const roleConfig = {
    ADMIN: {
      icon: '🛡️',
      label: 'מנהל מערכת',
      gradient: 'from-purple-500 via-purple-600 to-purple-800',
    },
    DEAL_MAKER: {
      icon: '💼',
      label: 'בעל עסק',
      gradient: 'from-green-500 via-green-600 to-green-700',
    },
    INFLUENCER: {
      icon: '🎥',
      label: 'יוצר תוכן',
      gradient: 'from-blue-500 via-blue-600 to-blue-700',
    },
  }

  const { icon, label, gradient } = roleConfig[role]

  return (
    <header className={`bg-gradient-to-r ${gradient} text-white px-4 py-3 shadow-md backdrop-blur-md bg-opacity-40`}>
      <h1 className="text-sm md:text-xl font-semibold tracking-wide text-right">
        {icon} {isMobile ? label : `BizzColl - ${label}${fullName ? ` | ${fullName}` : ''}`}
      </h1>
    </header>
  )
}
