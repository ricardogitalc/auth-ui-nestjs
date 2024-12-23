import { useState } from "react";
import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { PasswordToggle } from "../../pwd-toggle";
import { PasswordStrength } from "../../pwd-strength";
import { validatePassword, isPasswordStrong } from "@/lib/helpers/pwd-helper";

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
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold tracking-tight">Alterar senha</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="relative">
            <GoogleInput
              name="currentPassword"
              type={showPasswords ? "text" : "password"}
              value={formData.currentPassword}
              onChange={onChange}
              placeholder="Senha atual"
              className="pl-10"
              maxLength={15}
            />
            <PasswordToggle
              showPasswords={showPasswords}
              onClick={() => setShowPasswords(!showPasswords)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <GoogleInput
              name="newPassword"
              type={showPasswords ? "text" : "password"}
              value={formData.newPassword}
              onChange={onChange}
              placeholder="Nova senha"
              className="pl-10"
              maxLength={15}
            />
            <PasswordToggle
              showPasswords={showPasswords}
              onClick={() => setShowPasswords(!showPasswords)}
            />
          </div>
          {showHelper && <PasswordStrength validation={passwordValidation} />}
        </div>
      </div>
    </div>
  );
};
