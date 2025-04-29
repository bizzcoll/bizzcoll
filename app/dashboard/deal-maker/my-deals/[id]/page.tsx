// app/dashboard/deal-maker/my-deals/[id]/page.tsx
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'

type Props = { params: { id: string } }

export default async function DealDetailsPage({ params }: Props) {
  // שליפת ה-deal מה-DB
  const deal = await prisma.deals.findUnique({
    where: { id: params.id },
  })
  console.log('🔍 deal.image_paths:', deal?.image_paths)
  if (!deal) return notFound()

  // יצירת client עם service_role לצורך signed URLs
  const supabase = createClient()

  let signedUrls: string[] = []

  if (deal.image_paths?.length > 0) {
    const promises = deal.image_paths.map(async (path) => {
      const cleanPath = path.trim()
      const { data, error } = await supabase
        .storage
        .from('deals')
        .createSignedUrl(cleanPath, 60 * 60) // תקף לשעה

      if (error) {
        console.error('🚨 Signed URL error:', error.message)
        return null
      }
      return data?.signedUrl || null
    })

    const results = await Promise.all(promises)
    signedUrls = results.filter((url) => url !== null) as string[]
  }

  return (
    <main className="flex justify-center p-8" dir="rtl">
      <div className="bg-white/70 backdrop-blur-md border border-green-300 shadow-xl rounded-3xl p-10 w-full max-w-3xl text-right space-y-6">
        {/* 🔥 כותרת */}
        <div className="flex items-center justify-center gap-4 border-b border-green-300 pb-4">
          <span role="img" aria-label="icon" className="text-3xl">📄</span>
          <h1 className="text-4xl font-bold text-green-700 text-center">פרטי דיל</h1>
        </div>

        {/* 🧾 תוכן הדיל */}
        <div className="space-y-3 text-lg text-gray-800 leading-relaxed">
          {[
            { label: 'כותרת', value: deal.title || 'ללא כותרת' },
            { label: 'תיאור', value: deal.description || 'אין תיאור' },
            { label: 'תקציב', value: `₪${deal.budget?.toString() || '0'}` },
            { label: 'סוג מדיה', value: deal.media_type || 'לא צוין' },
            { label: 'תאריך יצירה', value: new Date(deal.created_at).toLocaleDateString('he-IL') },
          ].map(({ label, value }) => (
            <div key={label} className="border-b pb-2 last:border-b-0">
              <span className="text-green-800 font-semibold whitespace-nowrap">{label}:</span>{' '}
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        {/* 🎨 גלריית תמונות */}
        {signedUrls.length > 0 && (
          <div className="pt-6 space-y-3">
            <h2 className="text-xl font-bold text-green-800 border-b pb-2">תמונות שצורפו</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {signedUrls.map((url, idx) => (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-60 overflow-hidden rounded-xl border border-green-300 shadow-md"
                >
                  <img
                    src={url}
                    alt={`תמונה ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
