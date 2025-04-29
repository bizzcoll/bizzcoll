import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(req: NextRequest) {
  const business_id = req.nextUrl.searchParams.get('business_id')
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1')
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '4')
  const skip = (page - 1) * limit

  if (!business_id) {
    return NextResponse.json({ error: 'Missing business_id' }, { status: 400 })
  }

  try {
    // שליפה עם דילוג (skip) והגבלה (limit)
    const deals = await prisma.deals.findMany({
      where: { business_id },
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        min_budget: true,
        max_budget: true,
        budget: true,
        media_type: true,
        created_at: true,
        image_paths: true,
        closing_date: true,
      },
      skip,
      take: limit,
    })

    // סך הכל דילים
    const total = await prisma.deals.count({
      where: { business_id },
    })

    return NextResponse.json({ deals, total })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Could not fetch deals' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, min_budget, max_budget, media_type, business_id, image_paths, closing_date } = await req.json()

    if (!business_id) {
      return NextResponse.json({ error: 'Missing business_id' }, { status: 400 })
    }

    const finalClosingDate = closing_date
      ? new Date(closing_date)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // ברירת מחדל: 7 ימים קדימה

    const deal = await prisma.deals.create({
      data: {
        title,
        description,
        min_budget: min_budget !== undefined ? new Prisma.Decimal(min_budget) : undefined,
        max_budget: max_budget !== undefined ? new Prisma.Decimal(max_budget) : undefined,
        budget: max_budget !== undefined ? new Prisma.Decimal(max_budget) : undefined,
        media_type,
        business_id,
        image_paths: image_paths || [],
        closing_date: finalClosingDate,
      },
    })

    return NextResponse.json(deal, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Could not create deal' }, { status: 500 })
  }
}
