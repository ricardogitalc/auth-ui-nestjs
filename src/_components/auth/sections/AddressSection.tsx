import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";

interface AddressSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddressSection = ({ formData, onChange }: AddressSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold tracking-tight">Endereço</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <GoogleInput
          name="zipCode"
          value={formData.zipCode}
          onChange={onChange}
          placeholder="CEP"
          className="pl-10"
        />
        <GoogleInput
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="Cidade"
          className="pl-10"
        />
        <GoogleInput
          name="state"
          value={formData.state}
          onChange={onChange}
          placeholder="Estado"
          className="pl-10"
        />
        <GoogleInput
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Endereço"
          className="pl-10"
        />
        <GoogleInput
          name="number"
          value={formData.number}
          onChange={onChange}
          placeholder="Número"
          className="pl-10"
        />
        <GoogleInput
          name="district"
          value={formData.district}
          onChange={onChange}
          placeholder="Bairro"
          className="pl-10"
        />
      </div>
    </div>
  );
};
