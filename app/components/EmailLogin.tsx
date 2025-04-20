'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'react-hot-toast'

export default function EmailLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const role = user?.user_metadata?.role

    if (!user?.email_confirmed_at) {
      toast.error('יש לאשר את כתובת האימייל לפני התחברות')
      return
    }

    if (role === 'influencer') {
      router.push('/dashboard/influencer')
    } else if (role === 'deal_maker') {
      router.push('/dashboard/deal-maker')
    } else {
      router.push('/dashboard') // ברירת מחדל אם אין role
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3">
      <input
        type="email"
        placeholder="אימייל"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="סיסמה"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
        התחבר
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}
