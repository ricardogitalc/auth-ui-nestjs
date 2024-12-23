import { useState } from "react";
import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { PasswordToggle } from "../../PasswordToggle";

interface PasswordSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordSection = ({
  formData,
  onChange,
}: PasswordSectionProps) => {
  const [showPasswords, setShowPasswords] = useState(false);

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
            />
            <PasswordToggle
              showPasswords={showPasswords}
              onClick={() => setShowPasswords(!showPasswords)}
            />
          </div>
        </div>
        <div className="relative">
          <div className="relative">
            <GoogleInput
              name="newPassword"
              type={showPasswords ? "text" : "password"}
              value={formData.newPassword}
              onChange={onChange}
              placeholder="Nova senha"
              className="pl-10"
            />
            <PasswordToggle
              showPasswords={showPasswords}
              onClick={() => setShowPasswords(!showPasswords)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
