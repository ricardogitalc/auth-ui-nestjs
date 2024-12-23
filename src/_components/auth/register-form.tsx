import { Button } from "@/_components/ui/button";
import { GoogleButton } from "./google-button";
import { Eye, EyeOff, KeyRound, Loader } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { fetchRegister } from "@/_auth/client/api-client";
import { Card, CardContent } from "../ui/card";
import { AuthHeader } from "./auth-header";
import { GoogleInput } from "../google-input";
import { PasswordToggle } from "../pwd-toggle";
import { insertMaskInPhone } from "@/lib/masks";
import { capitalize } from "@/lib/helpers/capitalize-helper";
import { validatePassword, isPasswordStrong } from "@/lib/helpers/pwd-helper";
import { PasswordStrength } from "../pwd-strength";

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

  const passwordValidation = validatePassword(formData.password);
  const isPasswordValid = isPasswordStrong(passwordValidation);
  const showHelper =
    formData.password &&
    formData.password.length > 0 &&
    !isPasswordStrong(passwordValidation);

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      isPasswordValid &&
      formData.password === confirmPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "A senha não atende aos requisitos mínimos de segurança",
      });
      return;
    }

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
    } else if (id === "phone") {
      setFormData({
        ...formData,
        [id]: insertMaskInPhone(value),
      });
    } else if (id === "firstName" || id === "lastName") {
      setFormData({
        ...formData,
        [id]: capitalize(value),
      });
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
                  required
                  maxLength={15}
                  id="firstName"
                  placeholder="Nome"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <GoogleInput
                  required
                  maxLength={15}
                  id="lastName"
                  placeholder="Sobrenome"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <GoogleInput
                required
                maxLength={50}
                id="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <GoogleInput
                required
                maxLength={15}
                id="password"
                type={showPasswords ? "text" : "password"}
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
              />
              <PasswordToggle
                showPasswords={showPasswords}
                onClick={() => setShowPasswords(!showPasswords)}
              />
            </div>
            {showHelper && <PasswordStrength validation={passwordValidation} />}
          </div>
          <div className="space-y-2">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <GoogleInput
                required
                maxLength={15}
                id="confirmPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="Confirmar senha"
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
                required
                maxLength={15}
                id="phone"
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || !isFormValid()}
          >
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
