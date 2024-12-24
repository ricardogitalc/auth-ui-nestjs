import { Label } from "@/_components/ui/label";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { insertMaskInCpf, insertMaskInPhone } from "@/lib/helpers/masks";
import { validateCPF } from "@/lib/helpers/validator-cpf";
import { validatePhone } from "@/lib/helpers/validator-phone";
import { useState } from "react";
import { Input } from "@/_components/ui/input";

interface PersonalInfoSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoSection = ({
  formData,
  onChange,
}: PersonalInfoSectionProps) => {
  const [isCpfValid, setIsCpfValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = insertMaskInCpf(e.target.value);
    e.target.value = maskedValue;
    const cpfValue = maskedValue.replace(/\D/g, "");
    setIsCpfValid(cpfValue.length === 0 || validateCPF(cpfValue));
    onChange(e);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = insertMaskInPhone(e.target.value);
    e.target.value = maskedValue;
    setIsPhoneValid(maskedValue.length === 0 || validatePhone(maskedValue));
    onChange(e);
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Informações pessoais
        </h2>
        <h2 className="text-sm tracking-tight text-muted-foreground">
          Atualize seus dados pessoais.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">CPF</Label>
            <Input
              name="cpf"
              value={formData.cpf}
              onChange={handleCpfChange}
              placeholder="CPF"
              maxLength={14}
            />
            {!isCpfValid && (
              <p className="text-red-500 text-sm mt-1">CPF inválido</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Telefone</Label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="Telefone"
            maxLength={15}
          />
          {!isPhoneValid && (
            <p className="text-red-500 text-sm mt-1">Telefone inválido</p>
          )}
        </div>
      </div>
    </div>
  );
};
