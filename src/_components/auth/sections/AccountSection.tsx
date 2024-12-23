import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";

interface AccountSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AccountSection = ({ formData, onChange }: AccountSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Detalhes da conta
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <GoogleInput
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          placeholder="Nome"
          className="pl-10"
        />
        <GoogleInput
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          placeholder="Sobrenome"
          className="pl-10"
        />
      </div>
    </div>
  );
};
