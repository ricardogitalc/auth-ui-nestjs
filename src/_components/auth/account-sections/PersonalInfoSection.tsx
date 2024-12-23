import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { insertMaskInCpf, insertMaskInPhone } from "@/lib/masks";
import { validateCPF } from "@/lib/validator-cpf";
import { useState } from "react";

interface PersonalInfoSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoSection = ({
  formData,
  onChange,
}: PersonalInfoSectionProps) => {
  const [isCpfValid, setIsCpfValid] = useState(true);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = insertMaskInCpf(e.target.value);
    e.target.value = maskedValue;
    const cpfValue = maskedValue.replace(/\D/g, "");
    setIsCpfValid(cpfValue.length === 0 || validateCPF(cpfValue));
    onChange(e);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = insertMaskInPhone(e.target.value);
    onChange(e);
  };

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Informações pessoais
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <GoogleInput
            name="cpf"
            value={formData.cpf}
            onChange={handleCpfChange}
            placeholder="CPF"
            className={`pl-10 ${!isCpfValid ? "border-red-500" : ""}`}
            maxLength={14}
          />
          {!isCpfValid && (
            <p className="text-red-500 text-sm mt-1">CPF inválido</p>
          )}
        </div>
        <GoogleInput
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="Telefone"
          className="pl-10"
          maxLength={15}
        />
      </div>
    </div>
  );
};
