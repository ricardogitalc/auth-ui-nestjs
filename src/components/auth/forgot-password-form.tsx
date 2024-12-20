import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchResetPwd } from "@/auth/fetch/fetch-client";
import { Card, CardContent } from "../ui/card";
import { AuthHeader } from "./auth-header";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetchResetPwd(email);

      if (response.ok) {
        toast({
          title: "Sucesso",
          variant: "default",
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

  return (
    <Card className="w-full max-w-[400px] mx-auto">
      <AuthHeader
        title="Redefinir senha"
        description="Digite seu email para redefinir sua senha"
      />
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="exemplo@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Redefinir senha"}
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
