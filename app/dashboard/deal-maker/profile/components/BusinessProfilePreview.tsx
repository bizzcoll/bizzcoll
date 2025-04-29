'use client'

import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'

type Profile = {
  name: string
  description?: string
  category?: string
  phone?: string
  website?: string
  logo_url?: string
  cover_url?: string
  collaborationsCount?: number
}

export default function BusinessProfilePreview({ profile }: { profile: Profile }) {
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

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

        {/* שם העסק + תחום פעילות + לוגו */}
        <div className="flex flex-col items-center md:flex-row-reverse md:justify-between md:items-center gap-4">
          
          {/* טקסט צד ימין */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right max-w-[250px] overflow-hidden">
            <h2 className="text-2xl font-bold max-w-full">
              {truncateText(profile.name || 'שם העסק', 20)}
            </h2>
            <p className="text-gray-500 max-w-full">
              {truncateText(profile.category || 'תחום פעילות', 25)}
            </p>
          </div>

          {/* לוגו צד שמאל */}
          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-200 shadow-md">
            {profile.logo_url ? (
              <img src={profile.logo_url} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon size={36} />
            )}
          </div>
        </div>

        {/* תיאור העסק */}
        {profile.description ? (
          <p className="text-gray-600 leading-relaxed break-words max-h-32 overflow-y-auto whitespace-pre-wrap">
            {profile.description}
          </p>
        ) : (
          <p className="text-gray-400 italic">תיאור קצר של העסק...</p>
        )}

        {/* לינק לאתר */}
        {profile.website && (
          <a
            href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit"
          >
            <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-300 px-6 py-2 rounded-xl text-sm">
              🌐 בקרו באתר
            </button>
          </a>
        )}

        {/* מספר שיתופי פעולה דרך Bizz */}
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

      </div>
    </motion.div>
  )
}
