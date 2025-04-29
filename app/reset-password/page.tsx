'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'react-hot-toast'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) setIsAuthenticated(true)
    }
    checkSession()
  }, [])

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('הסיסמאות לא תואמות')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      toast.error('שגיאה באיפוס הסיסמה')
      console.error('Reset error:', error.message)
    } else {
      toast.success('הסיסמה עודכנה בהצלחה!')
      router.push('/auth')
    }
    setLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <main className="flex justify-center items-center h-screen text-center">
        <p className="text-gray-600 text-sm">אנא התחבר מחדש דרך הקישור שנשלח אליך למייל.</p>
      </main>
    )
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-right" dir="rtl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">איפוס סיסמה</h1>

        <label className="block mb-2 text-sm">סיסמה חדשה:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2 text-sm">אימות סיסמה:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'שולח...' : 'אפס סיסמה'}
        </button>
      </div>
    </main>
  )
}
