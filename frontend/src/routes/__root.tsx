import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isDashboard = pathname.startsWith("/home");

  return (
    <div className="min-h-screen flex flex-col">
      <nav>{!isDashboard && <Header />}</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
      <TanStackRouterDevtools />
    </div>
  );
}

