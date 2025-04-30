import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import type { User } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const { email, password, role, full_name } = await req.json()

  const validRoles = ['INFLUENCER', 'DEAL_MAKER', 'ADMIN']
  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  if (role === 'ADMIN') {
    return NextResponse.json({ error: 'Cannot register as admin from this endpoint' }, { status: 403 })
  }

  const { data: usersResponse, error: fetchError } = await supabaseAdmin.auth.admin.listUsers()
  if (fetchError) {
    console.error('❌ שגיאה בשליפת יוזרים:', fetchError)
    return NextResponse.json({ error: 'שגיאה בבדיקה' }, { status: 500 })
  }

  const users = usersResponse?.users as User[]
  const exists = users.find((user) => user.email === email)
  if (exists) {
    return NextResponse.json({ error: 'user_exists' }, { status: 409 })
  }

  const { data: newUser, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // ✅ תמיד נדרוש אישור מייל
    user_metadata: { role, full_name, approved: false },
  })

  if (signUpError || !newUser?.user?.id) {
    return NextResponse.json(
      { error: signUpError?.message || 'בעיה לא ידועה' },
      { status: 500 }
    )
  }

  await supabaseAdmin.auth.admin.updateUserById(newUser.user.id, {
    user_metadata: { role, full_name, approved: false },
  })

  return NextResponse.json({ success: true }, { status: 200 })
}
