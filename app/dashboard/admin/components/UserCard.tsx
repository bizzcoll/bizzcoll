'use client'

import React, { useState } from 'react'
import { User } from '@/app/dashboard/admin/types'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'react-hot-toast'
import ConfirmModal from '@/components/ui/ConfirmModal'

type Props = {
  user: User
  onDelete?: (id: string) => void
}

export default function UserCard({ user, onDelete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // ✅ ניהול מצב טעינה

  const handleDelete = async () => {
    setIsDeleting(true) // ✅ התחלת טעינה
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error || !session) {
        toast.error('שגיאה בשליפת session')
        return
      }

      const res = await fetch('/api/admin/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ user_id: user.id }),
      })

      if (res.ok) {
        toast.success('המשתמש נמחק בהצלחה!')
        onDelete?.(user.id)
      } else {
        const err = await res.json()
        toast.error(`שגיאה: ${err.error}`)
      }
    } catch (err) {
      console.error(err)
      toast.error('שגיאה כללית במחיקה')
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  return (
    <>
      <li className="bg-white/60 border rounded-xl px-3 py-1.5 backdrop-blur-md shadow text-l space-y-1">
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Display Name:</strong> {user.user_metadata?.full_name || 'לא ידוע'}</div>
        <div><strong>Dashboard Role:</strong> {user.user_metadata?.role || 'לא ידוע'}</div>
        <div><strong>Confirmed:</strong> {user.email_confirmed_at ? '✔️' : '❌'}</div>
        <div><strong>Created At:</strong> {new Date(user.created_at).toLocaleString('he-IL')}</div>
        <div className="flex gap-2 mt-2">
            <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-500 text-white text-sm px-2 py-1 rounded"
            >
            🗑️ מחק
            </button>
            <button className="bg-blue-500 text-white text-sm px-2 py-1 rounded">
            ✏️ שנה תפקיד
            </button>
            <button className="bg-purple-600 text-white text-sm px-2 py-1 rounded">
            💬 פתח צ׳אט
            </button>
        </div>
        </li>


      <ConfirmModal
        open={showConfirm}
        onClose={() => {
          if (!isDeleting) setShowConfirm(false)
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting} // ✅ שולח את מצב הטעינה
        title="מחיקת משתמש"
        description={`אתה בטוח שברצונך למחוק את המשתמש ${user.email}?`}
        confirmText="כן, מחק"
        cancelText="בטל"
      />
    </>
  )
}
