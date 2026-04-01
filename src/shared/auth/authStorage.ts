import type { LoginResponseBody } from "@/gen/rudex";

export type AuthSession = Pick<
  LoginResponseBody,
  "accessToken" | "accessTokenExpiryDate" | "refreshToken"
>;

const AUTH_STORAGE_KEY = "auth-session";

export const isAuthSessionExpired = (accessTokenExpiryDate: string): boolean => {
  const expiryDate = new Date(accessTokenExpiryDate);
  return expiryDate.getTime() < Date.now();
};

export const readStoredAuthSession = (): AuthSession | null => {
  const serializedSession = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!serializedSession) {
    return null;
  }

  try {
    const session = JSON.parse(serializedSession) as AuthSession;
    if (
      !session.accessToken ||
      !session.accessTokenExpiryDate ||
      !session.refreshToken ||
      isAuthSessionExpired(session.accessTokenExpiryDate)
    ) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const writeStoredAuthSession = (session: AuthSession) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const clearStoredAuthSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};
