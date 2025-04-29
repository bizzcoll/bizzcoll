'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { X } from 'lucide-react'

type Props = {
  deal: {
    id: string
    title: string | null
    description: string | null
    min_budget?: number | null
    max_budget?: number | null
    media_type: string | null
    closing_date?: string | null
  }
  onClose: () => void
  onSave: (updatedDeal: any) => void
}

export default function EditDealModal({ deal, onClose, onSave }: Props) {
  const [title, setTitle] = useState(deal.title || '')
  const [description, setDescription] = useState(deal.description || '')
  const [minBudget, setMinBudget] = useState<number | ''>(deal.min_budget || '')
  const [maxBudget, setMaxBudget] = useState<number | ''>(deal.max_budget || '')
  const [mediaType, setMediaType] = useState(deal.media_type || '')
  const [customMediaType, setCustomMediaType] = useState('') // 👈 שדה חופשי אם בוחרים "אחר"
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/deals/${deal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          min_budget: minBudget,
          max_budget: maxBudget,
          media_type: mediaType === 'other' ? customMediaType : mediaType, // 👈 שימוש באחר אם צריך
        }),
      })

      if (res.ok) {
        const updated = await res.json()
        onSave(updated)
      } else {
        toast.error('עדכון נכשל ❌')
      }
    } catch (error) {
      toast.error('שגיאת שרת ❌')
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative space-y-4">
        <button onClick={onClose} className="absolute top-3 left-3 text-gray-500 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-green-700 text-center">✏️ עריכת דיל</h2>

        {/* כותרת */}
        <div className="flex flex-col gap-2 text-right">
          <label>כותרת</label>
          <input
            type="text"
            className="border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* תיאור */}
        <div className="flex flex-col gap-2 text-right">
          <label>תיאור</label>
          <textarea
            className="border rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* תקציבים */}
        <div className="flex gap-2 text-right">
          <div className="flex flex-col w-full">
            <label>תקציב מינימלי</label>
            <input
              type="number"
              className="border rounded p-2"
              value={minBudget}
              onChange={(e) => setMinBudget(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>תקציב מקסימלי</label>
            <input
              type="number"
              className="border rounded p-2"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
            />
          </div>
        </div>

        {/* סוג מדיה */}
        <div className="flex flex-col gap-2 text-right">
          <label>סוג מדיה</label>
          <select
            className="border rounded p-2"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value="">בחר סוג</option>
            <option value="video">וידאו 🎥</option>
            <option value="image">תמונה 🖼️</option>
            <option value="other">אחר ✏️</option>
          </select>
        </div>

        {/* שדה מותאם אם נבחר "אחר" */}
        {mediaType === 'other' && (
          <div className="flex flex-col gap-2 text-right">
            <label>הזן סוג מדיה מותאם</label>
            <input
              type="text"
              className="border rounded p-2"
              placeholder="לדוגמה: בלוג, פוסט, פודקאסט..."
              value={customMediaType}
              onChange={(e) => setCustomMediaType(e.target.value)}
            />
          </div>
        )}

        {/* כפתור שמירה */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 w-full mt-4"
        >
          {loading ? 'שומר...' : 'שמור שינויים'}
        </button>
      </div>
    </div>
  )
}
