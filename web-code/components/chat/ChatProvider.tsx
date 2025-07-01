'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat, type Message } from '@ai-sdk/react' // importando Message do SDK
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import ReactMarkdown from 'react-markdown'
import { v4 as uuidv4 } from 'uuid'
import { ChatHeader } from './ChatHeader'

interface ChatProviderProps {
  chatId: string
}

export default function ChatProvider({ chatId }: ChatProviderProps) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [token, setToken] = useState<string | null>(null)
  const [currentChatId, setCurrentChatId] = useState(chatId)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleChatSubmit,
    setMessages,
    isLoading,
    setInput,
  } = useChat()

  // Scroll suave ao atualizar mensagens
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Pega token da sessão no supabase client (rodar só 1x)
  useEffect(() => {
    async function fetchSessionToken() {
      const supabase = await createClient()
      const { data } = await supabase.auth.getSession()
      setToken(data.session?.access_token ?? null)
    }
    fetchSessionToken()
  }, [])

  // Quando trocar chatId ou token, busca mensagens do chat salvo
  useEffect(() => {
    if (!currentChatId || !token) return

    const fetchChat = async () => {
      try {
        const res = await fetch(`/api/chat/${currentChatId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!res.ok) {
          console.error('Erro ao carregar chat')
          setMessages([]) // limpa mensagens para evitar UI bug
          return
        }

        const data = await res.json()
        setMessages(data.chat?.messages ?? [])
      } catch (err) {
        console.error('Erro ao buscar chat:', err)
      }
    }

    fetchChat()
  }, [currentChatId, token, setMessages])

  // Envio de mensagem (com controle de estado e salvamento)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!input.trim() || !token) return

  setInput('') // Limpa input antes do envio

  await handleChatSubmit(e) // deixa o hook adicionar mensagens internamente

  // Espera um tick para garantir que o estado messages está atualizado
  await new Promise(resolve => setTimeout(resolve, 0))

  // Agora salva as mensagens atuais, que já incluem usuário e IA
  const res = await fetch('/api/chat/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      chatId: currentChatId,
      messages: messages,
      title: currentChatId ? undefined : `Chat em ${new Date().toLocaleString('pt-BR')}`,
    }),
  })

  const data = await res.json()

  // Se criou um novo chat, atualiza ID e rota
  if (!currentChatId && data.chatId) {
    setCurrentChatId(data.chatId)
    router.replace(`/home/chat/${data.chatId}`)
  }
}

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-6">
      <ChatHeader/>
      <div className="flex flex-col w-full max-w-6xl h-[90vh]">
        <ScrollArea className="flex-1 px-6 py-6 space-y-4 text-black overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-fern-green space-y-1">
              <p className="text-xl font-medium">Olá! No que posso te ajudar?</p>
              <p className="text-sm text-muted-foreground">Digite uma mensagem para começar ou escolha uma sugestão.</p>
            </div>
          ) : (
            messages.map((message) => {
              const isUser = message.role === 'user'
              return (
                <div key={message.id} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'rounded-xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words max-w-prose',
                      isUser ? 'bg-black text-white' : 'bg-muted text-eerie-black'
                    )}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
              )
            })
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="text-sm px-4 py-3 flex gap-2 items-center bg-muted text-muted-foreground rounded-xl">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full animate-bounce bg-slate-400" />
                  <div className="h-2 w-2 rounded-full animate-bounce bg-slate-400" style={{ animationDelay: '0.1s' }} />
                  <div className="h-2 w-2 rounded-full animate-bounce bg-slate-400" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </ScrollArea>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="flex w-full overflow-hidden rounded-md border border-black">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Digite sua mensagem..."
              className="flex-1 h-16 px-5 py-4 text-base border-none rounded-none focus:outline-none focus:ring-0 bg-white"
              disabled={isLoading}
              autoComplete="off"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="h-16 w-16 border-l border-black rounded-none bg-black text-white hover:bg-fern-green"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
