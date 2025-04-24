'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'
import AuthForm from '@/app/components/AuthForm'

export default function AuthPage() {
  const { user } = useUser()
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (user) {
      router.replace('/dashboard-redirect')
    } else {
      setChecked(true) // ה־user נטען והוא לא מחובר
    }
  }, [user, router])

  if (!checked && !user) {
    // עדיין טוען את המשתמש, לא מציג כלום
    return null
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 gap-6">
      <AuthForm />
    </main>
  )
}
