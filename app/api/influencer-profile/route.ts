import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get('user_id')

  if (!user_id) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
  }

  try {
    const profile = await prisma.influencer_profiles.findUnique({
      where: { user_id },
    })

    return NextResponse.json(profile)
  } catch (err) {
    console.error('❌ Error fetching influencer profile:', err)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
    try {
      const {
        user_id,
        full_name,
        bio,
        links,
        profile_url,
        cover_url,
      } = await req.json()
  
      console.log('📥 POST payload:', { user_id, full_name, bio, links, profile_url, cover_url })
  
      if (!user_id || !full_name) {
        console.error('❌ Missing fields:', { user_id, full_name })
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }
  
      const profile = await prisma.influencer_profiles.upsert({
        where: { user_id },
        update: {
          full_name,
          bio,
          links,
          profile_url,
          cover_url,
        },
        create: {
          user_id,
          full_name,
          bio,
          links,
          profile_url,
          cover_url,
        },
      })
  
      console.log('✅ Profile saved:', profile)
  
      return NextResponse.json(profile)
    } catch (err: any) {
      console.error('❌ Error in influencer-profile POST:', err.message || err)
      return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
    }
  }
  
