'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Sparkles, Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function EmailRegister() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'INFLUENCER' | 'DEAL_MAKER'>('INFLUENCER')
  const [fullName, setFullName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

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

      toast.success('נרשמת בהצלחה! המשך למילוי טופס הרישום ✍️', { position: 'top-center' })

      // 🔁 מעביר לדף מילוי טופס לפי role
     // 🔁 מעביר לדף מילוי טופס לפי role (עם הנתיב שלך!)
      if (role === 'INFLUENCER') {
        router.push(`/registration/influencer?email=${encodeURIComponent(email)}`)
      } else {
        router.push(`/registration/deal-maker?email=${encodeURIComponent(email)}`)
      }
    


    } catch (err: any) {
      console.error('❌ Network error:', err)
      setIsSubmitting(false)
      toast.error('שגיאת רשת – נסה שוב מאוחר יותר.', { position: 'top-center' })
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-6 text-right">
      <input
        type="text"
        placeholder="שם מלא"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
      />

      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <button
          type="button"
          onClick={() => setRole('INFLUENCER')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform ${
            role === 'INFLUENCER'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105 ring-2 ring-blue-300'
              : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:scale-105'
          }`}
        >
          <Sparkles size={18} /> יוצר תוכן
        </button>

        <button
          type="button"
          onClick={() => setRole('DEAL_MAKER')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform ${
            role === 'DEAL_MAKER'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105 ring-2 ring-blue-300'
              : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 hover:shadow-md hover:border-blue-400 hover:scale-105'
          }`}
        >
          <Building2 size={18} /> בעל עסק
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-2 rounded-full font-semibold text-sm transition shadow-md"
      >
        {isSubmitting ? 'נרשם...' : 'הרשמה'}
      </button>
    </form>
  )
}
