'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  businessId: string
}

export default function NewDealForm({ businessId }: Props) {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState<number | ''>('')
  const [mediaType, setMediaType] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          title,
          description,
          budget: budget === '' ? undefined : budget,
          media_type: mediaType,
        }),
      })
      if (!res.ok) throw await res.json()
      router.push('/dashboard/deal-maker/my-deals')
    } catch (err: any) {
      setError(err.error || 'שגיאה ביצירת הדיל')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/50 backdrop-blur-md p-6 rounded-xl shadow border border-green-200 space-y-4"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-green-700 mb-4">צור דיל חדש ✨</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block mb-1 font-medium">כותרת *</label>
        <input
          type="text"
          required
          placeholder="הכנס כותרת מושכת..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-right"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">תיאור</label>
        <textarea
          placeholder="תאר את הדיל שלך בפירוט..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-right"
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">תקציב (₪)</label>
        <input
          type="number"
          min="0"
          placeholder="לדוג׳ 1500"
          value={budget}
          onChange={e => setBudget(e.target.value === '' ? '' : Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md text-right"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">סוג מדיה</label>
        <select
          value={mediaType}
          onChange={e => setMediaType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-right"
        >
          <option value="">בחר סוג מדיה</option>
          <option value="video">וידאו</option>
          <option value="image">תמונה</option>
          <option value="article">מאמר</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        {loading ? 'שומר...' : 'צור דיל'}
      </button>
    </form>
  )
}
