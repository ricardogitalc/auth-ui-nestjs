"use client";

import {
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
import { ModeToggle } from "./theme/mode-toggle";
import { DROPDOWN_MENU } from "@/_constants/dropdown-menu";
import Image from "next/image";
import { useSession } from "@/_contexts/session-context";
import { useLogout } from "@/hooks/use-logout";
import { HiUser } from "react-icons/hi2";
import { TailwindLogo } from "../../public/tailwind-logo";

export default function Navbar() {
  const { isAuthenticated, user } = useSession();
  const { logout } = useLogout();

  return (
    <header className="w-full bg-popover border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={DROPDOWN_MENU.HOME.href}
              className="flex items-center gap-2"
            >
              <TailwindLogo />
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ModeToggle />
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative cursor-pointer border border-border rounded-full overflow-hidden">
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
                      <div className="object-cover bg-muted rounded-full w-7 h-7 flex items-center justify-center relative overflow-hidden">
                        <HiUser className="w-full h-full fill-muted-foreground/80 translate-y-1" />
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="flex m-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
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
                  <DropdownMenuItem asChild>
                    <button
                      onClick={logout}
                      className="w-full flex cursor-pointer items-center"
                    >
                      <LogOutIcon className="mr-2 h-4 w-4 text-red-500" />
                      <span className="text-red-500">Sair</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={DROPDOWN_MENU.LOGIN.href}>
                <Button>{DROPDOWN_MENU.LOGIN.name}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
