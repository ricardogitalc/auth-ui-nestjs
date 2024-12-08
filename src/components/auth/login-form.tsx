import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "./google-button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface LoginProps {
  onRegister: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onRegister, onForgotPassword }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="******"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Eye className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={onForgotPassword}
        className="text-sm text-blue-600 hover:underline"
      >
        Esqueceu a senha?
      </button>

      <Button type="submit" className="w-full">
        Entrar
      </Button>
      <GoogleButton />
      <div className="text-center space-y-2">
        <p className="text-sm">
          Não tem uma conta?{" "}
          <button
            type="button"
            onClick={onRegister}
            className="text-blue-600 hover:underline"
          >
            Criar
          </button>
        </p>
      </div>
    </form>
  );
}
