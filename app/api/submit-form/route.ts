// 📁 app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, role, fullName, bio, links, businessName, industry, website } = body

  console.log('📨 Received form submission:', body)

  if (!email || !role) {
    console.error('❌ Missing email or role:', { email, role })
    return NextResponse.json({ error: 'Missing email or role' }, { status: 400 })
  }

  try {
    const form = await prisma.registrationForm.create({
      data: {
        email,
        role,
        ...(role === 'INFLUENCER'
          ? {
              fullName,
              bio,
              links,
            }
          : {
              businessName,
              industry,
              website,
            })
      },
    })

    console.log('✅ Form saved successfully:', form)
    return NextResponse.json({ success: true, form })
  } catch (error) {
    console.error('❌ Error saving form:', error)
    return NextResponse.json({ error: 'Failed to save form' }, { status: 500 })
  }
}
