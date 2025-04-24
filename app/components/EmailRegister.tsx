'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function EmailRegister() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'INFLUENCER' | 'DEAL_MAKER'>('INFLUENCER')
  const [fullName, setFullName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, full_name: fullName }),
      })

      const data = await res.json()
      setIsSubmitting(false)

      if (res.status === 409) {
        toast.error('האימייל הזה כבר קיים במערכת. נסה להתחבר.', { position: 'top-center' })
        return
      }

      if (!res.ok) {
        toast.error(data.error || 'אירעה שגיאה לא צפויה 😵', { position: 'top-center' })
        return
      }

      toast.success('נרשמת בהצלחה! נא לבדוק את האימייל ולאשר לפני התחברות. ✉️', { position: 'top-center' })
    } catch (err: any) {
      console.error('❌ Network error:', err)
      setIsSubmitting(false)
      toast.error('שגיאת רשת – נסה שוב מאוחר יותר.', { position: 'top-center' })
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 text-right">
      <input
        type="text"
        placeholder="שם מלא"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap justify-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => setRole('INFLUENCER')}
          className={`px-3 py-2 rounded border ${role === 'INFLUENCER' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          יוצר תוכן
        </button>
        <button
          type="button"
          onClick={() => setRole('DEAL_MAKER')}
          className={`px-3 py-2 rounded border ${role === 'DEAL_MAKER' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
        >
          בעל עסק
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
      >
        {isSubmitting ? 'נרשם...' : 'הרשמה'}
      </button>
    </form>
  )
}
