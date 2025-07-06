import ChatProvider from '@/components/chat/ChatProvider'

export default async function ChatPage({ params }: { params: { chatId: string } }) {
  return <ChatProvider chatId={params.chatId} />
}
