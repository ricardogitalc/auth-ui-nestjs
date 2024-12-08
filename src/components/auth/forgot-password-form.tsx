import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordProps {
  onLogin: () => void;
}

export function ForgotPasswordForm({ onLogin }: ForgotPasswordProps) {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="exemplo@gmail.com"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Redefinir senha
      </Button>
      <p className="text-center text-sm">
        Lembra sua senha?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="text-blue-600 hover:underline"
        >
          Entrar
        </button>
      </p>
    </form>
  );
}
