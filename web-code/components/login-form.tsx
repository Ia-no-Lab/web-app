'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { LogIn } from 'lucide-react'

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  async function handleGoogleLogin() {
    const supabase = createClient()
    setLoading(true)

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account',
        },
      },
    });
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
          {loading ? 'Redirecionando...' : (
            <>
              <LogIn size={20} />
              Entrar com Google
            </>
          )}
        </Button>
        <CardDescription className="text-sm text-neutral-700 mt-5">
         Ao criar uma conta, você concorda com nossos <a href="/normas" className="text-fern-green">Termos de Uso</a> e <a href="/privacidade" className="text-fern-green">Política de Privacidade</a>.
        </CardDescription>
      </CardContent>
    </Card>
  )
}
