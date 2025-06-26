'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ChatSummary {
  id: string
  title: string
  updated_at: string
}

export default function Historico() {
  const [chats, setChats] = useState<ChatSummary[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchChats() {
      const res = await fetch('/api/chats')
      if (!res.ok) {
        console.error('Erro ao buscar histórico')
        return
      }
      const data = await res.json()
      setChats(data)
    }
    fetchChats()
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Histórico de Chats</h1>
      <ul>
        {chats.map(chat => (
          <li
            key={chat.id}
            className="cursor-pointer p-2 border-b hover:bg-gray-100"
            onClick={() => router.push(`/chat/${chat.id}`)}
          >
            <strong>{chat.title || 'Chat sem título'}</strong>
            <div className="text-sm text-gray-500">{new Date(chat.updated_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
