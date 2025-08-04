import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server' 

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Usuário não autenticado.' }, { status: 401 })
  }

  // Criar chat no banco...
  const { data, error } = await supabase
    .from('chats')
    .insert([{ title: 'Novo chat', user_id: user.id }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ chatId: data.id })
}
