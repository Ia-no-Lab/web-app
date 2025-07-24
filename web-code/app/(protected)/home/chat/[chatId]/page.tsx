import ChatProvider from '@/components/chat/ChatProvider'

type PageProps = {
  params: Promise<{ chatId: string }>
}

export default async function ChatPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { chatId } = resolvedParams;
  
  return <ChatProvider chatId={chatId} />
}