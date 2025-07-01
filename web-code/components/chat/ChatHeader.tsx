'use client'

import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function ChatHeader() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    createClient().auth.getSession().then(({ data }) => {
      setToken(data.session?.access_token ?? null)
    })
  }, [])

  async function handleNewChat() {
    if (!token) return

    const res = await fetch('/api/chat/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messages: [],
        title: `Chat em ${new Date().toLocaleString('pt-BR')}`,
      }),
    })

    const data = await res.json()

    if (res.ok && data.chatId) {
      router.push(`/home/chat/${data.chatId}`)
    } else {
      alert('Erro ao criar novo chat')
      console.error(data)
    }
  }

  return (
    <div className="w-full flex justify-end p-4">
      <Button onClick={handleNewChat} variant="outline">
        <Plus className="w-4 h-4 mr-2" />
        Novo chat
      </Button>
    </div>
  )
}
