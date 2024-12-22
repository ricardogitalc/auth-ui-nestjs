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
import { ModeToggle } from "./theme/mode-toggle";
import { DROP_ROUTES } from "@/constants/dropdown-routes";
import LogoTipo from "@/svg/logotipo";
import Image from "next/image";
import { handleLogout } from "@/actions/auth-actions";
import { getSession } from "@/auth/session/auth-session";

export default async function Navbar() {
  const session = await getSession();
  const isAuthenticated = session.isAuthenticated;
  const user = session.user;

  return (
    <header className="w-full bg-popover border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={DROP_ROUTES.HOME.href}
              className="flex items-center gap-2"
            >
              <LogoTipo className="w-32 h-8 fill-foreground" />
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ModeToggle />
            {!isAuthenticated ? (
              <Link href={DROP_ROUTES.LOGIN.href}>
                <Button>{DROP_ROUTES.LOGIN.name}</Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="w-8 h-8">
                      {user?.profileUrl && user.profileUrl !== "null" ? (
                        <Image
                          src={user.profileUrl}
                          alt="Profile"
                          width={32}
                          height={32}
                          className="object-cover rounded-full"
                          priority
                        />
                      ) : (
                        <AvatarFallback className="bg-muted-foreground/10">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      )}
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
                  <Link href={DROP_ROUTES.ASSINATURA.href}>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>{DROP_ROUTES.ASSINATURA.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROP_ROUTES.CURTIDAS.href}>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>{DROP_ROUTES.CURTIDAS.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROP_ROUTES.SEGUINDO.href}>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      <span>{DROP_ROUTES.SEGUINDO.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <form action={handleLogout}>
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
