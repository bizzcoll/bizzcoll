'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DealMakerProfilePage() {
  const [fullName, setFullName] = useState<string>('')

  useEffect(() => {
    const fetchName = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const name = session?.user?.user_metadata?.full_name || 'שלך'
      setFullName(name)
    }

    fetchName()
  }, [])

  return (
    <main className="p-6 space-y-4 text-right">
      <h1
        className="text-3xl font-bold text-green-600 tracking-wide text-right"
        dir="rtl"
      >
        הפרופיל של <span dir="ltr" className="inline-block">{fullName}</span> 👤
      </h1>
      <p className="text-gray-700">נהל את פרטי העסק שלך ובצע התאמות לחשבון.</p>

      <div className="bg-white/50 backdrop-blur-md p-4 rounded-xl shadow border border-green-200">
        <h2 className="text-lg font-semibold text-green-700">📄 פרטי העסק:</h2>
        <ul className="text-sm mt-2 text-gray-700 space-y-1">
          <li>🏷️ שם העסק: חנות פרחים תל אביב</li>
          <li>📍 מיקום: תל אביב</li>
          <li>📧 אימייל: flower@store.co.il</li>
        </ul>
      </div>
    </main>
  )
}
