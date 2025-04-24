// app/api/deals/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(req: NextRequest) {
  const business_id = req.nextUrl.searchParams.get('business_id')
  if (!business_id) {
    return NextResponse.json({ error: 'Missing business_id' }, { status: 400 })
  }
  const deals = await prisma.deals.findMany({
    where: { business_id },
    orderBy: { created_at: 'desc' },
  })
  return NextResponse.json(deals)
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, budget, media_type, business_id } = await req.json()

    if (!business_id) {
      return NextResponse.json({ error: 'Missing business_id' }, { status: 400 })
    }

    const deal = await prisma.deals.create({
      data: {
        title,
        description,
        // אם התקציב הגיע בתור string/number
        budget: budget !== undefined ? new Prisma.Decimal(budget) : undefined,
        media_type,
        business_id,
      },
    })

    return NextResponse.json(deal, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Could not create deal' }, { status: 500 })
  }
}
