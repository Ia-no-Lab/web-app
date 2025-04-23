import { useRouterState, Outlet } from "@tanstack/react-router"
import Header from "@/src/components/Header"
import Footer from "@/src/components/Footer"

function App() {
  const route = useRouterState({ select: (s) => s.location.pathname })

  const isDashboard = route.startsWith("/home")

  return (
    <div className="min-h-screen flex flex-col">
        <nav>
            {!isDashboard && <Header />}
        </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  )
}

export default App
