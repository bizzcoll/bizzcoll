export type User = {
  id: string
  email: string
  email_confirmed_at: string | null
  created_at: string
  user_metadata?: {
    full_name?: string
    role?: string
    approved?: boolean // ✅ תוסיף את זה
  }
}
