import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const business_id = req.nextUrl.searchParams.get('business_id')
  if (!business_id) return NextResponse.json({ error: 'Missing business_id' }, { status: 400 })

  const profile = await prisma.business_profiles.findUnique({ where: { business_id } })
  return NextResponse.json(profile)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { business_id, name, description, category, phone, website, logo_url, cover_url } = body

  if (!business_id || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const profile = await prisma.business_profiles.upsert({
    where: { business_id },
    update: { name, description, category, phone, website, logo_url, cover_url },
    create: { business_id, name, description, category, phone, website, logo_url, cover_url },
  })

  return NextResponse.json(profile)
}
