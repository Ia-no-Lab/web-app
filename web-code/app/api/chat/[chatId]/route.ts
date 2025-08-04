import { createClient } from '@/utils/supabase/server'
import { type NextRequest, NextResponse } from 'next/server'

// Use esta assinatura alternativa
export async function GET(request: NextRequest) {
  try {
    // Extrair chatId da URL
    const chatId = request.nextUrl.pathname.split('/').pop()
    
    if (!chatId) {
      return NextResponse.json({ error: 'Chat ID não fornecido' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { data: chat, error: dbError } = await supabase
      .from('chats')
      .select('messages')
      .eq('id', chatId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (dbError) {
      console.error('Erro ao buscar chat:', dbError)
      return NextResponse.json({ error: 'Erro ao buscar chat' }, { status: 500 })
    }

    return NextResponse.json({ chat })
  } catch (error) {
    console.error('Erro inesperado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' }, 
      { status: 500 }
    )
  }
}