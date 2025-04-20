'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'react-hot-toast'

export default function VerifyEmailPage() {
  const router = useRouter()

  useEffect(() => {
    const logoutAndRedirect = async () => {
      await supabase.auth.signOut()
      toast.success('המייל אומת בהצלחה, עכשיו אפשר להתחבר ✨', {
        duration: 4000, // זמן ארוך יותר
        position: 'top-center', // אפשר גם 'bottom-center' אם אתה מעדיף
      })

      setTimeout(() => {
        router.replace('/auth')
      }, 4500) // זמן המתנה מתאים לאורך ההודעה
    }

    logoutAndRedirect()
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700">מאמת את המשתמש... ⏳</p>
      </div>
    </main>
  )
}
