"use client"
 
import { useChat } from '@ai-sdk/react';
 
import { Chat } from "@/components/ui/chat"
 
export default function ChatBot() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
  } = useChat()
 
  return (
    <div className="p-10">
    <Chat
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      isGenerating={isLoading}
      stop={stop}
      append={append}
      suggestions={[
        "Como funciona o ciclo da água?",
        "Qual é a primeira lei de newton?",
        "O que é um Etanóxi de Etanol?",
      ]}
    />
    </div>
  )
}