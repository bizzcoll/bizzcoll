import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }

  if (data) {
    return NextResponse.json({ exists: true }, { status: 200 })
  }

  return NextResponse.json({ exists: false }, { status: 200 })
}
