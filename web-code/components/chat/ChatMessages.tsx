'use client'

import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

interface Message {
  id?: string
  role: 'user' | 'assistant' | string
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <>
      {messages.map((message, idx) => {
        const isUser = message.role === 'user'
        return (
          <div key={message.id ?? idx} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
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
      })}
    </>
  )
}
