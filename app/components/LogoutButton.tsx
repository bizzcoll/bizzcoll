'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <div className="flex items-center gap-1">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-md hover:bg-red-500" title="מחובר" />
      <button
        onClick={handleLogout}
        className="text-gray-500 hover:text-red-600 text-sm md:text-base font-medium transition"
        title="התנתקות"
      >
        התנתקות
      </button>
    </div>
  )
}
