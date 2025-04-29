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
      setChecked(true)
    }
  }, [user, router])

  if (!checked && !user) {
    return null
  }

  return (
    <main className="flex flex-col md:flex-row justify-center items-center min-h-screen p-8 gap-20 bg-gradient-to-br from-blue-100 via-white to-blue-200" dir="rtl">

      {/* טור ימין - כותרת */}
      <div className="text-center md:text-right md:max-w-md md:self-center animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-light tracking-wide text-blue-900 leading-tight mb-4 font-sans">
          <span className="block font-extrabold tracking-tight text-blue-900">
            BizzColl🔥
          </span>
          מי צריך סוכן?
        </h1>
        <p className="mt-6 text-gray-600 text-lg hidden md:block font-light tracking-wide">
          הצטרף למהפכת החיבורים הישירים בין עסקים ליוצרים 
        </p>
      </div>

      {/* טור שמאל - טופס */}
      <div className="flex justify-center items-center w-full max-w-md animate-fadeIn">
        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-2xl border border-blue-200 shadow-lg w-full">
          <AuthForm />
        </div>
      </div>

    </main>
  )
}
