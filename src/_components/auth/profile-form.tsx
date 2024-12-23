import { Button } from "@/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/_components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Loader, Save, User } from "lucide-react";
import Image from "next/image";
import { useProfileForm } from "@/hooks/use-profile-form";
import { AccountSection } from "./account-sections/AccountSection";
import { AddressSection } from "./account-sections/AddressSection";
import { PersonalInfoSection } from "./account-sections/PersonalInfoSection";
import { PasswordSection } from "./account-sections/PasswordSection";

export default function ProfileForm() {
  const {
    user,
    loading,
    displayName,
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
      <CardHeader className="space-y-6 mt-4">
        <div className="flex justify-start">
          {user?.profileUrl ? (
            <Image
              src={user.profileUrl}
              width={100}
              height={100}
              alt="Profile Image"
              className="object-cover rounded-full"
            />
          ) : (
            <Avatar className="w-100 h-100">
              <AvatarFallback className="bg-muted-foreground/10 w-[100px] h-[100px]">
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {displayName.firstName} {displayName.lastName}
          </h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit}>
          <AccountSection formData={formData} onChange={handleChange} />
          <AddressSection
            formData={formData}
            onChange={handleChange}
            setFormData={setFormData}
            setIsValidZipCode={setIsValidZipCode}
            isValidZipCode={isValidZipCode}
          />
          <PersonalInfoSection formData={formData} onChange={handleChange} />
          {user?.provider === "CREDENTIALS" && (
            <PasswordSection
              formData={formData}
              onChange={handleChange}
              isPasswordValid={isPasswordValid}
            />
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
