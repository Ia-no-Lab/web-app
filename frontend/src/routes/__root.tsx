import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "@/components/Header"
import Footer from "@/components/Footer"
const route = useRouterState({ select: (s) => s.location.pathname });
const isDashboard = route.startsWith("/home");
export const Route = createRootRoute({
	
  component: () => (
    <div className="min-h-screen flex flex-col">
      <nav>{!isDashboard && <Header />}</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
      {!isDashboard && <Footer />}
    </div>
  ),
});
