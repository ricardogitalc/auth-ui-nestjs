import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";

interface PersonalInfoSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoSection = ({
  formData,
  onChange,
}: PersonalInfoSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Informações pessoais
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <GoogleInput
          name="cpf"
          value={formData.cpf}
          onChange={onChange}
          placeholder="CPF"
          className="pl-10"
        />
        <GoogleInput
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="Telefone"
          className="pl-10"
        />
      </div>
    </div>
  );
};
