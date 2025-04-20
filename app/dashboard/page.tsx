'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'

export default function DashboardRedirect() {
  const { role } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (role === 'INFLUENCER') {
      router.replace('/dashboard/influencer')
    } else if (role === 'DEAL_MAKER') {
      router.replace('/dashboard/deal-maker')
    }
  }, [role, router])

  return (
    <main className="p-10 text-center">
      <h1 className="text-lg text-gray-600">טוען את הדשבורד שלך...</h1>
    </main>
  )
}
