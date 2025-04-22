'use client'

import { useUser } from '@/app/context/UserContext'

export default function AdminTopbar() {
  const { fullName } = useUser()

  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-800 text-white px-6 py-4 shadow-md backdrop-blur-md bg-opacity-40 transition-all duration-500">
      <h1 className="text-xl font-semibold tracking-wide animate-fade-in-right text-right">
        🛡️ BizzColl - מנהל מערכת{fullName ? ` | ${fullName}` : ''}
      </h1>
    </header>
  )
}
