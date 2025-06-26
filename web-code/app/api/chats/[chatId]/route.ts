import { NextRequest, NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'

const isValidUUID = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)

export async function GET(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  const chatId = params.chatId

  if (!isValidUUID(chatId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('chats')
    .select('*')
    .eq('id', chatId)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  const chatId = params.chatId
  const body = await req.json()

  if (!isValidUUID(chatId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  const { messages, title } = body

  const { data, error } = await supabaseAdmin
    .from('chats')
    .update({ messages, title })
    .eq('id', chatId)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chatId: string } }
) {
  const chatId = params.chatId

  if (!isValidUUID(chatId)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('chats')
    .delete()
    .eq('id', chatId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Chat deletado' })
}
