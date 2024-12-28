import Link from "next/link";
import { Button } from "@/_components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { fetchResetPwd } from "@/_auth/client/api-client";
import { Card, CardContent } from "../ui/card";
import { AuthHeader } from "./auth-header";
import { Loader } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
          variant: "error",
          title: "Erro",
          description: response.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "error",
        title: "Erro",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <AuthHeader
        title="Redefinir senha"
        description="O link será enviado para seu email."
      />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Label>Email</Label>
            <Input
              required
              maxLength={50}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader className="animate-spin ml-4" />
            ) : (
              "Enviar email"
            )}
          </Button>
          <Link href={"/entrar"}>
            <Button variant="secondary" className="w-full mt-4">
              Voltar
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
}
