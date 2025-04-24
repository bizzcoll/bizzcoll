'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import RoleTabs from './components/RoleTabs'
import SearchBar from './components/SearchBar'
import UserList from './components/UserList'
import { User } from '@/app/dashboard/admin/types'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState<string>('ADMIN')
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const USERS_PER_PAGE = 3

  useEffect(() => {
    const fetchUsers = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return router.replace('/auth')

      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })

      if (!res.ok) {
        router.replace(res.status === 403 ? '/unauthorized' : '/auth')
        return
      }

      const data = await res.json()
      setUsers(data.users)
    }

    fetchUsers()
  }, [router])

  const groupedUsers = users.reduce<Record<string, User[]>>((acc, user) => {
    const role = user.user_metadata?.role || 'UNKNOWN'
    if (!acc[role]) acc[role] = []
    acc[role].push(user)
    return acc
  }, {})

  const roles = Object.keys(groupedUsers)

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const renderPagination = (total: number) => {
    const totalPages = Math.ceil(total / USERS_PER_PAGE)
    return (
      <div className="flex justify-end mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 text-sm rounded ${
              page === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}
      </div>
    )
  }

  return (
    <main className="p-6 space-y-6 text-right">
      <header>
        {/* Mobile */}
        <div className="md:hidden text-center space-y-1">
          <h1 className="text-3xl font-bold text-purple-700">🔐 דשבורד אדמין</h1>
          <p className="text-gray-500">ניהול משתמשים לפי תפקיד</p>
        </div>
        {/* Desktop */}
        <div className="hidden md:block text-right space-y-1">
          <h1 className="text-3xl font-bold text-purple-700">🔐 דשבורד אדמין</h1>
          <p className="text-gray-500">ניהול משתמשים לפי תפקיד</p>
        </div>
      </header>

      <Tabs
        defaultValue={activeTab}
        onValueChange={(val) => {
          setActiveTab(val)
          setPage(1)
          setSearchQuery('')
        }}
      >
        <div className="flex justify-end">
          <RoleTabs roles={roles} activeTab={activeTab} setTab={setActiveTab} />
        </div>

        {roles.map((role) => {
          const filtered = groupedUsers[role].filter((user) => {
            const query = searchQuery.toLowerCase()
            return (
              user.email?.toLowerCase().includes(query) ||
              user.user_metadata?.full_name?.toLowerCase().includes(query)
            )
          })

          const paginated = filtered.slice(
            (page - 1) * USERS_PER_PAGE,
            page * USERS_PER_PAGE
          )

          return (
            <TabsContent key={role} value={role}>
              <div className="my-4 text-right">
                <SearchBar value={searchQuery} onChange={handleSearch} />
              </div>

              <div className="text-right">
                <UserList users={paginated} onDelete={handleDeleteUser} />
                {renderPagination(filtered.length)}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </main>
  )
}
