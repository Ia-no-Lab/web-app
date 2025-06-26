'use client'

import { useChat } from 'ai/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { Send } from 'lucide-react'
import { useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const suggestions = [
  'O que é um ester?',
  'O que é metanol de butanol?',
  'Explique a diferença entre a metabolização e a catabolização.',
]

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat()

  const handleSuggestionClick = (text: string) => {
    setInput(text)
  }
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-6">
      <div className="flex flex-col w-full max-w-6xl h-[90vh]">
        <ScrollArea className="flex-1 px-6 py-6 space-y-4 text-black">
  {messages.length === 0 ? (
    <div className="space-y-6">
      <div className="text-center text-fern-green space-y-1">
        <p className="text-xl font-medium">Olá! No que posso te ajudar?</p>
        <p className="text-sm text-muted-foreground">Escolha uma sugestão ou digite sua pergunta abaixo.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(suggestion)}
            className="text-left px-4 py-3 bg-gray-100 hover:bg-cream border border-black rounded-md text-sm transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  ) : (
    messages.map((message) => {
      const isUser = message.role === 'user'
      return (
        <div
          key={message.id}
          className={cn('flex', isUser ? 'justify-end' : 'justify-start')}
        >
          <div
            className={cn(
              'rounded-xl px-5 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words max-w-prose',
              isUser
                ? 'bg-black text-white'
                : 'bg-muted text-eerie-black'
            )}
          >
            <ReactMarkdown>
              {message.content}
            </ReactMarkdown>
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
              className="h-16 w-16 border-l border-black rounded-none bg-black text-white hover:bg-gray-900"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
