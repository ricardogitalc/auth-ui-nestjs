"use client";

import { SessionType, UserType } from "@/_auth/types/auth.types";
import { createContext, useContext, useState } from "react";

type SessionContextType = SessionType & {
  updateUser: (user: UserType | undefined) => void;
  setIsAuthenticated: (value: boolean) => void;
  login: (user: UserType) => void;
};

export const SessionContext = createContext<SessionContextType>({
  isAuthenticated: false,
  user: undefined,
  updateUser: () => {},
  setIsAuthenticated: () => {},
  login: () => {},
});

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionType;
}) {
  const [currentSession, setCurrentSession] = useState(session);

  const updateUser = (user: UserType | undefined) => {
    setCurrentSession((prev) => ({
      ...prev,
      user,
      isAuthenticated: !!user,
    }));
  };

  const setIsAuthenticated = (value: boolean) => {
    setCurrentSession((prev) => ({
      ...prev,
      isAuthenticated: value,
      user: value ? prev.user : undefined,
    }));
  };

  const login = (user: UserType) => {
    setCurrentSession({
      isAuthenticated: true,
      user,
    });
  };

  return (
    <SessionContext.Provider
      value={{ ...currentSession, updateUser, setIsAuthenticated, login }}
    >
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
