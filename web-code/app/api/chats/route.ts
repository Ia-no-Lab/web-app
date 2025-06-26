// app/api/chats/route.ts

import { NextRequest, NextResponse } from 'next/server'
import supabaseAdmin from '@/lib/supabaseAdmin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('chats')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title = `Chat em ${new Date().toLocaleString('pt-BR')}`, messages = [] } = body

  const { data, error } = await supabaseAdmin
    .from('chats')
    .insert([{ title, messages }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data) // <-- ESSENCIAL!
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, messages } = body

  if (!id) {
    return NextResponse.json({ error: 'ID do chat é obrigatório' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('chats')
    .update({ messages })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data) 
}
