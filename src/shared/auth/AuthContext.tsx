import type { PropsWithChildren } from "react";
import { useCallback, useMemo, useState } from "react";

import { AuthContext, type AuthContextValue } from "./authContext";
import type { AuthSession } from "./authStorage";
import {
  clearStoredAuthSession,
  readStoredAuthSession,
  writeStoredAuthSession,
} from "./authStorage";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<AuthSession | null>(() => readStoredAuthSession());

  const login = useCallback((nextSession: AuthSession) => {
    writeStoredAuthSession(nextSession);
    setSession(nextSession);
  }, []);

  const logout = useCallback(() => {
    clearStoredAuthSession();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(session),
      session,
      login,
      logout,
    }),
    [session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
