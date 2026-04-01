import { createContext } from "react";

import type { AuthSession } from "./authStorage";

export type AuthContextValue = {
  isAuthenticated: boolean;
  session: AuthSession | null;
  login: (session: AuthSession) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
