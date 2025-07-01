import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function DELETE(req: NextRequest, context: { params: Promise<{ chatId: string }> }) {
  const params = await context.params
  const chatId = params.chatId
  console.log('Chat ID:', chatId)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  console.log('User:', user)

  if (!user) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 })
  }

  // Testar só pelo chatId para isolar
  const { error, data } = await supabase
    .from('chats')
    .delete()
    .eq('id', chatId)
    // .eq('user_id', user.id) // remova temporariamente para teste

  console.log({ error, data })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Chat excluído com sucesso' })
}
