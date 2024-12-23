import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { capitalize } from "@/lib/helpers/capitalize-helper";

interface AccountSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AccountSection = ({ formData, onChange }: AccountSectionProps) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    e.target.value = capitalize(value);
    onChange(e);
  };

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Detalhes da conta
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <GoogleInput
          required
          maxLength={15}
          name="firstName"
          value={formData.firstName}
          onChange={handleNameChange}
          placeholder="Nome"
          className="pl-10"
        />
        <GoogleInput
          required
          maxLength={15}
          name="lastName"
          value={formData.lastName}
          onChange={handleNameChange}
          placeholder="Sobrenome"
          className="pl-10"
        />
      </div>
    </div>
  );
};
