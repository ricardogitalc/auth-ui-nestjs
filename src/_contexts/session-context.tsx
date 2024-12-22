"use client";

import { SessionType } from "@/_auth/types/auth.types";
import { createContext, useContext } from "react";

export const SessionContext = createContext<SessionType>({
  isAuthenticated: false,
  user: undefined,
});

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionType;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession deve ser usado dentro de um AuthProvider");
  }
  return context;
};
