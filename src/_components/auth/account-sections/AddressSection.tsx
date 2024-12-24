import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { insertMaskInCEP } from "@/lib/helpers/masks";
import { fetchAddressByCEP } from "@/services/viacep";
import { useState } from "react";
import { capitalize } from "@/lib/helpers/capitalize-helper";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";

interface AddressSectionProps {
  formData: ProfileFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: (data: ProfileFormData) => void;
  setIsValidZipCode: (isValid: boolean) => void;
  isValidZipCode: boolean;
}

export const AddressSection = ({
  formData,
  onChange,
  setFormData,
  setIsValidZipCode,
  isValidZipCode,
}: AddressSectionProps) => {
  const [cepError, setCepError] = useState<string | null>(null);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = insertMaskInCEP(e.target.value);
    e.target.value = maskedValue;
    onChange(e);
    setCepError(null);
    setIsValidZipCode(true);

    if (maskedValue.length === 9) {
      try {
        const address = await fetchAddressByCEP(maskedValue);
        setFormData({
          ...formData,
          zipCode: maskedValue,
          city: address.localidade,
          state: address.estado,
        });
        setIsValidZipCode(true);
      } catch (error) {
        setCepError("CEP não encontrado");
        setIsValidZipCode(false);
      }
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldsToCapitalize = ["city", "state", "address", "district"];

    if (fieldsToCapitalize.includes(name)) {
      e.target.value = capitalize(value);
    }
    onChange(e);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    e.target.value = numericValue;
    onChange(e);
  };

  const isFieldRequired = formData.zipCode.length > 0;

  return (
    <div>
      <div className="flex flex-col items-start justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold tracking-tight">Endereço</h2>
        <h2 className="text-sm tracking-tight text-muted-foreground">
          Atualize as informações de endereço.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-muted-foreground">CEP</Label>
          <Input
            maxLength={9}
            name="zipCode"
            value={formData.zipCode}
            onChange={handleCepChange}
            placeholder="CEP"
            className={`w-full ${!isValidZipCode ? "border-red-500" : ""}`}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Cidade</Label>
          <Input
            required={isFieldRequired}
            maxLength={50}
            name="city"
            value={formData.city}
            onChange={handleAddressChange}
            placeholder="Cidade"
            className={`w-full ${
              isFieldRequired && !formData.city ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Estado</Label>
          <Input
            required={isFieldRequired}
            maxLength={25}
            name="state"
            value={formData.state}
            onChange={handleAddressChange}
            placeholder="Estado"
            className={`w-full ${
              isFieldRequired && !formData.state ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Endereço</Label>
          <Input
            required={isFieldRequired}
            maxLength={50}
            name="address"
            value={formData.address}
            onChange={handleAddressChange}
            placeholder="Endereço"
            className={`w-full ${
              isFieldRequired && !formData.address ? "border-red-500" : ""
            }`}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Número</Label>
          <Input
            maxLength={3}
            name="number"
            value={formData.number}
            onChange={handleNumberChange}
            placeholder="Número"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground">Bairro</Label>
          <Input
            required={isFieldRequired}
            maxLength={15}
            name="district"
            value={formData.district}
            onChange={handleAddressChange}
            placeholder="Bairro"
            className={`w-full ${
              isFieldRequired && !formData.district ? "border-red-500" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};
