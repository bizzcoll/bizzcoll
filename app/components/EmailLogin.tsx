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

    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.email_confirmed_at) {
      toast.error('יש לאשר את כתובת האימייל לפני התחברות', { position: 'top-center' })
      return
    }

    const role = user?.user_metadata?.role

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
