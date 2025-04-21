'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

type UserContextType = {
  user: User | null
  role: string | null
  fullName: string | null
}

const UserContext = createContext<UserContextType>({
  user: null,
  role: null,
  fullName: null,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        setRole(user.user_metadata?.role || null)
        setFullName(user.user_metadata?.full_name || null)
      }
    }

    getUserData()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        setRole(session.user.user_metadata?.role || null)
        setFullName(session.user.user_metadata?.full_name || null)
      } else {
        setUser(null)
        setRole(null)
        setFullName(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, role, fullName }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
