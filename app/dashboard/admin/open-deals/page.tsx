'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Pencil, Trash2 } from 'lucide-react'
import EditDealModal from './EditDealModal'
import Pagination from 'app/components/Pagination'
import { supabase } from '@/lib/supabaseClient'

type Deal = {
  id: string
  title: string | null
  description: string | null
  budget: number | null
  min_budget?: number | null
  max_budget?: number | null
  media_type: string | null
  created_at: string
  image_paths?: string[]
  users?: {
    full_name?: string
  }
}

const DEALS_PER_PAGE = 4

export default function OpenDealsAdminPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
  const [page, setPage] = useState(1)
  const [totalDeals, setTotalDeals] = useState(0)
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchDeals()
  }, [page])

  const fetchDeals = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/deals-available?page=${page}&limit=${DEALS_PER_PAGE}`)
      if (res.ok) {
        const { deals, total } = await res.json()
        setDeals(deals)
        setTotalDeals(total)

        // אחרי שהדילים מגיעים, נבקש Signed URLs
        const urls: Record<string, string> = {}

        for (const deal of deals) {
          if (deal.image_paths?.[0]) {
            const { data, error } = await supabase
              .storage
              .from('deals')
              .createSignedUrl(deal.image_paths[0], 60 * 60) // 1 שעה תוקף

            if (data?.signedUrl) {
              urls[deal.id] = data.signedUrl
            } else if (error) {
              console.error('שגיאה ביצירת Signed URL:', error.message)
            }
          }
        }
        setSignedUrls(urls)

      } else {
        toast.error('נכשל בטעינת דילים.')
      }
    } catch (error) {
      toast.error('שגיאה בטעינה.')
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('בטוח שברצונך למחוק את הדיל הזה?')) return
    try {
      const res = await fetch(`/api/deals/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setDeals(prev => prev.filter(d => d.id !== id))
        setTotalDeals(prev => prev - 1)
        toast.success('הדיל נמחק בהצלחה!')
      } else {
        toast.error('מחיקה נכשלה.')
      }
    } catch (error) {
      toast.error('שגיאת שרת.')
    }
  }

  const handleUpdate = (updatedDeal: Deal) => {
    setDeals(prev => prev.map(d => (d.id === updatedDeal.id ? updatedDeal : d)))
    setEditingDeal(null)
    toast.success('הדיל עודכן בהצלחה!')
  }

  return (
    <main className="p-6 space-y-6 text-right">
      <h1 className="text-3xl font-bold text-green-700">📢 דילים פתוחים (אדמין)</h1>

      {loading ? (
        <p className="text-gray-500">טוען דילים...</p>
      ) : deals.length === 0 ? (
        <p className="text-gray-600">אין דילים פתוחים כרגע.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {deals.map((deal) => {
              const imageUrl = signedUrls[deal.id] || ''

              return (
                <div key={deal.id} className="relative bg-white border rounded-xl shadow-md p-6 flex flex-col gap-4">
                  {/* כפתורים עריכה/מחיקה */}
                  <div className="absolute left-4 top-4 flex gap-2">
                    <button onClick={() => setEditingDeal(deal)} className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(deal.id)} className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* תוכן הדיל */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 h-40 rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center">
                      {imageUrl ? (
                        <img src={imageUrl} alt="תמונה" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-300 text-sm">אין תמונה</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 w-full text-right">
                      <h2 className="text-xl font-bold text-gray-800">{deal.title || 'ללא כותרת'}</h2>
                      <p className="text-gray-600">{deal.description || 'אין תיאור.'}</p>
                      <p className="text-gray-500 text-sm">תקציב: ₪{deal.min_budget} - ₪{deal.max_budget}</p>
                      <p className="text-gray-500 text-sm">סוג מדיה: {deal.media_type || 'לא צוין'}</p>
                      <p className="text-gray-500 text-sm">שם העסק: {deal.users?.full_name || 'לא ידוע'}</p>
                      <p className="text-gray-400 text-xs">נוצר בתאריך: {new Date(deal.created_at).toLocaleDateString('he-IL')}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* פאג'ינציה */}
          <Pagination
            total={totalDeals}
            page={page}
            onPageChange={setPage}
            itemsPerPage={DEALS_PER_PAGE}
            color="purple"
          />
        </>
      )}

      {editingDeal && (
        <EditDealModal
          deal={editingDeal}
          onClose={() => setEditingDeal(null)}
          onSave={handleUpdate}
        />
      )}
    </main>
  )
}
