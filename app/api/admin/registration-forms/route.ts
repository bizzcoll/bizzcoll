import { NextRequest, NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 })
    }

    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ✅ שליפה רק של טפסים שטרם נסקרו
    const { data, error: dbError } = await supabaseAdmin
      .from('registrationForm')
      .select('*')
      .eq('reviewed', false)
      .order('created_at', { ascending: false })

    if (dbError) {
      console.error('❌ DB Error:', dbError.message)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ forms: data })
  } catch (err: any) {
    console.error('🔥 Unexpected Error:', err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
