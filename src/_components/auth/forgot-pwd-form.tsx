import Link from "next/link";
import { Button } from "@/_components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchResetPwd } from "@/_auth/client/api-client";
import { Card, CardContent } from "../ui/card";
import { AuthHeader } from "./auth-header";
import { Loader, Mail } from "lucide-react";
import { GoogleInput } from "../google-input";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function ForgotPwdForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await delay(500);
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
        description="O link será enviado para seu email."
      />
      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="relative">
              <GoogleInput
                icon={Mail}
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader className="animate-spin ml-4" />
            ) : (
              "Enviar email"
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
