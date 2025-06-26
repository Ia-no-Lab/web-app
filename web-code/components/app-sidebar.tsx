import Link from "next/link"
import Image from "next/image"
import smallLogo from "@/public/small-logo.png"

import { createClient } from "@/utils/supabase/server"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Experimentos",
      url: "/home/experimentos",
      iconKey: "flask-conical",
      isActive: true,
      items: [
        { title: "Histórico", url: "#" },
        { title: "Salvos", url: "#" },
      ],
    },
    {
      title: "Chats",
      url: "/home/chat",
      iconKey: "bot",
      items: [{ title: "Histórico", url: "/home/chat/historico" }],
    },
    {
      title: "Tabela Periodica",
      url: "/home/tabela-periodica",
      iconKey: "book-open",
      items: [{ title: "Favoritos", url: "#" }],
    },
  ],
  navSecondary: [
    { title: "Supporte", url: "#", iconKey: "life-buoy" },
    { title: "Feedback", url: "#", iconKey: "send" },
  ],
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const name = user?.user_metadata?.full_name ?? "Usuário"
  const email = user?.email ?? "sem@email.com"
  const avatar = user?.user_metadata?.avatar_url

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center text-sm leading-tight">
              <Link href="/home" className="mr-2 flex items-center gap-2">
                <Image src={smallLogo} alt="Logo" className="h-5 w-auto object-contain" />
                <span className="truncate font-medium">Ia no Lab</span>
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser name={name} email={email} avatar={avatar} />
      </SidebarFooter>
    </Sidebar>
  )
}
