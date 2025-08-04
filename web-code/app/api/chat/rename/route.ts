// app/api/chat/rename/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { chatId, title } = await req.json()
  if (!chatId || !title) return NextResponse.json({ error: 'Missing data' }, { status: 400 })

  const { error: updateError } = await supabase
    .from('chats')
    .update({ title })
    .eq('id', chatId)
    .eq('user_id', user.id)

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
