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

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message)
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user
    const role = user?.user_metadata?.role

    // ✅ בדיקת אימות מייל רק ב־PRODUCTION, ו־ADMIN תמיד עובר
    if (process.env.NODE_ENV === 'production') {
      if (!user?.email_confirmed_at && role !== 'ADMIN') {
        toast.error('יש לאשר את כתובת האימייל לפני התחברות', { position: 'top-center' })
        return
      }
    }

    if (role === 'INFLUENCER') {
      router.push('/dashboard/influencer/deals')
    } else if (role === 'DEAL_MAKER') {
      router.push('/dashboard/deal-maker/my-deals')
    } else if (role === 'ADMIN') {
      router.push('/dashboard/admin')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 text-right">
    <input
      type="email"
      placeholder="Email"
      className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button
      type="submit"
      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded-full font-semibold text-sm transition shadow-sm"
    >
      התחבר
    </button>
    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
  </form>
  
  )
}
