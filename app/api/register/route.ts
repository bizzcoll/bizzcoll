import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  const { email, password, role, full_name } = await req.json()

  console.log("🔁 נרשמים עם:", { email, password, role, full_name })

  // בדיקה אם המשתמש כבר קיים
  const {
    data: users,
    error: fetchError,
  } = await supabaseAdmin.auth.admin.listUsers()

  if (fetchError) {
    console.error('❌ שגיאה בשליפת יוזרים:', fetchError)
    return NextResponse.json({ error: 'שגיאה בבדיקה' }, { status: 500 })
  }

  const exists = users?.users?.find((user) => user.email === email)

  if (exists) {
    return NextResponse.json({ error: 'user_exists' }, { status: 409 })
  }

  // יצירת יוזר עם metadata כולל role + full_name
  const {
    data: newUser,
    error: signUpError,
  } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      role,
      full_name,
    },
    redirect_to: 'http://localhost:3000/verify-email' // תוכל לשים פה production כתובת
  })

  console.log("🆕 תוצאה מה-createUser:", { newUser, signUpError })

  if (signUpError || !newUser?.user?.id) {
    console.error('❌ שגיאה ביצירת יוזר:', signUpError)
    return NextResponse.json(
      { error: signUpError?.message || 'בעיה לא ידועה ביצירה' },
      { status: 500 }
    )
  }

  // עידכון metadata (למקרה שב־createUser לא נקלט)
  const { error: metadataUpdateError } = await supabaseAdmin.auth.admin.updateUserById(
    newUser.user.id,
    {
      user_metadata: {
        role,
        full_name,
      },
    }
  )

  if (metadataUpdateError) {
    console.error('⚠️ שגיאה בעדכון metadata:', metadataUpdateError)
    return NextResponse.json({ error: 'נוצר משתמש אך לא הוגדר לו role' }, { status: 200 })
  }

  // שליחת מייל אימות
  const { error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)

  if (inviteError) {
    console.error('⚠️ שגיאה בשליחת מייל:', inviteError)
    return NextResponse.json({ error: 'ההרשמה הצליחה, אך לא נשלח מייל אימות.' }, { status: 200 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
