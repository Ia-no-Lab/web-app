import ChatProvider from '@/components/chat/ChatProvider'

interface PageProps {
  params: { chatId: string }
}

export default async function ChatPage({ params }: PageProps) {
  const { chatId } = params

  return <ChatProvider chatId={chatId} />
}
