import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export const runtime = 'edge';

export default async function ChatRootPage() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data: chat, error } = await supabase
    .from('chats')
    .select('id')
    .eq('user_id', session.user.id)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('Erro ao buscar chat:', error)
  }

  if (chat?.id) {
    redirect(`/home/chat/${chat.id}`)
  } else {
    const { data, error: createError } = await supabase
      .from('chats')
      .insert({
        user_id: session.user.id,
        title: `Chat em ${new Date().toLocaleString('pt-BR')}`,
        messages: [],
      })
      .select('id')
      .maybeSingle()

    if (createError || !data?.id) {
      console.error('Erro ao criar chat:', createError)
      redirect('/home/chat/historico')
    }

    redirect(`/home/chat/${data.id}`)
  }
}
