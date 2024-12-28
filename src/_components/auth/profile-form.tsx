import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/_components/ui/card";
import { Loader, Save } from "lucide-react";
import { useProfileForm } from "@/hooks/use-profile-form";
import { AccountSection } from "./profile-sections/AccountSection";
import { AddressSection } from "./profile-sections/AddressSection";
import { PersonalInfoSection } from "./profile-sections/PersonalInfoSection";
import { PasswordSection } from "./profile-sections/PasswordSection";
import { ProfilePhotoUpload } from "../profile-photo-upload";

export default function ProfileForm() {
  const {
    user,
    loading,
    formData,
    handleChange,
    handleSubmit,
    setFormData,
    isFormValid,
    isPasswordValid,
    setIsValidZipCode,
    isValidZipCode,
    setIsCpfValid,
    setIsPhoneValid,
  } = useProfileForm();

  const handlePhotoChange = (base64: string) => {
    setFormData((prev) => ({
      ...prev,
      profileUrl: base64,
    }));
  };

  return (
    <div className="w-full max-w-[800px] mx-auto shadow-none">
      <div className="space-y-6 mt-4 bg-muted/50 rounded-2xl my-8 p-4 sm:p-6 mx-4">
        <ProfilePhotoUpload
          profileUrl={formData.profileUrl}
          onPhotoChange={handlePhotoChange}
        />
      </div>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit}>
          <AccountSection formData={formData} onChange={handleChange} />
          <PersonalInfoSection
            formData={formData}
            onChange={handleChange}
            setIsCpfValid={setIsCpfValid}
            setIsPhoneValid={setIsPhoneValid}
          />
          <AddressSection
            formData={formData}
            onChange={handleChange}
            setFormData={setFormData}
            setIsValidZipCode={setIsValidZipCode}
            isValidZipCode={isValidZipCode}
          />
          {user?.provider === "CREDENTIALS" && (
            <>
              <PasswordSection
                formData={formData}
                onChange={handleChange}
                isPasswordValid={isPasswordValid}
              />
            </>
          )}

          <div className="flex justify-start mt-8">
            <Button
              className="w-full sm:w-auto"
              type="submit"
              disabled={loading || !isFormValid()}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Salvar alterações
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
