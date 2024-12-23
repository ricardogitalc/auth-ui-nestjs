import { useState } from "react";
import { useSession } from "@/_contexts/session-context";
import { useToast } from "@/hooks/use-toast";
import { updateProfileAction } from "@/_auth/actions/auth.actions";
import { ProfileFormData } from "@/_auth/types/auth.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useProfileForm = () => {
  const { user } = useSession();
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
      delete data.currentPassword;
      delete data.newPassword;
      return true;
    }

    if (!data.currentPassword || !data.newPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha tanto a senha atual quanto a nova senha.",
      });
      return false;
    }

    return true;
  };

  const handleError = (error: any) => {
    toast({
      variant: "destructive",
      title: "Erro",
      description: error.message || "Erro ao atualizar perfil",
    });
  };

  const handleUpdateResponse = (response: {
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

      if (
        formData.firstName !== displayName.firstName ||
        formData.lastName !== displayName.lastName
      ) {
        setDisplayName({
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
      }

      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso",
      });
    } else {
      toast({
        variant: "destructive",
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

      if (!validatePasswordFields(dataToUpdate)) {
        setLoading(false);
        return;
      }

      const response = await updateProfileAction(dataToUpdate);
      handleUpdateResponse(response);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    displayName,
    formData,
    handleChange,
    handleSubmit,
    hasChanges,
  };
};
