'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface Chat {
  id: string
  title: string
  created_at: string
}

export const runtime = 'edge';


export default function HistoricoChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const router = useRouter()

  // Carrega chats do backend via API
  useEffect(() => {
    async function fetchChats() {
      const supabase = createClient()
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData.session?.access_token

      if (!token) {
        // Talvez redirecionar para login ou avisar usuário
        console.warn('Usuário não autenticado')
        return
      }

      const res = await fetch('/api/chat/list', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        console.error('Erro ao carregar histórico')
        return
      }

      const json = await res.json()
      setChats(json.chats || [])
    }

    fetchChats()
  }, [])

  // Renomear chat
  const handleRename = async (chatId: string) => {
    if (!newTitle.trim()) return

    const res = await fetch('/api/chat/rename', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatId, title: newTitle }),
    })

    if (!res.ok) {
      alert('Erro ao renomear chat')
      return
    }

    setChats((prev) =>
      prev.map((c) => (c.id === chatId ? { ...c, title: newTitle } : c))
    )
    setEditingId(null)
  }

  // Excluir chat com confirmação
 const handleDelete = async (chatId: string) => {
  if (!confirm('Deseja excluir este chat?')) return

  const res = await fetch(`/api/chat/delete/${chatId}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const error = await res.json()
    alert(`Erro ao excluir chat: ${error.error || 'Desconhecido'}`)
    return
  }

  setChats((prev) => prev.filter((c) => c.id !== chatId))
}


  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Histórico de Chats</h1>

      {chats.length === 0 && (
        <p className="text-center text-gray-500">Você ainda não tem chats salvos.</p>
      )}

      <ul className="space-y-4">
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="flex items-center justify-between border p-3 rounded-md"
          >
            {editingId === chat.id ? (
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename(chat.id)
                }}
                autoFocus
                className="flex-1"
              />
            ) : (
              <button
                onClick={() => router.push(`/home/chat/${chat.id}`)}
                className="flex-1 text-left hover:underline"
              >
                {chat.title}
              </button>
            )}

            <div className="flex items-center gap-2 ml-2">
              {editingId === chat.id ? (
                <Button size="sm" onClick={() => handleRename(chat.id)}>
                  Salvar
                </Button>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setEditingId(chat.id)
                    setNewTitle(chat.title)
                  }}
                  aria-label="Editar título"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              )}

              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(chat.id)}
                aria-label="Excluir chat"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button
          onClick={() => router.push('/home/chat/novo')}
          className="w-full"
        >
          + Novo Chat
        </Button>
      </div>
    </div>
  )
}
