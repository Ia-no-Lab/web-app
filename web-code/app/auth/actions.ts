'use server'

import { createClient } from '@/utils/supabase/client'

export async function signInWithGoogle() {
  const supabase = createClient()

  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })
}
