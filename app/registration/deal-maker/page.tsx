'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function DealMakerRegistrationPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState('')
  const [website, setWebsite] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    const res = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, businessName, industry, website, role: 'DEAL_MAKER' }),
    })

    if (res.ok) {
      toast.success('הטופס נשלח בהצלחה!')
    } else {
      toast.error('אירעה שגיאה בשליחה')
    }
    setSubmitting(false)
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4 text-right">
      <h1 className="text-3xl font-bold text-purple-700">טופס הרשמה לעסקים</h1>
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="שם העסק"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="תחום פעילות"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
      />
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="אתר אינטרנט / לינק לפרופיל עסקי"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <button
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        onClick={handleSubmit}
        disabled={submitting}
      >
        שלח טופס
      </button>
    </main>
  )
}
