import { Eye, EyeOff, KeyRound, Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "@/_components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { fetchResetPwdConfirm } from "@/_auth/client/api-client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { AuthHeader } from "./auth-header";
import { GoogleInput } from "../google-input";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPwdForm({ token }: ResetPasswordFormProps) {
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
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
      const response = await fetchResetPwdConfirm(token, formData.newPassword);

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: response.message,
        });
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
        title="Definir nova senha"
        description="Defina sua nova senha abaixo."
      />
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="relative">
              <GoogleInput
                icon={KeyRound}
                id="newPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="Nova senha"
                required
                value={formData.newPassword}
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
                icon={KeyRound}
                id="confirmNewPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="Confirmar senha"
                required
                value={formData.confirmNewPassword}
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader className="animate-spin ml-4" />
            ) : (
              "Definir nova senha"
            )}
          </Button>
          <Link href={"/entrar"}>
            <Button variant="outline" className="w-full mt-4">
              Voltar
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
