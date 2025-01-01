"use client";

import { handleGoogleAuth } from "@/_auth/actions/auth.actions";
import { useSession } from "@/_contexts/session-context";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CallbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const { login, isAuthenticated } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = searchParams.accessToken as string;
  const refreshToken = searchParams.refreshToken as string;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
      return;
    }

    async function handleAuth() {
      try {
        const session = await handleGoogleAuth(accessToken, refreshToken);

        if (session.isAuthenticated && session.user) {
          await login(session.user);
          router.push("/");
        }
      } catch {
        router.push("/entrar");
      } finally {
        setIsLoading(false);
      }
    }

    handleAuth();
  }, [accessToken, refreshToken, login, router, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-start justify-center pt-16">
        <Loader className="animate-spin ml-4" />
        <p className="ml-2 text-text-foreground">Autenticando...</p>
      </div>
    );
  }
}
