import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { fetchResetPwdConfirm } from "@/auth/fetch/fetch-client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { AuthHeader } from "./auth-header";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
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
      const response = await fetchResetPwdConfirm(token, formData.newPassword);

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: response.message,
        });
        router.push("/entrar");
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
        description="Digite sua nova senha"
      />
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="newPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="******"
                required
                value={formData.newPassword}
                onChange={handleChange}
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
              <Input
                id="confirmNewPassword"
                type={showPasswords ? "text" : "password"}
                placeholder="******"
                required
                value={formData.confirmNewPassword}
                onChange={handleChange}
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
            {loading ? "Salvando..." : "Salvar senha"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <Link
              href="/entrar"
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
            >
              Entrar na conta
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
