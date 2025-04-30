'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'

export default function useApprovalGuard() {
  const { approved } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (approved === false) {
      router.replace('/unauthorized?reason=approval')
    }
  }, [approved, router])
}
