'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/auth')
        return
      }

      const res = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (!res.ok) {
        if (res.status === 403) {
          router.replace('/unauthorized')
        } else {
          router.replace('/auth')
        }
        return
      }

      const data = await res.json()
      setUsers(data.users)
    }

    fetchUsers()
  }, [router])

  return (
    <main className="p-10 text-right space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">🔐 דשבורד אדמין</h1>
      <p className="text-gray-600">כאן תוכל לצפות בכל המשתמשים במערכת.</p>

      <ul className="space-y-2 text-sm">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-white/60 border border-purple-100 rounded px-4 py-2 backdrop-blur-md shadow"
          >
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Role:</strong> {user.user_metadata?.role || 'לא ידוע'}</div>
            <div><strong>Confirmed:</strong> {user.email_confirmed_at ? '✔️' : '❌'}</div>
          </li>
        ))}
      </ul>
    </main>
  )
}
