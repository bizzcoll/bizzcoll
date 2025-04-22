// app/lib/auth/checkRoleRedirect.ts

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'

type Role = 'INFLUENCER' | 'DEAL_MAKER' | 'ADMIN'

export function useRoleGuard(requiredRole: Role) {
  const { role } = useUser()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!role) return // עדיין לא נטען
    if (role === requiredRole) {
      setChecked(true)
    } else {
      router.replace('/unauthorized')
    }
  }, [role, requiredRole, router])

  return checked
}
