import {
  User,
  Download,
  CreditCard,
  Users,
  LogOutIcon,
  Heart,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { KeySquare } from "./key-square";
import { ModeToggle } from "./theme/mode-toggle";
import { getSession, logoutSession } from "@/auth/session/auth-session";
import { DROP_ROUTES } from "@/constants/dropdown-routes";

export default async function Navbar() {
  const { isAuthenticated, user } = await getSession();

  return (
    <header className="w-full bg-muted-foreground/5">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={DROP_ROUTES.HOME.href}
              className="flex items-center gap-2"
            >
              <KeySquare className="w-6 h-6 text-foreground" />
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ModeToggle />
            {!isAuthenticated ? (
              <>
                <Link href={DROP_ROUTES.LOGIN.href}>
                  <Button>{DROP_ROUTES.LOGIN.name}</Button>
                </Link>
                <Link href={DROP_ROUTES.REGISTRO.href}>
                  <Button variant={"outline"}>
                    {DROP_ROUTES.REGISTRO.name}
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-muted-foreground/10">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="flex m-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={DROP_ROUTES.CONFIGURACOES.href}>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{DROP_ROUTES.CONFIGURACOES.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROP_ROUTES.DOWNLOADS.href}>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>{DROP_ROUTES.DOWNLOADS.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROP_ROUTES.CURTIDAS.href}>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>{DROP_ROUTES.CURTIDAS.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROP_ROUTES.ASSINATURA.href}>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>{DROP_ROUTES.ASSINATURA.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROP_ROUTES.SEGUINDO.href}>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      <span>{DROP_ROUTES.SEGUINDO.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <form
                    action={async () => {
                      "use server";
                      await logoutSession();
                    }}
                  >
                    <DropdownMenuItem asChild>
                      <button className="w-full flex cursor-pointer items-center">
                        <LogOutIcon className="mr-2 h-4 w-4 text-red-500" />
                        <span className="text-red-500">Sair</span>
                      </button>
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
