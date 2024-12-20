import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GoogleButton } from "./google-button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { loginSession } from "@/auth/session/auth-session";
import { AuthHeader } from "./auth-header";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginSession(formData);

      if (response.ok) {
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
        title="Entre na sua conta"
        description="Entre com sua conta para continuar"
      />
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
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
            {loading ? "Entrando..." : "Entrar"}
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
