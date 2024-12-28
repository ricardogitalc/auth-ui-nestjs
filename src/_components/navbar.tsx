"use client";

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
import Image from "next/image";
import { useSession } from "@/_contexts/session-context";
import { useLogout } from "@/hooks/use-logout";
import { TailwindLogo } from "../../public/tailwind-logo";
import { ThemeSwitcher } from "./theme/theme-switcher";
import {
  HiOutlineLogout,
  HiOutlineDownload,
  HiOutlineCreditCard,
  HiOutlineHeart,
  HiOutlineUsers,
} from "react-icons/hi";
import NullAvatar from "./null-avatar";
import { BiSolidRocket } from "react-icons/bi";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Downloads",
    href: "/downloads",
    icon: <HiOutlineDownload className="h-10 w-h-10" />,
  },
  {
    title: "Assinatura",
    href: "/assinatura",
    icon: <HiOutlineCreditCard className="h-10 w-h-10" />,
  },
  {
    title: "Curtidas",
    href: "/curtidas",
    icon: <HiOutlineHeart className="h-10 w-h-10" />,
  },
  {
    title: "Seguindo",
    href: "/seguindo",
    icon: <HiOutlineUsers className="h-10 w-h-10" />,
  },
];

export default function Navbar() {
  const { isAuthenticated, user } = useSession();
  const { logout } = useLogout();

  return (
    <header className="w-full bg-background border-b border-border">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <TailwindLogo />
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 ">
            <Link href="/assinatura">
              <Button size="sm" className="font-semibold">
                <BiSolidRocket className="w-5 h-5" />
                Assinar
              </Button>
            </Link>
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative cursor-pointer rounded-full overflow-hidden">
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
                      <div className="w-8 h-8">
                        <NullAvatar />
                      </div>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1 gap-2">
                      <div className="mt-2 flex flex-col gap-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground/90">
                          {user?.email}
                        </p>
                      </div>
                      <div>
                        <DropdownMenuItem
                          asChild
                          className="w-full rounded-full bg-muted/65 focus:bg-muted justify-center"
                        >
                          <Link href="/perfil">Editar perfil</Link>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex items-center justify-center gap-6 p-2">
                    <p className="text-sm font-semibold">Aparência</p>
                    <ThemeSwitcher />
                  </div>
                  <DropdownMenuSeparator />
                  <div className="py-2">
                    {navItems.map((item) => (
                      <Link href={item.href} key={item.title}>
                        <DropdownMenuItem>
                          {item.icon}
                          <span className="text-sm font-semibold ml-2">
                            {item.title}
                          </span>
                        </DropdownMenuItem>
                      </Link>
                    ))}
                    <DropdownMenuItem asChild className="focus:bg-error/20">
                      <button
                        onClick={logout}
                        className="w-full flex cursor-pointer items-center"
                      >
                        <HiOutlineLogout className="mr-2 h-4 w-4 text-destructive" />
                        <span className="text-error text-sm font-semibold">
                          Sair
                        </span>
                      </button>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="flex px-2 py-3 justify-between items-center">
                    <Link
                      href="/privacidade"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Privacidade
                    </Link>
                    <Link
                      href="/termos"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Termos
                    </Link>
                    <Link
                      href="/copyright"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Copyright
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="entrar">
                <Button variant="secondary" size="sm" className="font-semibold">
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
