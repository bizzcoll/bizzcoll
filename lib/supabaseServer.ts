// lib/supabaseServer.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * מחזיר Supabase client עם מפתח SERVICE ROLE כדי לאפשר יצירת Signed URLs
 */
export function createClient() {
  return createSupabaseClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
