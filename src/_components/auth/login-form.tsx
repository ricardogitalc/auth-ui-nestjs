import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { GoogleButton } from "./google-button";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { loginSession } from "@/_auth/session/auth-session";
import { AuthHeader } from "./auth-header";
import { GoogleInput } from "@/_components/google-input";
import { useSession } from "@/_contexts/session-context";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
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
          variant: "destructive",
          title: "Erro",
          description: response.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message,
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
    <Card className="w-full max-w-[400px] mx-auto">
      <AuthHeader
        title="Bem vindo de volta"
        description="Entre com sua conta para continuar"
      />
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <GoogleInput
              required
              maxLength={50}
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <div className="relative">
              <GoogleInput
                required
                maxLength={15}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff
                    className="h-5 w-5 text-muted-foreground"
                    strokeWidth={2.3}
                  />
                ) : (
                  <Eye
                    className="h-5 w-5 text-muted-foreground"
                    strokeWidth={2.3}
                  />
                )}
              </button>
            </div>
          </div>
          <div className="text-end">
            <Link
              href="/esqueceu-senha"
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
            >
              Esqueceu a senha?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader className="animate-spin ml-4" strokeWidth={1.5} />
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
        <GoogleButton />
        <div className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link
            href="/cadastrar"
            className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
          >
            Cadastrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
