'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export default function NewDealForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState<number | ''>('')
  const [mediaType, setMediaType] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [businessId, setBusinessId] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const session = await supabase.auth.getSession()
      const id = session.data.session?.user?.id
      if (!id) {
        router.replace('/auth')
        return
      }
      setBusinessId(id)
      console.log('✅ UID שלך מה-Session:', id)
    }
    fetchUser()
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files).slice(0, 3) : []
    setFiles(selected)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const imagePaths: string[] = []

      for (const file of files) {
        if (file.size > 7 * 1024 * 1024) throw new Error(`"${file.name}" חורג מ־7MB`)

        const ext = file.name.split('.').pop()
        const fileName = `${uuidv4()}.${ext}`
        const filePath = fileName

        console.log('📦 מעלה ל:', filePath)

        const { error: uploadError } = await supabase.storage
          .from('deals')
          .upload(filePath, file)

        if (uploadError) throw new Error(`שגיאה בהעלאת הקובץ ${file.name}`)
        imagePaths.push(filePath)
      }

      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_id: businessId,
          title,
          description,
          budget: budget === '' ? undefined : budget,
          media_type: mediaType,
          image_paths: imagePaths,
        }),
      })

      if (!res.ok) throw await res.json()

      router.push('/dashboard/deal-maker/my-deals')
    } catch (err: any) {
      setError(err.message || 'שגיאה ביצירת הדיל')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/50 p-6 rounded-xl shadow space-y-4" dir="rtl">
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

      <div>
        <label className="block mb-1 font-medium">תמונות (עד 3)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-green-100 file:text-green-700
                     hover:file:bg-green-200"
        />
        <div className="flex gap-2 mt-2">
          {files.map((file, idx) => (
            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {file.name}
            </span>
          ))}
        </div>
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
