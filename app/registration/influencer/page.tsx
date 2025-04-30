'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function InfluencerRegistrationPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  console.log(email)

  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [links, setLinks] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    const res = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fullName, bio, links, role: 'INFLUENCER' }),
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
      <h1 className="text-3xl font-bold text-blue-700">טופס הרשמה ליוצרי תוכן</h1>
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="שם מלא"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <textarea
        className="w-full border px-4 py-2 rounded"
        placeholder="תיאור קצר עליך"
        rows={4}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="קישורים (אינסטגרם, יוטיוב וכו')"
        value={links}
        onChange={(e) => setLinks(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
        disabled={submitting}
      >
        שלח טופס
      </button>
    </main>
  )
}