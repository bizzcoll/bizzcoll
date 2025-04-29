import { NextRequest, NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'
import prisma from '@/lib/prisma' // 👈 ייבוא Prisma כדי למחוק דילים

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'missing_token' }, { status: 401 })
  }

  const {
    data: { user: adminUser },
    error,
  } = await supabaseAdmin.auth.getUser(token)

  if (error || !adminUser) {
    return NextResponse.json({ error: 'invalid_user' }, { status: 401 })
  }

  if (adminUser.user_metadata?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'not_authorized' }, { status: 403 })
  }

  const body = await req.json()
  const { user_id } = body

  if (!user_id) {
    return NextResponse.json({ error: 'missing_user_id' }, { status: 400 })
  }

  try {
    // ✅ מחיקה של כל הדילים של המשתמש לפני מחיקת היוזר עצמו
    await prisma.deals.deleteMany({
      where: { business_id: user_id },
    })

    // ✅ מחיקה של היוזר עצמו
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(user_id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error deleting user deals:', err)
    return NextResponse.json({ error: 'Failed to delete user deals' }, { status: 500 })
  }
}
