import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
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
      <div className="flex flex-col items-start justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Nome Completo</h2>
        <h2 className="text-sm tracking-tight text-muted-foreground">
          Atualize seu nome completo.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-muted-foreground">Nome</Label>
          <Input
            required
            maxLength={15}
            name="firstName"
            value={formData.firstName}
            onChange={handleNameChange}
            placeholder="Nome"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground">Sobrenome</Label>
          <Input
            required
            maxLength={15}
            name="lastName"
            value={formData.lastName}
            onChange={handleNameChange}
            placeholder="Sobrenome"
          />
        </div>
      </div>
    </div>
  );
};
