'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import NewDealForm from './NewDealForm'

export default function NewDealPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const session = await supabase.auth.getSession()
      if (!session.data.session) {
        router.replace('/auth')
      }
    }

    checkSession()
  }, [router])

  return (
    <main className="p-0 space-y-0 text-right">
      <NewDealForm />
    </main>
  )
}
