import ChatProvider from '@/components/chat/ChatProvider'

interface PageProps {
  params: { chatId: string }
}

export default async function ChatPage({ params }: PageProps) {
  // aqui o await "resolve" params
  const { chatId } = await params

  return <ChatProvider chatId={chatId} />
}

