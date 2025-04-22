import { NextRequest, NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'missing_token' }, { status: 401 })
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token)

  if (error || !user) {
    return NextResponse.json({ error: 'invalid_user' }, { status: 401 })
  }

  if (user.user_metadata?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'not_authorized' }, { status: 403 })
  }

  const allUsers = await supabaseAdmin.auth.admin.listUsers()
  return NextResponse.json({ users: allUsers.data?.users || [] })
}
