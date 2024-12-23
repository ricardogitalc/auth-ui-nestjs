import { GoogleInput } from "../../google-input";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { insertMaskInCEP } from "@/lib/masks";
import { fetchAddressByCEP } from "@/services/viacep";
import { useState } from "react";
import { capitalize } from "@/lib/helpers/capitalize-helper";

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
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold tracking-tight">Endereço</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <GoogleInput
            maxLength={9}
            name="zipCode"
            value={formData.zipCode}
            onChange={handleCepChange}
            placeholder="CEP"
            className={`pl-10 ${!isValidZipCode ? "border-red-500" : ""}`}
          />
          {cepError && <p className="text-red-500 text-sm mt-1">{cepError}</p>}
        </div>
        <GoogleInput
          required={isFieldRequired}
          maxLength={50}
          name="city"
          value={formData.city}
          onChange={handleAddressChange}
          placeholder="Cidade"
          className={`pl-10 ${
            isFieldRequired && !formData.city ? "border-red-500" : ""
          }`}
        />
        <GoogleInput
          required={isFieldRequired}
          maxLength={25}
          name="state"
          value={formData.state}
          onChange={handleAddressChange}
          placeholder="Estado"
          className={`pl-10 ${
            isFieldRequired && !formData.state ? "border-red-500" : ""
          }`}
        />
        <GoogleInput
          required={isFieldRequired}
          maxLength={50}
          name="address"
          value={formData.address}
          onChange={handleAddressChange}
          placeholder="Endereço"
          className={`pl-10 ${
            isFieldRequired && !formData.address ? "border-red-500" : ""
          }`}
        />
        <GoogleInput
          maxLength={3}
          name="number"
          value={formData.number}
          onChange={handleNumberChange}
          placeholder="Número"
          className="pl-10"
        />
        <GoogleInput
          required={isFieldRequired}
          maxLength={15}
          name="district"
          value={formData.district}
          onChange={handleAddressChange}
          placeholder="Bairro"
          className={`pl-10 ${
            isFieldRequired && !formData.district ? "border-red-500" : ""
          }`}
        />
      </div>
    </div>
  );
};
