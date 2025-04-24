'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { Briefcase, Video, ImageIcon } from 'lucide-react'

// טיפוס הדיל
type Deal = {
  id: string
  title: string | null
  description: string | null
  budget: number | null
  media_type: string | null
  created_at: string
}

// ממפה מדיה לאייקון
const mediaIcon = (type: string | null) => {
  if (!type) return <Briefcase size={18} className="inline-block text-gray-400" />
  if (type.toLowerCase() === 'video') return <Video size={18} className="inline-block text-blue-500" />
  if (type.toLowerCase() === 'image') return <ImageIcon size={18} className="inline-block text-pink-500" />
  return <Briefcase size={18} className="inline-block text-gray-400" />
}

export default function MyDealsPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState<string>('')
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.replace('/auth')
        return
      }

      const name = session.user.user_metadata?.full_name || 'לא ידוע'
      setFullName(name)

      const res = await fetch(`/api/deals?business_id=${session.user.id}`)
      if (res.ok) {
        const data = await res.json()
        setDeals(data)
      }
      setLoading(false)
    }

    fetchData()
  }, [router])

  return (
    <main className="p-6 space-y-6 text-right">
      <h1 className="text-3xl font-bold text-green-600 tracking-wide">הדילים שלי 📦</h1>
      <p className="text-gray-700 text-base leading-relaxed">צפה בדילים שפרסמת ובמצבם הנוכחי.</p>

      {loading ? (
        <p className="text-gray-500">טוען דילים...</p>
      ) : deals.length === 0 ? (
        <p className="text-gray-600">לא נמצאו דילים עדיין.</p>
      ) : (
        <div className="grid gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 space-y-3"
            >
              <div className="flex justify-between items-center">
                <Link href={`/dashboard/deal-maker/my-deals/${deal.id}`}>
                  <button className="bg-green-600 text-white text-sm font-semibold px-5 py-1.5 rounded-lg shadow hover:bg-green-700 transition">
                    צפה
                  </button>
                </Link>

                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {deal.title || 'ללא כותרת'}
                  </h2>
                  {mediaIcon(deal.media_type)}
                </div>
              </div>

              <div>
                <span className="font-semibold text-gray-700">תיאור: </span>
                <span className="text-gray-700 text-base font-medium">
                  {deal.description || 'ללא תיאור'}
                </span>
              </div>

              <div className="text-sm text-gray-500 font-medium space-y-1">
                <div>
                  <span className="font-semibold text-gray-700">סוג מדיה:</span> {deal.media_type || 'לא צוין'}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">תקציב:</span> ₪{deal.budget?.toString() || '0'}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">נוצר בתאריך:</span>{' '}
                  {new Date(deal.created_at).toLocaleDateString('he-IL')}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">שם העסק:</span> {fullName}
                </div>
              </div>

              {/* TODO: רשתות מועדפות */}
              <div className="flex gap-2 pt-2 text-sm text-gray-600">
                <span className="font-medium text-gray-800">רשתות מועדפות:</span>
                <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">אינסטגרם</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">פייסבוק</span>
                <span className="bg-black text-white px-2 py-0.5 rounded-full">טיקטוק</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
