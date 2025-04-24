'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import NewDealForm from './NewDealForm'

export default function NewDealPage() {
  const router = useRouter()
  const [businessId, setBusinessId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user.id) {
        setBusinessId(session.user.id)
      } else {
        router.replace('/auth')
      }
    })
  }, [router])

  return (
    <main className="p-6 space-y-6 text-right">
      {businessId && <NewDealForm businessId={businessId} />}
    </main>
  )
}
