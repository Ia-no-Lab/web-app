import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
  const supabase = await createClient()

  await supabase.auth.getUser() 

  return NextResponse.redirect("/home")
}
