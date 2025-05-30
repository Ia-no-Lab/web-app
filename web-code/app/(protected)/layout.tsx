import "@/app/globals.css";

import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="flex-1">
      {children}
    </main>
  )
}
