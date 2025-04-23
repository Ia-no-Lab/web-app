import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import smallLogo from "@/assets/small-logo.png";
import React from "react";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const navItems = [
    { title: "Dashboard", url: "/home" },
    { title: "Experimentos", url: "/home/experimentos" },
    { title: "Tabela Periódica", url: "/home/tabela-periodica" },
    { title: "Chat IA", url: "/home/chat" },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/home" className="flex items-center gap-2">
                <img src={smallLogo} alt="IA no Lab" className="h-7 rounded-sm w-auto object-contain" />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-sm">IA no Lab</span>
                  <span className="text-xs text-muted-foreground">Home</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
