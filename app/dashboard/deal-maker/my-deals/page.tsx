'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { Briefcase, Video, ImageIcon } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'

type Deal = {
  id: string
  title: string | null
  description: string | null
  budget: number | null
  media_type: string | null
  created_at: string
  image_paths?: string[]
  min_budget?: number | null
  max_budget?: number | null
}

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
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 space-y-3 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                {/* צד שמאל: תמונה + כפתור */}
                <div className="flex flex-col items-center md:items-start gap-2 w-full md:max-w-[180px] order-3 md:order-1">
                  <div className="w-full h-28 md:h-36 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center bg-gray-50">
                    {deal.image_paths?.length > 0 ? (() => {
                      const { data } = supabase.storage.from('deals').getPublicUrl(deal.image_paths[0])
                      const url = data?.publicUrl || ''
                      return (
                        <img
                          src={url}
                          alt="תמונה ראשית"
                          className="w-full h-full object-cover block"
                          loading="lazy"
                        />
                      )
                    })() : (
                      <span className="text-gray-300 text-xs">אין תמונה</span>
                    )}
                  </div>

                  {deal.image_paths?.length > 0 && (
                    <div className="text-[9px] md:text-xs text-gray-700 flex items-center gap-1 bg-white border border-gray-300 rounded-full px-2 py-0.5 md:px-3 md:py-1 w-fit max-w-full overflow-hidden whitespace-nowrap">
                      <ImageIcon size={11} className="shrink-0" />
                      <span>{deal.image_paths.length} תמונות</span>
                    </div>
                  )}

                  <Link href={`/dashboard/deal-maker/my-deals/${deal.id}`}>
                    <button className="bg-green-600 text-white text-sm font-semibold px-5 py-1.5 rounded-lg shadow hover:bg-green-700 transition w-full mt-1">
                      צפה בפרטי הקמפגיין
                    </button>
                  </Link>
                </div>

                {/* צד ימין: תוכן הדיל */}
                <div className="flex flex-col gap-3 w-full text-right order-1 md:order-2" dir="rtl">
                  <div className="flex items-center gap-2 text-xl font-bold text-gray-800 w-full justify-end">
                    <span className="w-full text-right">{deal.title || 'ללא כותרת'}</span>
                    {mediaIcon(deal.media_type)}
                  </div>

                  <div className="flex flex-col gap-1 text-base text-gray-700">
                    <div><span className="font-semibold">תיאור:</span> {deal.description || 'ללא תיאור'}</div>
                    <div className="text-gray-500 font-medium space-y-1">
                      <div><span className="font-semibold text-gray-700">סוג מדיה:</span> {deal.media_type || 'לא צוין'}</div>
                      <div>
                        <span className="font-semibold text-gray-700">טווח תקציב:</span> {
                          deal.min_budget && deal.max_budget
                            ? `₪${deal.min_budget} - ₪${deal.max_budget}`
                            : `₪${deal.budget?.toString() || '0'}`
                        }
                      </div>
                      <div><span className="font-semibold text-gray-700">נוצר בתאריך:</span> {new Date(deal.created_at).toLocaleDateString('he-IL')}</div>
                      <div><span className="font-semibold text-gray-700">שם העסק:</span> <span dir="auto">{fullName}</span></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 text-base text-gray-600 justify-center md:justify-start">
                    <span className="font-medium text-gray-800 w-full text-center md:text-right">רשתות מועדפות:</span>
                    <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs"><FaInstagram size={12} /> אינסטגרם</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs"><FaFacebookF size={12} /> פייסבוק</span>
                    <span className="bg-black text-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs"><FaTiktok size={12} /> טיקטוק</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
