import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "@/_components/ui/toaster";
import { ThemeProvider } from "@/_components/theme/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "@/_components/navbar";

import "./globals.css";
import { SessionProvider } from "@/_contexts/session-context";
import { getSession } from "@/_auth/session/auth-session";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Aplicativo",
  description: "Descrição do aplicativo",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="pt-BR">
      <body className={cn("font-openSans antialiased", openSans.variable)}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
