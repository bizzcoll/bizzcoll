// context/UserContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

type UserContextType = {
  user: User | null
  role: string | null
}

const UserContext = createContext<UserContextType>({
  user: null,
  role: null,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        setUser(user)

        // נשלוף את role מתוך ה־metadata
        const role = user.user_metadata?.role || null
        setRole(role)
      }
    }

    getUserData()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        setRole(session.user.user_metadata?.role || null)
      } else {
        setUser(null)
        setRole(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, role }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
