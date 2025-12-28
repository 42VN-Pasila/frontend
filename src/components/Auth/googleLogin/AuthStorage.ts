const KEY = "rudex_auth";

export type RudexAuth = {
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiryDate: string;
};

export const authStorage = {
  set(data: RudexAuth) {
    localStorage.setItem(KEY, JSON.stringify(data));
  },
  get(): RudexAuth | null {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as RudexAuth;
    } catch {
      return null;
    }
  },
  clear() {
    localStorage.removeItem(KEY);
  },
};
