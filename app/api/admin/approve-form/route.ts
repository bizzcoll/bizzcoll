import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import supabaseAdmin from '@/lib/supabaseAdmin'

export async function POST(req: NextRequest) {
  const { id, approve } = await req.json()

  if (!id || typeof approve !== 'boolean') {
    return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 })
  }

  try {
    // ✅ עדכון טופס בטבלת registrationForm
    const form = await prisma.registrationForm.update({
      where: { id },
      data: {
        reviewed: true,
        approved: approve,
      },
    })

    // ✅ אם מאשרים – עדכון Supabase user_metadata
    if (approve) {
      const { data: usersPage, error: userError } = await supabaseAdmin.auth.admin.listUsers({
        perPage: 1000,
      })

      if (userError || !usersPage?.users) {
        console.error('❌ שגיאה בשליפת רשימת יוזרים:', userError)
        return NextResponse.json({ error: 'User fetch failed' }, { status: 500 })
      }

      const user = usersPage.users.find((u: any) => u.email === form.email)

      if (!user) {
        console.warn('⚠️ לא נמצא משתמש עם האימייל:', form.email)
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      const updatedMetadata = {
        ...user.user_metadata,
        approved: true,
        role: form.role,
        full_name: form.fullName || form.businessName || 'משתמש ללא שם',
      }

      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
        user_metadata: updatedMetadata,
      })

      if (updateError) {
        console.error('❌ שגיאה בעדכון מטהדאטה:', updateError)
        return NextResponse.json({ error: 'Failed to update user metadata' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ שגיאה כללית באישור/דחייה:', error)
    return NextResponse.json({ error: 'Failed to approve/reject' }, { status: 500 })
  }
}
