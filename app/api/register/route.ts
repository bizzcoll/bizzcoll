import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import { sendVerificationEmail } from '@/lib/supabaseHelpers'
import type { User } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const { email, password, role, full_name } = await req.json()
  console.log("🔁 נרשמים עם:", { email, password, role, full_name })

  const validRoles = ['INFLUENCER', 'DEAL_MAKER', 'ADMIN']
  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  // שליפת כל המשתמשים
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

  // יצירת המשתמש
  const { data: newUser, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: { role, full_name },
  })

  if (signUpError || !newUser?.user?.id) {
    console.error('❌ שגיאה ביצירת יוזר:', signUpError)
    return NextResponse.json(
      { error: signUpError?.message || 'בעיה לא ידועה' },
      { status: 500 }
    )
  }

  // עדכון metadata נוסף
  await supabaseAdmin.auth.admin.updateUserById(newUser.user.id, {
    user_metadata: { role, full_name },
  })

  try {
    await sendVerificationEmail(email)
  } catch (error) {
    console.error('⚠️ מייל אימות נכשל:', error)
    return NextResponse.json(
      { error: 'נוצר משתמש, אך מייל אימות נכשל' },
      { status: 200 }
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
