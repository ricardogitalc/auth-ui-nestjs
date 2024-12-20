import { getSession } from "@/auth/session/auth-session";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default async function ProfileForm() {
  const { isAuthenticated, user } = await getSession();

  return (
    <Card className="max-w-xl w-full p-8">
      <CardHeader className="space-y-4 px-0">
        <div className="flex justify-start">
          <Image
            src="https://picsum.photos/100"
            // src="https://ui-avatars.com/api/?name=User"
            alt="Profile"
            width={100}
            height={100}
            className="bg-blue-500 rounded-full"
            priority
          />
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
      <CardContent className="px-0">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Detalhes da conta
          </h2>
          <div className="space-y-4 divide-y divide-muted">
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none">Nome</label>
                <p className="text-sm text-muted-foreground">
                  {isAuthenticated ? user?.firstName : "name"}
                </p>
              </div>
              <Button variant="link" className="h-auto p-0 text-sm font-medium">
                Editar
              </Button>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none">
                  Sobrenome
                </label>
                <p className="text-sm text-muted-foreground">
                  {isAuthenticated ? user?.lastName : "name"}
                </p>
              </div>
              <Button variant="link" className="h-auto p-0 text-sm font-medium">
                Editar
              </Button>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none">
                  Email
                </label>
                <p className="text-sm text-muted-foreground">
                  {isAuthenticated ? user?.email : "email"}
                </p>
              </div>
              <Button variant="link" className="h-auto p-0 text-sm font-medium">
                Editar
              </Button>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none">
                  WhatsApp
                </label>
                <p className="text-sm text-muted-foreground">
                  {isAuthenticated ? user?.whatsapp : "email"}
                </p>
              </div>
              <Button variant="link" className="h-auto p-0 text-sm font-medium">
                Editar
              </Button>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1">
                <label className="text-sm font-medium leading-none">
                  Senha
                </label>
                <p className="text-sm text-muted-foreground">••••••••</p>
              </div>
              <Button variant="link" className="h-auto p-0 text-sm font-medium">
                Criar nova
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
