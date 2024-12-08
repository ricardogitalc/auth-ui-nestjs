import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function ResetPasswordForm() {
  const [showPasswords, setShowPasswords] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset Password Data:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nova senha</Label>
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
        <Label htmlFor="confirmNewPassword">Confirmar nova senha</Label>
        <div className="relative">
          <Input
            id="confirmNewPassword"
            type={showPasswords ? "text" : "password"}
            placeholder="******"
            required
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
      <Button type="submit" className="w-full">
        Salvar senha
      </Button>
      <p className="text-center text-sm">
        Entrar na sua conta?{" "}
        <Link href="/entrar" className="text-blue-600 hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
