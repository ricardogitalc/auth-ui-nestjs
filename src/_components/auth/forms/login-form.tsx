import { Button } from "@/_components/ui/button";
import { GoogleButton } from "../google-button";
import { Loader } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { loginSession } from "@/_auth/session/auth-session";
import { AuthHeader } from "../auth-header";
import { useSession } from "@/_contexts/session-context";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { FooterForm } from "../footer-form";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await delay(500);
      const response = await loginSession(formData);

      if (response.ok) {
        if (response.user) {
          login(response.user);
        }
        toast({
          title: "Sucesso",
          variant: "default",
          description: response.message,
        });
        router.push("/");
      } else {
        toast({
          variant: "error",
          title: "Erro",
          description: response.message,
        });
      }
    } catch (error: unknown) {
      toast({
        variant: "error",
        title: "Erro",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <AuthHeader
        title="Bem vindo de volta"
        description="Entre com sua conta para continuar"
      />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Label>Email</Label>
            <Input
              required
              maxLength={50}
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <div className="flex justify-between items-end text-sm pt-6 pb-2 ">
              <label>Senha</label>
              <Link
                href="/esqueceu-senha"
                className="font-semibold text-primary hover:text-primary/70"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              required
              maxLength={15}
              id="password"
              variant="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full my-6" disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
        <GoogleButton />
        <FooterForm
          text="Não tem uma conta?"
          linkText="Cadastrar"
          href="/cadastrar"
        />
      </div>
    </div>
  );
}
