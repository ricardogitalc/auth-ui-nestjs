"use client";

import { useSession } from "@/_contexts/session-context";
import { handleLogout } from "@/_auth/actions/auth.actions";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { updateUser, setIsAuthenticated } = useSession();
  const router = useRouter();

  const logout = async () => {
    await handleLogout();
    updateUser(undefined);
    setIsAuthenticated(false);
    router.push("/entrar");
  };

  return { logout };
};
