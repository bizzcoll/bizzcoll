import supabaseAdmin from '@/lib/supabaseAdmin'

export async function sendVerificationEmail(email: string) {
  const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email`
  })

  if (error) {
    console.error('❌ שגיאה בשליחת מייל אימות:', error)
    throw new Error('invite_failed')
  }

  return true
}
