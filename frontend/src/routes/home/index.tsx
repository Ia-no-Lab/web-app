import { Outlet, useRouterState } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home/")({
  component: Home,
});

function Home() {
  const route = useRouterState({ select: (s) => s.location.pathname });

  const getBreadcrumbTitle = () => {
    const map: Record<string, string> = {
      "/home": "Início",
      "/home/chat": "Chat",
      "/home/experimentos": "Experimentos",
      "/home/tabela-periodica": "Tabela Periódica",
      "/home/experimentos/vulcao-bicarbonato": "Vulcão de Bicarbonato",
      "/home/experimentos/densidade-liquidos": "Densidade dos Líquidos",
      "/home/experimentos/cromatografia": "Cromatografia",
    };
    return map[route] || "Página";
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-white dark:bg-background">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/home">Painel</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getBreadcrumbTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {route === "/home" && (
            <div className="text-eerie-black space-y-6 max-w-4xl mx-auto text-center py-10">
              <h1 className="text-4xl font-bold">Bem-vindo à Home!</h1>
              <p className="text-lg text-muted-foreground">
                Aqui você pode acessar todas as funcionalidades do Ia no Lab:
                visualizar a tabela periódica, explorar experimentos e conversar
                com a IA.
              </p>
              <p className="text-base">
                Use o menu lateral para navegar entre as seções e aproveitar a
                plataforma.
              </p>
            </div>
          )}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
