import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "@/_components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { fetchResetPwdConfirm } from "@/_auth/client/api-client";
import { AuthHeader } from "./auth-header";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { validatePassword, isPasswordStrong } from "@/lib/helpers/pwd-helper";
import { PasswordStrength } from "../pwd-strength";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPwdForm({ token }: ResetPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const passwordValidation = validatePassword(formData.newPassword);
  const isPasswordValid = isPasswordStrong(passwordValidation);
  const showHelper =
    formData.newPassword &&
    formData.newPassword.length > 0 &&
    !isPasswordStrong(passwordValidation);

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

    if (formData.newPassword !== formData.confirmNewPassword) {
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
      const response = await fetchResetPwdConfirm(token, formData.newPassword);

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: response.message,
        });
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
        title="Definir nova senha"
        description="Defina sua nova senha abaixo."
      />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Label>Nova senha</Label>
            <Input
              required
              maxLength={15}
              id="newPassword"
              variant="password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {showHelper && <PasswordStrength validation={passwordValidation} />}
          </div>
          <div className="relative">
            <Label>Confirmar senha</Label>
            <Input
              required
              maxLength={15}
              id="confirmNewPassword"
              variant="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={
              loading || !isPasswordValid || !formData.confirmNewPassword
            }
          >
            {loading ? (
              <Loader className="animate-spin ml-4" />
            ) : (
              "Salvar senha"
            )}
          </Button>
          <Link href={"/entrar"}>
            <Button variant="secondary" className="w-full mt-4">
              Entrar
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
