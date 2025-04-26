import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '4')
  const skip = (page - 1) * limit
  const now = new Date()

  try {
    const [deals, total] = await Promise.all([
      prisma.deals.findMany({
        where: {
          closing_date: {
            gt: now,
          },
        },
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          budget: true,
          min_budget: true,    // הוספנו min_budget
          max_budget: true,    // הוספנו max_budget
          media_type: true,
          created_at: true,
          image_paths: true,
          users: {
            select: {
              full_name: true, // ✅ שם העסק
            },
          },
        },
      }),
      prisma.deals.count({
        where: {
          closing_date: {
            gt: now,
          },
        },
      }),
    ])

    return NextResponse.json({ deals, total })
  } catch (error) {
    console.error('Error fetching deals:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
