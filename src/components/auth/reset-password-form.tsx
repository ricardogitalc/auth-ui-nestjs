import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResetPasswordProps {
  onLogin: () => void;
}

export function ResetPasswordForm({ onLogin }: ResetPasswordProps) {
  const [showPasswords, setShowPasswords] = useState(false);

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nova senha</Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPasswords ? "text" : "password"}
            placeholder="******"
            required
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
        <Label htmlFor="confirmNewPassword">Confirmar nova senha</Label>
        <div className="relative">
          <Input
            id="confirmNewPassword"
            type={showPasswords ? "text" : "password"}
            placeholder="******"
            required
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
      <Button type="submit" className="w-full">
        Salvar senha
      </Button>
      <p className="text-center text-sm">
        Entrar na sua conta?{" "}
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
