'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation' // ✅ נוספה

export default function RegistrationFormsPage() {
  const [forms, setForms] = useState<any[]>([])
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const router = useRouter() // ✅ הוספנו את זה

  useEffect(() => {
    const fetchForms = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return

      const res = await fetch('/api/admin/registration-forms', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })

      if (!res.ok) {
        toast.error('שגיאה בטעינת טפסים')
        return
      }

      const data = await res.json()
      setForms(data.forms)
    }

    fetchForms()
  }, [])

  const handleApprove = async (id: string, approve: boolean) => {
    setLoadingIds((prev) => [...prev, id])

    const action = approve ? 'מאשר...' : 'דוחה...'
    const successMsg = approve ? 'אושר בהצלחה!' : 'נדחה בהצלחה!'
    const failMsg = 'שגיאה בעדכון הסטטוס'

    await toast.promise(
      fetch('/api/admin/approve-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approve }),
      }).then(async (res) => {
        if (!res.ok) throw new Error()
        setForms((prev) => prev.filter((form) => form.id !== id))
        router.refresh() // ✅ מרענן את הדשבורד
      }),
      {
        loading: action,
        success: successMsg,
        error: failMsg,
      }
    )

    setLoadingIds((prev) => prev.filter((i) => i !== id))
  }

  return (
    <main className="p-6 space-y-6 text-right">
      <h1 className="text-3xl font-bold text-purple-700">📝 ניהול בקשות הרשמה</h1>
      <div className="space-y-4">
        {forms.length === 0 ? (
          <p className="text-gray-500">אין בקשות פתוחות</p>
        ) : (
          forms.map((form) => {
            const isLoading = loadingIds.includes(form.id)
            return (
              <div key={form.id} className="p-4 bg-white rounded-xl shadow border space-y-2">
                <p><strong>אימייל:</strong> {form.email}</p>
                <p><strong>תפקיד:</strong> {form.role}</p>
                {form.role === 'INFLUENCER' ? (
                  <>
                    <p><strong>שם מלא:</strong> {form.fullName}</p>
                    <p><strong>תיאור:</strong> {form.bio}</p>
                    <p><strong>קישורים:</strong> {form.links}</p>
                  </>
                ) : (
                  <>
                    <p><strong>שם העסק:</strong> {form.businessName}</p>
                    <p><strong>תחום:</strong> {form.industry}</p>
                    <p><strong>אתר:</strong> {form.website}</p>
                  </>
                )}
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={() => handleApprove(form.id, true)}
                    className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'מאשר...' : 'אישור ✅'}
                  </button>
                  <button
                    onClick={() => handleApprove(form.id, false)}
                    className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'דוחה...' : 'דחייה ❌'}
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </main>
  )
}
