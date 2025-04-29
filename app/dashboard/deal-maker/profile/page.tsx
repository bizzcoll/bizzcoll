'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import BusinessProfileForm from './components/BusinessProfileForm'
import BusinessProfilePreview from './components/BusinessProfilePreview'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

type Profile = {
  name: string
  description?: string
  category?: string
  phone?: string
  website?: string
  logo_url?: string
  cover_url?: string
  logo_url_path?: string
  cover_url_path?: string
  collaborationsCount?: number
}

export default function BusinessProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile>({
    name: '',
    description: '',
    category: '',
    phone: '',
    website: '',
    logo_url: '',
    cover_url: '',
    collaborationsCount: 0,
  })
  const [loading, setLoading] = useState(false)
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null)
  const [selectedCover, setSelectedCover] = useState<File | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.replace('/auth')
        return
      }

      const id = session.user.id
      setBusinessId(id)

      const res = await fetch(`/api/business-profile?business_id=${id}`)
      if (res.ok) {
        const data = await res.json()
        if (data) {
          const { logo_url, cover_url, collaborationsCount, ...rest } = data

          const logoSignedUrl = logo_url
            ? (await supabase.storage.from('business-assets').createSignedUrl(logo_url, 3600)).data?.signedUrl
            : ''

          const coverSignedUrl = cover_url
            ? (await supabase.storage.from('business-assets').createSignedUrl(cover_url, 3600)).data?.signedUrl
            : ''

          setProfile({
            ...rest,
            logo_url: logoSignedUrl,
            cover_url: coverSignedUrl,
            collaborationsCount: collaborationsCount ?? 0,
          })
        }
      }
    }

    fetchProfile()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo_url' | 'cover_url') => {
    const file = e.target.files?.[0]
    if (!file || !businessId) return

    if (field === 'logo_url') setSelectedLogo(file)
    if (field === 'cover_url') setSelectedCover(file)

    const uploadResult = await supabase.storage
      .from('business-assets')
      .upload(`${businessId}/${field}-${Date.now()}`, file, { upsert: true })

    if (uploadResult.error) {
      toast.error('שגיאה בהעלאת תמונה')
      return
    }

    const uploadedPath = uploadResult.data?.path
    if (!uploadedPath) return

    const signedUrlResult = await supabase.storage
      .from('business-assets')
      .createSignedUrl(uploadedPath, 3600)

    if (!signedUrlResult.data?.signedUrl) {
      toast.error('שגיאה בחתימת קובץ')
      return
    }

    setProfile(prev => ({
      ...prev,
      [field]: signedUrlResult.data!.signedUrl,
      [`${field}_path`]: uploadedPath,
    }))
  }

  const handleSave = async () => {
    if (!businessId) return

    setLoading(true)

    const extractPath = (url: string | undefined) => {
      if (!url) return ''
      const parts = url.split('/object/sign/business-assets/')
      if (parts.length > 1) {
        return parts[1].split('?')[0]
      }
      return url
    }

    const res = await fetch('/api/business-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        business_id: businessId,
        name: profile.name,
        description: profile.description,
        category: profile.category,
        phone: profile.phone,
        website: profile.website,
        logo_url: profile.logo_url_path || extractPath(profile.logo_url),
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
        <BusinessProfilePreview profile={profile} />
        <BusinessProfileForm
          profile={profile}
          selectedLogo={selectedLogo}
          selectedCover={selectedCover}
          handleChange={handleChange}
          handleUpload={handleUpload}
          setSelectedLogo={setSelectedLogo}
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
