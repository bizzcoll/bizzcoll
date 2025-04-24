import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import { sendVerificationEmail } from '@/lib/supabaseHelpers'
import type { User } from '@supabase/supabase-js'

export async function POST(req: Request) {
  // 🛠️ הדפסות סביבה
  console.log("🛠️ ENV בדיקה בתוך API route:")
  console.log("🌍 SUPABASE_URL:", process.env.SUPABASE_URL)
  console.log("🔐 SERVICE_ROLE:", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10) + '...')

  const { email, password, role, full_name } = await req.json()
  console.log("🔁 נרשמים עם:", { email, password, role, full_name })

  const validRoles = ['INFLUENCER', 'DEAL_MAKER', 'ADMIN']
  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  // ❗ חוסם הרשמת ADMIN דרך route רגיל
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
    email_confirm: process.env.NODE_ENV !== 'production',
    user_metadata: { role, full_name },
  })

  // לוגים לבדיקת היוזר החדש
  console.log("✅ יוזר חדש:", newUser?.user)
  console.error("❌ שגיאה:", signUpError)

  if (signUpError || !newUser?.user?.id) {
    return NextResponse.json(
      { error: signUpError?.message || 'בעיה לא ידועה' },
      { status: 500 }
    )
  }

  await supabaseAdmin.auth.admin.updateUserById(newUser.user.id, {
    user_metadata: { role, full_name },
  })

  if (process.env.NODE_ENV === 'production') {
    try {
      await sendVerificationEmail(email)
    } catch (error) {
      console.error('⚠️ מייל אימות נכשל:', error)
      return NextResponse.json(
        { error: 'נוצר משתמש, אך מייל אימות נכשל' },
        { status: 200 }
      )
    }
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
