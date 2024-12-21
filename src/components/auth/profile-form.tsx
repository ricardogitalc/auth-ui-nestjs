"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    zipCode: "",
    city: "",
    state: "",
    address: "",
    number: "",
    district: "",
    cpf: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Card className="w-full max-w-[800px] mx-auto border-none shadow-none">
      <CardHeader className="space-y-6 mt-4">
        <div className="flex justify-start">
          <Avatar className="w-100 h-100">
            <AvatarFallback className="bg-muted-foreground/10 w-[100px] h-[100px]">
              <User className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            Nome Sobrenome
          </h1>
          <p className="text-sm text-muted-foreground">Email</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between my-4">
              <h2 className="text-xl font-semibold tracking-tight">
                Detalhes da conta
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <GoogleInput
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Nome"
                icon={User}
                className="pl-10"
              />
              <GoogleInput
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
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
              <GoogleInput
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="CEP"
                icon={Hash}
                className="pl-10"
              />
              <GoogleInput
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Cidade"
                icon={Building2}
                className="pl-10"
              />
              <GoogleInput
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Estado"
                icon={Map}
                className="pl-10"
              />
              <GoogleInput
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Endereço"
                icon={Navigation}
                className="pl-10"
              />
              <GoogleInput
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Número"
                icon={Locate}
                className="pl-10"
              />
              <GoogleInput
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Bairro"
                icon={MapPin}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between my-4">
              <h2 className="text-xl font-semibold tracking-tight">
                Informações pessoais
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <GoogleInput
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="CPF"
                icon={Mail}
                className="pl-10"
              />
              <GoogleInput
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Telefone"
                icon={Phone}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex justify-start mt-8">
            <Button className="w-full sm:w-auto" type="submit">
              <Save className="w-4 h-4 mr-2" />
              Salvar alterações
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
