'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import InfluencerProfileForm from './components/InfluencerProfileForm'
import InfluencerProfilePreview from './components/InfluencerProfilePreview'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

type Profile = {
  full_name: string
  bio?: string
  links?: string
  profile_url?: string
  cover_url?: string
  profile_url_path?: string
  cover_url_path?: string
  collaborationsCount?: number
}

export default function InfluencerProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    bio: '',
    links: '',
    profile_url: '',
    cover_url: '',
    collaborationsCount: 0,
  })
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<File | null>(null)
  const [selectedCover, setSelectedCover] = useState<File | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.replace('/auth')
        return
      }

      const id = session.user.id
      setUserId(id)

      const res = await fetch(`/api/influencer-profile?user_id=${id}`)
      if (!res.ok) return

      const data = await res.json()

      if (data) {
        const {
          full_name = '',
          bio = '',
          links = '',
          profile_url = '',
          cover_url = '',
          collaborationsCount = 0,
        } = data

        const profileSignedUrl = profile_url
          ? (await supabase.storage.from('influencer-assets').createSignedUrl(profile_url, 3600)).data?.signedUrl
          : ''

        const coverSignedUrl = cover_url
          ? (await supabase.storage.from('influencer-assets').createSignedUrl(cover_url, 3600)).data?.signedUrl
          : ''

        setProfile({
          full_name,
          bio,
          links,
          profile_url: profileSignedUrl,
          cover_url: coverSignedUrl,
          collaborationsCount,
          profile_url_path: profile_url,
          cover_url_path: cover_url,
        })
      }
    }

    fetchProfile()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'profile_url' | 'cover_url'
  ) => {
    const file = e.target.files?.[0]
    if (!file || !userId) {
      toast.error('חסר קובץ או מזהה משתמש')
      return
    }
  
    // שמור קובץ נבחר (לצד הטופס)
    if (field === 'profile_url') setSelectedProfile(file)
    if (field === 'cover_url') setSelectedCover(file)
  
    const path = `${userId}/${field}-${Date.now()}`
    console.log('📂 Attempting to upload to path:', path)
  
    const { data, error } = await supabase.storage
      .from('influencer-assets')
      .upload(path, file, { upsert: true })
  
    if (error) {
      console.error('❌ Upload error:', error.message)
      toast.error(`שגיאה בהעלאת תמונה: ${error.message}`)
      return
    }
  
    const signed = await supabase.storage
      .from('influencer-assets')
      .createSignedUrl(data.path, 3600)
  
    if (!signed.data?.signedUrl) {
      toast.error('שגיאה בחתימת קובץ')
      return
    }
  
    setProfile(prev => ({
      ...prev,
      [field]: signed.data!.signedUrl,
      [`${field}_path`]: data.path,
    }))
  
    toast.success('✅ תמונה הועלתה בהצלחה')
  }
  

  const handleSave = async () => {
    if (!userId) return

    setLoading(true)

    const extractPath = (url: string | undefined) => {
      if (!url) return ''
      const parts = url.split('/object/sign/influencer-assets/')
      return parts.length > 1 ? parts[1].split('?')[0] : url
    }

    const res = await fetch('/api/influencer-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        full_name: profile.full_name,
        bio: profile.bio,
        links: profile.links,
        profile_url: profile.profile_url_path || extractPath(profile.profile_url),
        cover_url: profile.cover_url_path || extractPath(profile.cover_url),
      }),
    })

    if (res.ok) {
      toast.success('הפרופיל נשמר בהצלחה!')
    } else {
      toast.error('אירעה שגיאה')
    }

    setLoading(false)
  }

  return (
    <>
      <main className="flex flex-col lg:flex-row gap-12 justify-center items-start w-full max-w-6xl mx-auto my-8 px-6">
        <InfluencerProfilePreview profile={profile} />
        <InfluencerProfileForm
          profile={profile}
          selectedProfile={selectedProfile}
          selectedCover={selectedCover}
          handleChange={handleChange}
          handleUpload={handleUpload}
          setSelectedProfile={setSelectedProfile}
          setSelectedCover={setSelectedCover}
        />
      </main>

      <div className="w-full flex justify-center mt-12 mb-8">
        <Button onClick={handleSave} disabled={loading} className="px-8 py-3 text-lg hover:scale-105 transition-transform duration-300">
          {loading ? 'שומר...' : 'שמור שינויים'}
        </Button>
      </div>
    </>
  )
}
