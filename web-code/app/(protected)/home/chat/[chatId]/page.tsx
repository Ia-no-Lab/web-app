import ChatProvider from '@/components/chat/ChatProvider'

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params;
  
  return <ChatProvider chatId={chatId} />
}