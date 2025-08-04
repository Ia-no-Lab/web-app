// app/api/chat/list/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: chats, error: fetchError } = await supabase
    .from('chats')
    .select('id, title, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  return NextResponse.json({ chats })
}
