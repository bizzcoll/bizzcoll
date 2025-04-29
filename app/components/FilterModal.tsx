'use client'

import { useState } from 'react'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: {
    minBudget: number | ''
    maxBudget: number | ''
    mediaType: string
    followers: string
    onlyVerified: boolean
  }) => void
}

export default function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const [minBudget, setMinBudget] = useState<number | ''>('')
  const [maxBudget, setMaxBudget] = useState<number | ''>('')
  const [mediaType, setMediaType] = useState('')
  const [followers, setFollowers] = useState('')
  const [onlyVerified, setOnlyVerified] = useState(false)

  if (!isOpen) return null

  const handleApply = () => {
    onApply({ minBudget, maxBudget, mediaType, followers, onlyVerified })
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl text-right animate-fade-in-up">
        {/* כפתור סגירה קטן בפינה */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="סגור"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          🎯 סינון דילים
        </h2>

        <div className="space-y-5">
          {/* תקציב מינימלי */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תקציב מינימלי (₪)</label>
            <input
              type="number"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value ? Number(e.target.value) : '')}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* תקציב מקסימלי */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תקציב מקסימלי (₪)</label>
            <input
              type="number"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value ? Number(e.target.value) : '')}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* סוג מדיה */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">סוג מדיה</label>
            <input
              type="text"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* מספר עוקבים */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">מספר עוקבים מינימלי</label>
            <input
              type="text"
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
              className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* צ'קבוקס מאומתים */}
          <div className="flex items-center gap-2">
            <input
              id="onlyVerified"
              type="checkbox"
              checked={onlyVerified}
              onChange={() => setOnlyVerified(!onlyVerified)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="onlyVerified" className="text-sm text-gray-700">רק יוצרי תוכן מאומתים</label>
          </div>
        </div>

        {/* כפתורים */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-xl hover:bg-gray-300 transition"
          >
            ביטול
          </button>
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition"
          >
            החל סינון
          </button>
        </div>
      </div>
    </div>
  )
}
