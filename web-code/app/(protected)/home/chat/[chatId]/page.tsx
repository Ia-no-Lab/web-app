import Chat from '@/components/Chat'

interface PageProps {
  params: { chatId: string }
}

export default function ChatPage({ params }: PageProps) {
  return <Chat chatId={params.chatId} />
}
