import { OpenAPI } from '@/gen/rudex/core/OpenAPI';
import type { LoginRequestBody } from '@/gen/rudex/models/LoginRequestBody';
import type { RegisterRequestBody } from '@/gen/rudex/models/RegisterRequestBody';
import { UserLoginService } from '@/gen/rudex/services/UserLoginService';
import { UserRegistrationService } from '@/gen/rudex/services/UserRegistrationService';

import { toDevPath } from './path.dev';

const resolveRudexBaseUrl = () => {
  const fallbackUrl = OpenAPI.BASE;
  const input = (import.meta.env.VITE_RUDEX_URL as string | undefined)?.trim();

  if (!input) {
    return fallbackUrl;
  }

  try {
    return toDevPath(input);
  } catch {
    if (import.meta.env.DEV) {
      console.warn(`Invalid VITE_RUDEX_URL "${input}". Falling back to "${fallbackUrl}" in dev.`);
      return fallbackUrl;
    }
    throw new Error(`Invalid VITE_RUDEX_URL: "${input}"`);
  }
};

OpenAPI.BASE = resolveRudexBaseUrl();
OpenAPI.WITH_CREDENTIALS = true;

export const rudexClient = {
  async login(body: LoginRequestBody) {
    return UserLoginService.loginUser({ requestBody: body });
  },

  async register(body: RegisterRequestBody) {
    return UserRegistrationService.registerUser({ requestBody: body });
  }
};

export const { login, register } = rudexClient;
