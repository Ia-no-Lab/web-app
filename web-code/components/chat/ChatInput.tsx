'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

interface ChatInputProps {
  input: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  disabled: boolean
}

export default function ChatInput({ input, onChange, onSubmit, disabled }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="px-6 py-4">
      <div className="flex w-full overflow-hidden rounded-md border border-black">
        <Input
          value={input}
          onChange={onChange}
          placeholder="Digite sua mensagem..."
          className="flex-1 h-16 px-5 py-4 text-base border-none rounded-none focus:outline-none focus:ring-0 bg-white"
          disabled={disabled}
          autoComplete="off"
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !input.trim()}
          className="h-16 w-16 border-l border-black rounded-none bg-black text-white hover:bg-fern-green"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  )
}
