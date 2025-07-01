import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { chatId: string } }) {
  const supabase = await createClient()  // << aqui o await

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { chatId } = await params

  const { data: chat, error } = await supabase
    .from('chats')
    .select('messages')
    .eq('id', chatId)
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Erro ao buscar chat:', error)
    return NextResponse.json({ error: 'Erro ao buscar chat' }, { status: 500 })
  }

  return NextResponse.json({ chat })
}
