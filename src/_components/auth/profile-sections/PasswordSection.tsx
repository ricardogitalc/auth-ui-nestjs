import { ProfileFormData } from "@/_auth/types/auth.types";
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
  const passwordValidation = validatePassword(formData?.newPassword || "");
  const showHelper =
    formData?.newPassword &&
    formData.newPassword.length > 0 &&
    !isPasswordStrong(passwordValidation);

  return (
    <div>
      <div className="flex flex-col items-start justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Senha</h2>
        <h2 className="text-sm tracking-tight text-text-foreground">
          Atualize sua senha de acesso.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Label>Senha atual</Label>
          <Input
            name="currentPassword"
            variant="password"
            value={formData.currentPassword}
            onChange={onChange}
            placeholder="•••••••••••••••"
            maxLength={15}
          />
        </div>
        <div className="relative">
          <Label>Nova senha</Label>
          <Input
            name="newPassword"
            variant="password"
            value={formData.newPassword}
            onChange={onChange}
            placeholder="•••••••••••••••"
            maxLength={15}
          />
        </div>
        {showHelper && <PasswordStrength validation={passwordValidation} />}
      </div>
    </div>
  );
};
