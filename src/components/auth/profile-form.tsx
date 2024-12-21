import { getSession } from "@/auth/session/auth-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  Building2,
  Map,
  Locate,
  Navigation,
} from "lucide-react";
import { GoogleInput } from "../google-input";

export default async function ProfileForm() {
  const { isAuthenticated, user } = await getSession();

  return (
    <Card className="w-full max-w-[800px] mx-auto border shadow-sm p-6">
      <CardHeader className="space-y-6 mt-4">
        <div className="flex justify-start">
          <Avatar className="w-100 h-100">
            {user?.profileUrl && user.profileUrl !== "null" ? (
              <Image
                src={user.profileUrl}
                alt="Profile"
                width={100}
                height={100}
                className="object-cover rounded-full"
                priority
              />
            ) : (
              <AvatarFallback className="bg-muted-foreground/10 w-[100px] h-[100px]">
                <User className="w-8 h-8" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {isAuthenticated ? user?.firstName : "Nome"}{" "}
            {isAuthenticated ? user?.lastName : "Sobrenome"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAuthenticated ? user?.email : "Email"}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="flex items-center justify-between my-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Detalhes da conta
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GoogleInput
              value={isAuthenticated ? user?.firstName : ""}
              placeholder="Nome"
              icon={User}
              className="pl-10"
            />
            <GoogleInput
              value={isAuthenticated ? user?.lastName : ""}
              placeholder="Sobrenome"
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between my-4">
            <h2 className="text-xl font-semibold tracking-tight">Endereço</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GoogleInput placeholder="CEP" icon={Hash} className="pl-10" />
            <GoogleInput
              placeholder="Cidade"
              icon={Building2}
              className="pl-10"
            />
            <GoogleInput placeholder="Estado" icon={Map} className="pl-10" />
            <GoogleInput
              placeholder="Endereço"
              icon={Navigation}
              className="pl-10"
            />
            <GoogleInput placeholder="Número" icon={Locate} className="pl-10" />
            <GoogleInput placeholder="Bairro" icon={MapPin} className="pl-10" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between my-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Informações pessoais
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GoogleInput placeholder="CPF" icon={Mail} className="pl-10" />
            <GoogleInput
              value={isAuthenticated ? user?.whatsapp : ""}
              placeholder="Telefone"
              icon={Phone}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex justify-start">
          <Button className="w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Salvar alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
