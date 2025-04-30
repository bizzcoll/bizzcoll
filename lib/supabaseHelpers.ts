import supabaseAdmin from './supabaseAdmin'

export async function sendVerificationEmail(email: string, role: 'INFLUENCER' | 'DEAL_MAKER') {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const formPath = role === 'INFLUENCER' ? '/registration/influencer' : '/registration/deal-maker'
  const fullUrl = `${baseUrl}${formPath}?email=${encodeURIComponent(email)}`

  const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    redirectTo: fullUrl,
  })

  if (error) {
    console.error('❌ שגיאה בשליחת מייל:', error)
    throw new Error('invite_failed')
  }

  return true
}
