import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/_components/ui/toaster";
import { ThemeProvider } from "@/_components/theme/theme-provider";
import { cn } from "@/lib/utils";
import Navbar from "@/_components/navbar";

import "./globals.css";
import { SessionProvider } from "@/_contexts/session-context";
import { getSessionApi } from "@/_auth/session/auth-session";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  const session = await getSessionApi();

  return (
    <html lang="pt-BR">
      <body className={cn("font-inter antialiased", inter.variable)}>
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
