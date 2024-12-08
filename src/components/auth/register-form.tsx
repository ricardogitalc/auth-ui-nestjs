import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleButton } from "./google-button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface RegisterProps {
  onLogin: () => void;
}

export function RegisterForm({ onLogin }: RegisterProps) {
  const [showPasswords, setShowPasswords] = useState(false);

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input id="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" placeholder="Doe" required />
        </div>
      </div>
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
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
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
        <Label htmlFor="whatsapp">Número do WhatsApp</Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="ex: 11999999999"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Criar conta
      </Button>
      <GoogleButton />
      <p className="text-center text-sm">
        Já possui uma conta?{" "}
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
