'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

type UserContextType = {
  user: User | null
  role: string | null
  fullName: string | null
  approved: boolean | null
}

const UserContext = createContext<UserContextType>({
  user: null,
  role: null,
  fullName: null,
  approved: null,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)
  const [approved, setApproved] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user || null

      setUser(user)
      setRole(user?.user_metadata?.role || null)
      setFullName(user?.user_metadata?.full_name || null)
      setApproved(user?.user_metadata?.approved ?? null)
    }

    fetchSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user || null
      setUser(user)
      setRole(user?.user_metadata?.role || null)
      setFullName(user?.user_metadata?.full_name || null)
      setApproved(user?.user_metadata?.approved ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, role, fullName, approved }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
