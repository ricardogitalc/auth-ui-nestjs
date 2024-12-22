"use client";

import {
  User,
  Download,
  CreditCard,
  Users,
  LogOutIcon,
  Heart,
  Settings,
} from "lucide-react";
import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ModeToggle } from "./theme/mode-toggle";
import { DROPDOWN_MENU } from "@/_constants/dropdown-menu";
import Image from "next/image";
import { handleLogout } from "@/_auth/actions/auth.actions";
import { useSession } from "@/_contexts/session-context";
import LogoTipo from "@/_public/svg/logotipo-full";

export default async function Navbar() {
  const { isAuthenticated, user } = await useSession();

  return (
    <header className="w-full bg-popover border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={DROPDOWN_MENU.HOME.href}
              className="flex items-center gap-2"
            >
              <LogoTipo className="w-32 h-8 fill-foreground" />
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ModeToggle />
            {!isAuthenticated ? (
              <Link href={DROPDOWN_MENU.LOGIN.href}>
                <Button>{DROPDOWN_MENU.LOGIN.name}</Button>
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
                  <Link href={DROPDOWN_MENU.CONFIGURACOES.href}>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{DROPDOWN_MENU.CONFIGURACOES.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROPDOWN_MENU.DOWNLOADS.href}>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>{DROPDOWN_MENU.DOWNLOADS.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROPDOWN_MENU.ASSINATURA.href}>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>{DROPDOWN_MENU.ASSINATURA.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROPDOWN_MENU.CURTIDAS.href}>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>{DROPDOWN_MENU.CURTIDAS.name}</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href={DROPDOWN_MENU.SEGUINDO.href}>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      <span>{DROPDOWN_MENU.SEGUINDO.name}</span>
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
