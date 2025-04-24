import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'

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
    <main className="p-8 flex justify-center">
      <div className="bg-white/70 backdrop-blur-md border border-green-300 shadow-xl rounded-3xl p-10 w-full max-w-3xl text-right space-y-6">

        {/* 🔥 כותרת + לוגו בשורה אחת, ממורכז */}
        <div className="flex items-center justify-center gap-4 border-b border-green-300 pb-4">
          <span role="img" aria-label="icon" className="text-3xl">📄</span>
          <h1 className="text-4xl font-bold text-green-700 text-center">פרטי דיל</h1>
        </div>

        <div className="space-y-3 text-lg text-gray-800 leading-relaxed">
          {[
            { label: 'כותרת', value: deal.title || 'ללא כותרת' },
            { label: 'תיאור', value: deal.description || 'אין תיאור' },
            { label: 'תקציב', value: `₪${deal.budget?.toString() || '0'}` },
            { label: 'סוג מדיה', value: deal.media_type || 'לא צוין' },
            { label: 'תאריך יצירה', value: new Date(deal.created_at).toLocaleDateString('he-IL') },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center gap-6 border-b pb-2 last:border-b-0">
              <span className="text-gray-800 text-right max-w-[70%] break-words">{value}</span>
              <span className="text-green-800 font-semibold whitespace-nowrap">{label}:</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
