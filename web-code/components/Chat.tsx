'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useChat } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'

interface ChatProps {
  chatId: string | null
}

export default function Chat({ chatId }: ChatProps) {
  const router = useRouter()
  const [currentChatId, setCurrentChatId] = useState(chatId)

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit: handleChatSubmit,
    isLoading,
    setMessages,
  } = useChat()

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!currentChatId) return

    async function loadChat() {
      try {
        const res = await fetch(`/api/chats/${currentChatId}`)
        if (!res.ok) throw new Error('Falha ao carregar chat')
        const data = await res.json()
        setMessages(data.messages || [])
      } catch (e) {
        console.error(e)
      }
    }
    loadChat()
  }, [currentChatId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    try {
      const payload = {
        id: currentChatId || undefined,
        messages: [...messages, { role: 'user', content: input }],
        title: !currentChatId ? `Chat em ${new Date().toLocaleString('pt-BR')}` : undefined,
      }

      const res = await fetch('/api/chats', {
        method: currentChatId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Erro ao salvar chat: ${errorText || 'Resposta vazia'}`)
      }

      const data = await res.json()

      if (data?.messages) setMessages(data.messages)

      if (data?.id && !currentChatId) {
        setCurrentChatId(data.id)
        router.replace(`/chat/${data.id}`)
      }

      await handleChatSubmit(e)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-6">
      <div className="flex flex-col w-full max-w-6xl h-[90vh]">
        <ScrollArea className="flex-1 px-6 py-6 space-y-4 text-black overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-fern-green space-y-1">
              <p className="text-xl font-medium">Olá! No que posso te ajudar?</p>
              <p className="text-sm text-muted-foreground">Digite uma mensagem para começar ou escolha uma sugestão.</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isUser = message.role === 'user'
              return (
                <div key={message.id || index} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
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
