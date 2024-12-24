import { useState } from "react";
import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { PasswordToggle } from "../../pwd-toggle";
import { PasswordStrength } from "../../pwd-strength";
import { validatePassword, isPasswordStrong } from "@/lib/helpers/pwd-helper";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";

interface PasswordSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordValid: boolean;
}

export const PasswordSection = ({
  formData,
  onChange,
}: PasswordSectionProps) => {
  const [showPasswords, setShowPasswords] = useState(false);
  const passwordValidation = validatePassword(formData?.newPassword || "");
  const showHelper =
    formData?.newPassword &&
    formData.newPassword.length > 0 &&
    !isPasswordStrong(passwordValidation);

  return (
    <div>
      <div className="flex flex-col items-start justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Senha</h2>
        <h2 className="text-sm tracking-tight text-muted-foreground">
          Atualize sua senha de acesso.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Senha atual</Label>
              <div className="relative">
                <Input
                  name="currentPassword"
                  type={showPasswords ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={onChange}
                  placeholder="•••••••••••••••"
                  maxLength={15}
                />
                <PasswordToggle
                  showPasswords={showPasswords}
                  onClick={() => setShowPasswords(!showPasswords)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Nova senha</Label>
              <div className="relative">
                <Input
                  name="newPassword"
                  type={showPasswords ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={onChange}
                  placeholder="•••••••••••••••"
                  maxLength={15}
                />
                <PasswordToggle
                  showPasswords={showPasswords}
                  onClick={() => setShowPasswords(!showPasswords)}
                />
              </div>
            </div>
          </div>
          {showHelper && <PasswordStrength validation={passwordValidation} />}
        </div>
      </div>
    </div>
  );
};
