import type { PropsWithChildren } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { directorClient } from "@/shared/api/directorClient";
import { rudexClient } from "@/shared/api/rudexClient";

import { AuthContext, type AuthContextValue } from "./authContextValue";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let active = true;

    const bootstrapSession = async () => {
      try {
        await directorClient.listRooms();
        if (active) {
          setIsAuthenticated(true);
        }
      } catch {
        if (active) {
          setIsAuthenticated(false);
        }
      } finally {
        if (active) {
          setIsBootstrapping(false);
        }
      }
    };

    void bootstrapSession();

    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    setIsBootstrapping(false);
  }, []);

  const logout = useCallback(async () => {
    try {
      await rudexClient.logout();
    } catch (error) {
      console.error("Failed to logout", error);
    }
    setIsAuthenticated(false);
    setIsBootstrapping(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      isBootstrapping,
      login,
      logout,
    }),
    [isAuthenticated, isBootstrapping, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
