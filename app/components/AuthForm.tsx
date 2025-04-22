'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import EmailLogin from './EmailLogin'
import EmailRegister from './EmailRegister'
import Image from 'next/image'


export default function AuthForm() {
  const [tab, setTab] = useState<'login' | 'register'>('login')

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:3000/dashboard' },
    })
    if (error) console.error('Google Login Error:', error.message)
  }

  return (
    <div className="bg-white px-8 py-10 rounded shadow-md w-full max-w-sm text-center">
        <Image
        src="/logo.png"
        alt="BizzColl Logo"
        width={120}
        height={60}
        className="mx-auto mb-2 rounded-full"
        />
      <h1 className="text-xl font-bold mb-4"> BizzCollברוך הבא ל־</h1>

        <div className="flex justify-center gap-4 text-sm border-b border-gray-300 mb-4">
            <button
                onClick={() => setTab('login')}
                className={`py-2 px-4 ${tab === 'login' ? 'border-b-2 border-blue-600 font-semibold text-blue-600' : 'text-gray-500'}`}
            >
                התחברות באימייל
            </button>
            <button
                onClick={() => setTab('register')}
                className={`py-2 px-4 ${tab === 'register' ? 'border-b-2 border-blue-600 font-semibold text-blue-600' : 'text-gray-500'}`}
            >
                הרשמה
            </button>
        </div>


      {tab === 'login' ? <EmailLogin /> : <EmailRegister />}
      
      <button
        onClick={signInWithGoogle}
        className="flex items-center justify-center gap-4 w-full border border-gray-300 py-2 mt-4 rounded hover:shadow-md transition"
        >
        <Image src="/google-icon.jpg" alt="Google" width={40} height={30} />
        <span className="text-sm text-gray-700 font-medium">
        Google התחברות עם 
        </span>
        </button>
    </div>
  )
}
