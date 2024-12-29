import { Check, X } from "lucide-react";
import type { PasswordValidation } from "@/lib/helpers/pwd-helper";

interface PasswordStrengthProps {
  validation: PasswordValidation;
}

export const PasswordStrength = ({ validation }: PasswordStrengthProps) => {
  const requirements = [
    { key: "hasMinLength", label: "Mínimo 8 caracteres" },
    { key: "hasSpecialChar", label: "Pelo menos um caractere especial" },
    { key: "hasNumberAndLetter", label: "Letras e números" },
    { key: "hasUpperCase", label: "Pelo menos uma letra maiúscula" },
  ];

  return (
    <div className="mt-2 space-y-1 text-sm">
      {requirements.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-2">
          {validation[key as keyof PasswordValidation] ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <X className="w-4 h-4 text-error" />
          )}
          <span
            className={
              validation[key as keyof PasswordValidation]
                ? "text-success"
                : "text-error"
            }
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};
