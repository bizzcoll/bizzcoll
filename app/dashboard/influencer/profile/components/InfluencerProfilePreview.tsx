'use client'

import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'

type Props = {
  profile: {
    full_name: string
    bio?: string
    links?: string
    profile_url?: string
    cover_url?: string
    collaborationsCount?: number
  }
}

export default function InfluencerProfilePreview({ profile }: Props) {
  const truncate = (text: string = '', max: number) =>
    text.length > max ? text.slice(0, max) + '...' : text

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full lg:w-1/2 max-w-[500px] space-y-6 text-right"
    >
      <div className="bg-white border rounded-xl shadow-md p-6 space-y-6">

        {/* תמונת קאבר */}
        <div className="w-full h-60 rounded-xl overflow-hidden border border-gray-200 shadow-md flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          {profile.cover_url ? (
            <img src={profile.cover_url} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageIcon size={60} />
              <span className="text-base mt-2 font-semibold">אין תמונת קאבר</span>
            </div>
          )}
        </div>

        {/* שם + פרופיל */}
        <div className="flex flex-col items-center md:flex-row-reverse md:justify-between md:items-center gap-4">
          {/* טקסט */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right max-w-[250px] overflow-hidden">
            <h2 className="text-2xl font-bold max-w-full">
              {truncate(profile.full_name || 'שם מלא', 20)}
            </h2>
            <p className="text-gray-500 max-w-full">יוצר תוכן</p>
          </div>

          {/* תמונת פרופיל */}
          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-200 shadow-md">
            {profile.profile_url ? (
              <img src={profile.profile_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon size={36} />
            )}
          </div>
        </div>

        {/* ביוגרפיה */}
        {profile.bio ? (
          <p className="text-gray-600 leading-relaxed break-words max-h-32 overflow-y-auto whitespace-pre-wrap">
            {profile.bio}
          </p>
        ) : (
          <p className="text-gray-400 italic">תיאור קצר עליך...</p>
        )}

        {/* לינקים */}
        {profile.links && (
          <a
            href={profile.links.startsWith('http') ? profile.links : `https://${profile.links}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit"
          >
            <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-300 px-6 py-2 rounded-xl text-sm">
              🔗 מעבר לקישורים
            </button>
          </a>
        )}

        {/* סטטיסטיקות BIZZ */}
        {(profile.collaborationsCount !== undefined) && (
          <div className="flex flex-col items-center justify-center mt-4 text-green-600 gap-2">
            <img
              src="/logo.png"
              alt="Bizz Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm">
              {profile.collaborationsCount} שת"פים דרך BIZZ
            </span>
          </div>
        )}

        {/* סטטיסטיקות רשת – הכנה לחיבור APIs */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-800 space-y-1">
          <p>🤝 שיתופי פעולה: {profile.collaborationsCount ?? 0}</p>
          <p>👥 עוקבים: 12,400 {/* בעתיד לפי רשת */}</p>
          <p>📈 ממוצע צפיות: 5,000 {/* למשוך מנתונים אמיתיים */}</p>
        </div>
      </div>
    </motion.div>
  )
}
