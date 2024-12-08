import { AuthCard } from "@/components/auth/auth-card";

export default function AuthPage() {
  return (
    <>
      <AuthCard
        title="Entrar"
        description="Faça login na sua conta para acessar o sistema"
        href="/entrar"
        buttonText="Fazer login"
      />
      <AuthCard
        title="Cadastro"
        description="Crie uma nova conta para começar a usar o sistema"
        href="/cadastro"
        buttonText="Criar conta"
      />
      <AuthCard
        title="Esqueceu a senha"
        description="Recupere o acesso à sua conta"
        href="/esqueceu-senha"
        buttonText="Recuperar senha"
      />
    </>
  );
}
