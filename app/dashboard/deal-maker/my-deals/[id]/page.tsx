import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type Props = {
  params: {
    id: string
  }
}

export default async function DealDetailsPage({ params }: Props) {
  const deal = await prisma.deals.findUnique({
    where: { id: params.id },
  })

  if (!deal) return notFound()

  return (
    <main className="p-8 flex justify-center" dir="rtl">
      <div className="bg-white/70 backdrop-blur-md border border-green-300 shadow-xl rounded-3xl p-10 w-full max-w-3xl text-right space-y-6">

        {/* 🔥 כותרת + לוגו בשורה אחת, ממורכז */}
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
              <span className="text-green-800 font-semibold whitespace-nowrap">
                {label}:
              </span>{' '}
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        {/* 🎨 גלריית תמונות אם קיימת */}
        {deal.image_paths?.length > 0 && (
          <div className="pt-6 space-y-3">
            <h2 className="text-xl font-bold text-green-800 border-b pb-2">תמונות שצורפו</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deal.image_paths.map((path, idx) => {
                const { data } = supabase.storage.from('deals').getPublicUrl(path)
                const url = data?.publicUrl || ''
                return (
                  <img
                    key={idx}
                    src={url}
                    alt={`תמונה ${idx + 1}`}
                    className="w-full rounded-xl border border-green-300 shadow-md object-cover h-60 transition-transform hover:scale-105 duration-200"
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
