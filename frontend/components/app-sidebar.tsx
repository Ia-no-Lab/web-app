"use client"

import * as React from "react"
import Link from "next/link";
import Image from "next/image";
import smallLogo from "@/public/small-logo.png"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  FlaskConical
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Experimentos",
      url: "/home/experimentos",
      icon: FlaskConical,
      isActive: true,
      items: [
        {
          title: "Histórico",
          url: "#",
        },
        {
          title: "Salvos",
          url: "#",
        },
      ],
    },
    {
      title: "Chats",
      url: "/home/chat",
      icon: Bot,
      items: [
        {
          title: "Histórico",
          url: "#",
        },
      ],
    },
    {
      title: "Tabela Periodica",
      url: "/home/tabela-periodica",
      icon: BookOpen,
      items: [
        {
          title: "Favoritos",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Supporte",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center text-sm leading-tight">
              <Link href="/home" className="mr-2 flex items-center gap-2">
                <Image
                  src={smallLogo}
                  alt="Logo"
                  className="h-5 w-auto object-contain"
                />
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
