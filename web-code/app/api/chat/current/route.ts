import { NextResponse } from 'next/server'
import  supabaseAdmin  from '@/lib/supabaseAdmin'

export const runtime = 'edge';

export async function GET(request: Request) {
  const token = request.headers.get('token')

  if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 })

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)

  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error: fetchError } = await supabaseAdmin
    .from('chats')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (fetchError) {
    return NextResponse.json({ chat: null })
  }

  return NextResponse.json({ chat: data })
}
