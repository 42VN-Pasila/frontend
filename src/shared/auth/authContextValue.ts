import { createContext } from 'react';

export type AuthContextValue = {
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: () => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
