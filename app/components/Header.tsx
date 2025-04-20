'use client'

import { useUser } from '@/app/context/UserContext'
import LogoutButton from '@/app/components/LogoutButton'
import Image from 'next/image'

export default function Header() {
  const { user } = useUser()

  return (
    <header className="p-4 bg-gray-200 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="BizzColl Logo"
          width={52}
          height={32}
          className="rounded-full"
        />
        <h1 className="text-xl font-bold">BizzColl</h1>
      </div>

      {user ? (
        <div className="flex items-center gap-4 text-sm">
          <span>שלום {user.email}</span>
          <LogoutButton />
        </div>
      ) : (
        <div className="text-sm text-gray-500">לא מחובר</div>
      )}
    </header>
  )
}
