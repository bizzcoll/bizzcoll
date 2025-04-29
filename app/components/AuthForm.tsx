'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import EmailLogin from './EmailLogin'
import EmailRegister from './EmailRegister'
import Image from 'next/image'

export default function AuthForm() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [isMobile, setIsMobile] = useState(false)
  const [showReset, setShowReset] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:3000/dashboard' },
    })
    if (error) console.error('Google Login Error:', error.message)
  }

  const ResetPassword = () => {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')

    const handleReset = async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset-password',
      })
      if (error) {
        console.error('Reset Error:', error.message)
        setStatus('error')
      } else {
        setStatus('sent')
      }
    }

    return (
      <div className="mt-4 text-sm text-right space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="האימייל שלך"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          שלח קישור איפוס סיסמה
        </button>
        {status === 'sent' && <p className="text-green-600">נשלח קישור לאיפוס הסיסמה</p>}
        {status === 'error' && <p className="text-red-600">שגיאה בשליחת הקישור</p>}
      </div>
    )
  }

  return (
    <div className="bg-white/30 backdrop-blur-md px-4 py-6 md:px-8 md:py-10 rounded-2xl border border-blue-200 w-full max-w-sm text-center mx-auto mt-3 shadow-md">
      <Image
        src="/logo.png"
        alt="BizzColl Logo"
        width={isMobile ? 80 : 120}
        height={isMobile ? 40 : 60}
        className="mx-auto mb-2 rounded-full"
      />

      <h1 className="text-lg md:text-xl font-bold mb-4">BizzColl - P2P Platform</h1>

      <div className="flex justify-center gap-4 text-sm border-b border-gray-300 mb-4">
        <button
          onClick={() => {
            setTab('login')
            setShowReset(false)
          }}
          className={`py-2 px-4 ${tab === 'login' ? 'border-b-2 border-blue-600 font-semibold text-blue-600' : 'text-gray-500'}`}
        >
          התחברות באימייל
        </button>
        <button
          onClick={() => {
            setTab('register')
            setShowReset(false)
          }}
          className={`py-2 px-4 ${tab === 'register' ? 'border-b-2 border-blue-600 font-semibold text-blue-600' : 'text-gray-500'}`}
        >
          הרשמה
        </button>
      </div>

      {tab === 'login' && !showReset && <EmailLogin />}
      {tab === 'login' && !showReset && (
        <button
          onClick={() => setShowReset(true)}
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          שכחת סיסמה?
        </button>
      )}

      {tab === 'login' && showReset && <ResetPassword />}
      {tab === 'register' && <EmailRegister />}
    </div>
  )
}
