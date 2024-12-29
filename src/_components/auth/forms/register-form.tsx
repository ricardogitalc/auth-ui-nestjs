import { Button } from "@/_components/ui/button";
import { GoogleButton } from "../google-button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchRegister } from "@/_auth/client/api-client";
import { AuthHeader } from "../auth-header";
import { insertMaskInPhone } from "@/lib/helpers/masks";
import { capitalize } from "@/lib/helpers/capitalize-helper";
import { validatePassword, isPasswordStrong } from "@/lib/helpers/pwd-helper";
import { PasswordStrength } from "../../pwd-strength";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { FooterForm } from "../footer-form";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function RegisterForm() {
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
        variant: "error",
        title: "Erro",
        description: "A senha não atende aos requisitos mínimos de segurança",
      });
      return;
    }

    if (formData.password !== confirmPassword) {
      toast({
        variant: "error",
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
          variant: "error",
          title: "Erro",
          description: response.message || "Erro ao realizar cadastro",
        });
      }
    } catch (error: unknown) {
      toast({
        variant: "error",
        title: "Erro",
        description:
          error instanceof Error ? error.message : "Erro ao realizar cadastro",
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <AuthHeader
        title="Crie sua conta"
        description="Preencha os campos abaixo"
      />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Label>Nome</Label>
              <Input
                required
                maxLength={15}
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label>Sobrenome</Label>
              <Input
                required
                maxLength={15}
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
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
            <Label>Senha</Label>
            <Input
              required
              maxLength={15}
              id="password"
              variant="password"
              value={formData.password}
              onChange={handleChange}
            />
            {showHelper && <PasswordStrength validation={passwordValidation} />}
          </div>
          <div className="relative">
            <Label>Confirmar senha</Label>
            <Input
              required
              maxLength={15}
              id="confirmPassword"
              variant="password"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <Label>Telefone</Label>
            <Input
              required
              maxLength={15}
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
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
        <FooterForm text="Já tem uma conta?" linkText="Entrar" href="/entrar" />
      </div>
    </div>
  );
}
