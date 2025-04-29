'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { supabase } from '@/lib/supabaseClient'
import Pagination from '@/app/components/Pagination'
import SearchAndFilter from '@/app/components/SearchAndFilter'
import FilterModal from '@/app/components/FilterModal'

import { Briefcase, Video, ImageIcon } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'

interface Deal {
  id: string
  title: string | null
  description: string | null
  budget: number | null
  media_type: string | null
  created_at: string
  image_paths?: string[]
  min_budget?: number | null
  max_budget?: number | null
  users?: {
    full_name?: string
  }
}

const DEALS_PER_PAGE = 4

const mediaIcon = (type: string | null) => {
  if (!type) return <Briefcase size={18} className="inline-block text-gray-400" />
  if (type.toLowerCase() === 'video') return <Video size={18} className="inline-block text-blue-500" />
  if (type.toLowerCase() === 'image') return <ImageIcon size={18} className="inline-block text-pink-500" />
  return <Briefcase size={18} className="inline-block text-gray-400" />
}

export default function AvailableDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({})
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    minBudget: '' as number | '',
    maxBudget: '' as number | '',
    mediaType: '',
    followers: '',
    onlyVerified: false,
  })

  useEffect(() => {
    fetchDeals(page)
  }, [page])

  const fetchDeals = async (page: number) => {
    setLoading(true)
    const res = await fetch(`/api/deals-available?page=${page}&limit=${DEALS_PER_PAGE}`)
    if (res.ok) {
      const { deals, total } = await res.json()
      setDeals(deals)
      setTotal(total)

      // 🟢 מביא Signed URLs לכל דיל
      const urls: Record<string, string> = {}
      for (const deal of deals) {
        if (deal.image_paths?.[0]) {
          const { data, error } = await supabase
            .storage
            .from('deals')
            .createSignedUrl(deal.image_paths[0], 60 * 60) // שעה תוקף
          if (data?.signedUrl) {
            urls[deal.id] = data.signedUrl
          } else if (error) {
            console.error('Signed URL error:', error.message)
          }
        }
      }
      setSignedUrls(urls)
    }
    setLoading(false)
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setIsFilterOpen(false)
  }

  const filteredDeals = deals.filter(deal => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      deal.title?.toLowerCase().includes(query) || deal.description?.toLowerCase().includes(query)

    const matchesMinBudget = filters.minBudget
      ? (deal.min_budget ?? 0) >= Number(filters.minBudget)
      : true

    const matchesMaxBudget = filters.maxBudget
      ? (deal.max_budget ?? 0) <= Number(filters.maxBudget)
      : true

    const matchesMediaType = filters.mediaType
      ? deal.media_type?.toLowerCase() === filters.mediaType.toLowerCase()
      : true

    return matchesSearch && matchesMinBudget && matchesMaxBudget && matchesMediaType
  })

  return (
    <main className="p-6 space-y-6 text-right">

      {/* ✅ כותרת ממורכזת */}
      <div className="text-center">
        <h1 className="text-3xl font-normal italic text-blue-600 tracking-wide">🎯מצא את השת"פ הבא שלך</h1>
        <p className="text-gray-700 text-base leading-relaxed mt-2">
          מצא את הדילים הכי חמים וקח חלק בשיתופי פעולה!
        </p>
      </div>

      {/* ✅ חיפוש + כפתור סינון */}
      <div className="flex justify-end my-4">
        <SearchAndFilter
          searchValue={searchQuery}
          onSearchChange={handleSearch}
          onFilterClick={() => setIsFilterOpen(true)}
          color="blue"
        />
      </div>

      {/* ✅ תוצאות */}
      {loading ? (
        <div className="grid gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-100 h-48 rounded-xl"></div>
          ))}
        </div>
      ) : filteredDeals.length === 0 ? (
        <p className="text-gray-600">לא נמצאו דילים זמינים.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {filteredDeals.map((deal) => {
              const url = signedUrls[deal.id] || ''

              return (
                <div
                  key={deal.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 space-y-3 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    {/* תמונה + כפתור */}
                    <div className="flex flex-col items-center md:items-start gap-2 w-full md:max-w-[180px] order-3 md:order-1">
                      {url && (
                        <>
                          <div className="w-full h-28 md:h-36 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
                            <img
                              src={url}
                              alt="תמונה ראשית"
                              className="w-full h-full object-cover block"
                              loading="lazy"
                            />
                          </div>
                          <div className="text-[9px] md:text-xs text-gray-700 flex items-center gap-1 bg-white border border-gray-300 rounded-full px-2 py-0.5 md:px-3 md:py-1 w-fit max-w-full overflow-hidden whitespace-nowrap">
                            <ImageIcon size={11} className="shrink-0" />
                            <span>{deal.image_paths?.length || 0} תמונות</span>
                          </div>
                        </>
                      )}

                      <Link href={`/available-deals/${deal.id}`}>
                        <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-1.5 rounded-lg shadow hover:bg-blue-700 transition w-full">
                          צפה בפרטים
                        </button>
                      </Link>
                    </div>

                    {/* תוכן */}
                    <div className="flex flex-col gap-3 w-full text-right order-1 md:order-2" dir="rtl">
                      <div className="flex items-center gap-2 text-xl font-bold text-gray-800 w-full justify-end">
                        <span className="w-full text-right">{deal.title || 'ללא כותרת'}</span>
                        {mediaIcon(deal.media_type)}
                      </div>

                      <div className="flex flex-col gap-1 text-sm text-gray-700">
                        <div><span className="font-semibold">תיאור:</span> {deal.description || 'ללא תיאור'}</div>
                        <div className="text-gray-500 font-medium space-y-1">
                          <div><span className="font-semibold text-gray-700">סוג מדיה:</span> {deal.media_type || 'לא צוין'}</div>
                          <div><span className="font-semibold text-gray-700">תקציב:</span> 
                            {deal.min_budget != null && deal.max_budget != null
                              ? `₪${deal.min_budget} - ₪${deal.max_budget}`
                              : deal.budget != null
                                ? `₪${deal.budget}`
                                : 'לא צויין'}
                          </div>
                          <div><span className="font-semibold text-gray-700">נוצר בתאריך:</span> {new Date(deal.created_at).toLocaleDateString('he-IL')}</div>
                          <div><span className="font-semibold text-gray-700">שם העסק:</span> {deal.users?.full_name || 'לא ידוע'}</div>
                        </div>
                      </div>

                      {/* רשתות מועדפות */}
                      <div className="flex flex-wrap gap-2 pt-2 text-sm text-gray-600 justify-center md:justify-start">
                        <span className="font-medium text-gray-800 w-full text-center md:text-right">רשתות מועדפות:</span>
                        <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs"><FaInstagram size={12} /> אינסטגרם</span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1 text-xs"><FaFacebookF size={12} /> פייסבוק</span>
                        <span className="bg-black text-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs"><FaTiktok size={12} /> טיקטוק</span>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

          {/* פאג'ינציה */}
          <Pagination
            total={filteredDeals.length}
            page={page}
            onPageChange={(newPage) => setPage(newPage)}
            itemsPerPage={DEALS_PER_PAGE}
            color="blue"
          />
        </>
      )}

      {/* מודאל סינון */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />
    </main>
  )
}
