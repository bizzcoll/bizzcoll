import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

type Context = {
  params: {
    id: string
  }
}

// מחיקה
export async function DELETE(req: NextRequest, { params }: Context) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ error: 'Missing deal ID' }, { status: 400 })
  }

  try {
    await prisma.deals.delete({ where: { id } })
    return NextResponse.json({ message: 'Deal deleted successfully!' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 })
  }
}

// עדכון
export async function PATCH(req: NextRequest, { params }: Context) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ error: 'Missing deal ID' }, { status: 400 })
  }

  const data = await req.json()

  try {
    const updatedDeal = await prisma.deals.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        min_budget: data.min_budget !== undefined ? new Prisma.Decimal(data.min_budget) : undefined,
        max_budget: data.max_budget !== undefined ? new Prisma.Decimal(data.max_budget) : undefined,
        budget: data.max_budget !== undefined ? new Prisma.Decimal(data.max_budget) : undefined,
        media_type: data.media_type,
        closing_date: data.closing_date ? new Date(data.closing_date) : undefined,
      },
    })

    return NextResponse.json(updatedDeal, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 })
  }
}
