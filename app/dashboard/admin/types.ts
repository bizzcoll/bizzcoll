export type User = {
    id: string
    email: string
    created_at: string
    email_confirmed_at?: string
    user_metadata: {
      role: string
      full_name?: string
    }
  }
  