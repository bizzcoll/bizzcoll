'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'
import AuthForm from '@/app/components/AuthForm'
import Link from 'next/link'

export default function AuthPage() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/dashboard-redirect')
    }
  }, [user, router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 gap-6">
      <AuthForm />
    </main>
  )
}
