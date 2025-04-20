import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  const { email, password, role } = await req.json()

  // בדיקה אם המשתמש כבר קיים בטבלת auth.users
  const { data: users, error: fetchError } = await supabaseAdmin.auth.admin.listUsers()

  if (fetchError) {
    console.error('שגיאה בשליפת יוזרים:', fetchError)
    return NextResponse.json({ error: 'שגיאה בבדיקה' }, { status: 500 })
  }

  const exists = users.users.find((user) => user.email === email)

  if (exists) {
    return NextResponse.json({ error: 'user_exists' }, { status: 409 })
  }

  // אם לא קיים – נרשום אותו
  const { error: signUpError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: { role },
  })

  if (signUpError) {
    console.error('שגיאה ביצירת יוזר:', signUpError)
    return NextResponse.json({ error: signUpError.message }, { status: 500 })
  }

  // שליחת מייל אימות
  const { error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)
  if (inviteError) {
    console.error('שגיאה בשליחת מייל:', inviteError)
    return NextResponse.json({ error: 'ההרשמה הצליחה, אך לא נשלח מייל אימות.' }, { status: 200 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
