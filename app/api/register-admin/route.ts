import { NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import type { User } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const { full_name, email, password, secret } = await req.json()

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: usersResponse } = await supabaseAdmin.auth.admin.listUsers()
  const users = usersResponse?.users as User[]
  const exists = users.find((user) => user.email === email)

  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: {
      full_name,
      role: 'ADMIN',
    },
  })

  // ✅ שלב קריטי – עדכון שהמייל אומת ידנית
  if (data?.user?.id) {
    await supabaseAdmin.auth.admin.updateUserById(data.user.id, {
      email_confirm: true,
    })
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: 'Admin created successfully', user: data.user })
}
