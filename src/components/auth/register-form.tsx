import { Button } from "@/components/ui/button";
import { GoogleButton } from "./google-button";
import { Eye, EyeOff, User, Mail, KeyRound, Phone, Loader } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { fetchRegister } from "@/auth/fetch/fetch-client";
import { Card, CardContent } from "../ui/card";
import { AuthHeader } from "./auth-header";
import { GoogleInput } from "../google-input";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function RegisterForm() {
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem",
      });
      return;
    }

    setLoading(true);

    try {
      await delay(500);
      const response = await fetchRegister(formData);

      if (response.ok) {
        toast({
          title: "Sucesso",
          variant: "default",
          description: response.message || "Cadastro realizado com sucesso!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: response.message || "Erro ao realizar cadastro",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Erro ao realizar cadastro",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  return (
    <Card className="w-full max-w-[400px] mx-auto">
      <AuthHeader
        title="Crie sua conta"
        description="Preencha os campos abaixo"
      />
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="relative">
                <GoogleInput
                  // icon={User}
                  id="firstName"
                  placeholder="Nome"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <GoogleInput
                  id="lastName"
                  placeholder="Sobrenome"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <GoogleInput
                // icon={Mail}
                id="email"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <GoogleInput
                // icon={KeyRound}
                id="password"
                type={showPasswords ? "text" : "password"}
                placeholder="Senha"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPasswords ? (
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
          <div className="space-y-2">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <GoogleInput
                // icon={KeyRound}
                id="confirmPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="Confirmar senha"
                required
                value={confirmPassword}
                onChange={handleChange}
                className="pl-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPasswords ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <GoogleInput
                // icon={Phone}
                id="phone"
                type="tel"
                placeholder="Telefone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader className="animate-spin ml-4" /> : "Criar conta"}
          </Button>
        </form>
        <GoogleButton />
        <div className="text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link
            href="/entrar"
            className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
          >
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
