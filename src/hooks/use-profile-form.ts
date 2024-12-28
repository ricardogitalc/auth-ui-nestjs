import { useState } from "react";
import { useSession } from "@/_contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import { updateProfileAction } from "@/_auth/actions/auth.actions";
import { ProfileFormData } from "@/_auth/types/auth.types";
import { validatePassword, isPasswordStrong } from "@/lib/helpers/pwd-helper";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useProfileForm = () => {
  const { user, updateUser } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  const [initialFormData, setInitialFormData] = useState<ProfileFormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    profileUrl: user?.profileUrl || "",
    zipCode: user?.zipCode || "",
    city: user?.city || "",
    state: user?.state || "",
    address: user?.address || "",
    number: user?.number || "",
    district: user?.district || "",
    cpf: user?.cpf || "",
    currentPassword: "",
    newPassword: "",
  });

  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);
  const [isValidZipCode, setIsValidZipCode] = useState(true);
  const [isCpfValid, setIsCpfValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const hasChanges = () => {
    return Object.keys(formData).some(
      (key) =>
        formData[key as keyof ProfileFormData] !==
        initialFormData[key as keyof ProfileFormData]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePasswordFields = (data: ProfileFormData) => {
    if (!data.currentPassword && !data.newPassword) {
      const { currentPassword, newPassword, ...rest } = data;
      return { isValid: true, data: rest };
    }

    if (!data.currentPassword || !data.newPassword) {
      toast({
        variant: "error",
        title: "Erro",
        description: "Preencha tanto a senha atual quanto a nova senha.",
      });
      return { isValid: false, data };
    }

    return { isValid: true, data };
  };

  const validateAddressFields = (data: ProfileFormData) => {
    if (data.zipCode) {
      return (
        isValidZipCode &&
        data.city.trim() !== "" &&
        data.state.trim() !== "" &&
        data.address.trim() !== "" &&
        data.number.trim() !== "" &&
        data.district.trim() !== ""
      );
    }
    return true;
  };

  const handleError = (error: any) => {
    toast({
      variant: "error",
      title: "Erro",
      description: error.message || "Erro ao atualizar perfil",
    });
  };

  const handleUpdateResponse = async (response: {
    ok: boolean;
    message?: string;
  }) => {
    if (response.ok) {
      const updatedFormData = {
        ...formData,
        currentPassword: "",
        newPassword: "",
      };

      setInitialFormData(updatedFormData);
      setFormData(updatedFormData);

      if (user) {
        updateUser({
          ...user,
          ...updatedFormData,
        });
      }

      if (
        formData.firstName !== displayName.firstName ||
        formData.lastName !== displayName.lastName
      ) {
        setDisplayName({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      }

      await fetch("/api/revalidate-navbar", {
        method: "POST",
      });

      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso",
      });
    } else {
      toast({
        variant: "error",
        title: "Erro",
        description: response.message || "Erro ao atualizar perfil",
      });

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await delay(500);
      const dataToUpdate = { ...formData };
      const validation = validatePasswordFields(dataToUpdate);

      if (!validation.isValid) {
        setLoading(false);
        return;
      }

      const response = await updateProfileAction(validation.data);
      handleUpdateResponse(response);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (!validateAddressFields(formData)) {
      return false;
    }

    if (!isCpfValid || !isPhoneValid) {
      return false;
    }

    if (formData.newPassword || formData.currentPassword) {
      const passwordValidation = validatePassword(formData.newPassword);
      return hasChanges() && isPasswordStrong(passwordValidation);
    }

    return hasChanges();
  };

  return {
    user,
    loading,
    displayName,
    formData,
    handleChange,
    handleSubmit,
    hasChanges,
    setFormData,
    isFormValid,
    isPasswordValid: formData.newPassword
      ? isPasswordStrong(validatePassword(formData.newPassword))
      : true,
    setIsValidZipCode,
    isValidZipCode,
    isCpfValid,
    setIsCpfValid,
    isPhoneValid,
    setIsPhoneValid,
  };
};
