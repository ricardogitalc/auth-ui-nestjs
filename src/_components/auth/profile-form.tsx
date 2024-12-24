import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/_components/ui/card";
import { Loader, Save, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useProfileForm } from "@/hooks/use-profile-form";
import { AccountSection } from "./account-sections/AccountSection";
import { AddressSection } from "./account-sections/AddressSection";
import { PersonalInfoSection } from "./account-sections/PersonalInfoSection";
import { PasswordSection } from "./account-sections/PasswordSection";
import { HiUser } from "react-icons/hi2";

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
  } = useProfileForm();

  return (
    <Card className="w-full max-w-[800px] mx-auto border-none shadow-none">
      <CardHeader className="space-y-6 mt-4 bg-muted/30 rounded-xl my-8 p-4 sm:p-6 mx-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {user?.profileUrl ? (
              <Image
                src={user.profileUrl}
                width={80}
                height={80}
                alt="Profile Image"
                className="object-cover rounded-full"
              />
            ) : (
              <div className="object-cover bg-muted rounded-full w-[80px] h-[80px] flex items-center justify-center relative overflow-hidden">
                <HiUser className="w-full h-full fill-muted-foreground/80 translate-y-2" />
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight">
                Foto de perfil
              </h1>
              <p className="text-sm text-muted-foreground">
                PNG, JPEG abaixo de 15MB
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4">
            <Button size="sm" className="w-full sm:w-auto">
              <UploadIcon className="w-4 h-4 mr-2" />
              Atualizar foto
            </Button>
            <Button
              size="sm"
              className="w-full sm:w-auto"
              variant={"secondary"}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit}>
          <AccountSection formData={formData} onChange={handleChange} />

          <PersonalInfoSection formData={formData} onChange={handleChange} />

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
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Salvar alterações
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
