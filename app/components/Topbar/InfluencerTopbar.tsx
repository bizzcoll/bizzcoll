'use client'

import { useUser } from '@/app/context/UserContext'

export default function InfluencerTopbar() {
  const { fullName } = useUser()

  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-6 py-4 shadow-md backdrop-blur-md bg-opacity-40 transition-all duration-500">
      <h1 className="text-xl font-semibold tracking-wide animate-fade-in-right text-right">
        🎥 BizzColl - יוצר תוכן {fullName ? `| ${fullName}` : ''}
      </h1>
    </header>
  )
}
