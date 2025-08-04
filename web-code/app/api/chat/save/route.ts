import { NextRequest, NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // Extrai o token do header Authorization
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return NextResponse.json({ error: 'No token' }, { status: 401 })

    const token = authHeader.substring(7) // remove "Bearer "

    // Verifica usuário pelo token
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Pega o body JSON com chatId, messages e title
    const body = await req.json()
    const { chatId, messages, title } = body

    if (!messages || !Array.isArray(messages))
      return NextResponse.json({ error: 'Messages inválidas' }, { status: 400 })

    let data, error

    if (chatId) {
      // Atualiza chat existente (verificando se é do user)
      const update = await supabaseAdmin
        .from('chats')
        .update({ messages, title })
        .eq('id', chatId)
        .eq('user_id', user.id)
        .select()
        .single()

      data = update.data
      error = update.error
    } else {
      // Cria novo chat
      const insert = await supabaseAdmin
        .from('chats')
        .insert({
          user_id: user.id,
          messages,
          title: title || 'Novo chat',
        })
        .select()
        .single()

      data = insert.data
      error = insert.error
    }

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json(
      {
        chatId: data.id,
        messages: data.messages,
        title: data.title,
      },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro interno: ' + (err as Error).message },
      { status: 500 }
    )
  }
}
