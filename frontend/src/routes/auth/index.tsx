
import { LoginForm } from "@/components/login-form.tsx";

const Auth = () => {
  return (

    //criar if para verificar se o usuário está logado, se logado jogar pro dash, se não jogar pro login
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default Auth;
