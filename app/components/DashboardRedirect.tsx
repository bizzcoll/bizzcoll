'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'

export default function DashboardRedirect() {
  const { role, fullName } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!role) return
    if (role === 'INFLUENCER') {
      router.replace('/dashboard/influencer/deals')
    } else if (role === 'DEAL_MAKER') {
      router.replace('/dashboard/deal-maker/my-deals')
    } else if (role === 'ADMIN') {
      router.replace('/dashboard/admin')
    } else {
      router.replace('/auth')
    }
  }, [role, router])

  return (
    <main className="p-10 text-center">
      <h1 className="text-lg text-gray-600">
        טוען את הדשבורד שלך {fullName ? `, ${fullName}` : ''}...
      </h1>
    </main>
  )
}
