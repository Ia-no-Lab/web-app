"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signInWithGoogle } from "@/app/auth/actions"
import { LogIn } from "lucide-react"

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  async function handleGoogleLogin() {
    setLoading(true)
    await signInWithGoogle()
  }

  return (
    <Card className="w-full max-w-lg mx-auto text-base">
      <CardHeader>
        <CardTitle className="text-2xl">Entrar para o Ia no Lab</CardTitle>
        <CardDescription className="text-lg">
          Clique abaixo para acessar um mundo de possibilidades com sua conta Google.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-fern-green text-lg py-6"
          disabled={loading}
        >
          {loading ? "Redirecionando..." : (
            <>
              <LogIn size={20} />
              Entrar com Google
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
