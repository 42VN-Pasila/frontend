import { OpenAPI } from '@/gen/rudex/core/OpenAPI';
import type { LoginRequestBody } from '@/gen/rudex/models/LoginRequestBody';
import type { RegisterRequestBody } from '@/gen/rudex/models/RegisterRequestBody';
import type { UpdatePasswordRequestBody } from '@/gen/rudex/models/UpdatePasswordRequestBody';
import { UserInfoService } from '@/gen/rudex/services/UserInfoService';
import { UserLoginService } from '@/gen/rudex/services/UserLoginService';
import { UserProfileService } from '@/gen/rudex/services/UserProfileService';
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

  async getUserInfo(username: string) {
    return UserInfoService.getUserInfo({ username });
  },

  async updatePassword(body: UpdatePasswordRequestBody) {
    if (import.meta.env.DEV) {
      const response = await fetch('/rudex/users/password', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Failed to update password (${response.status})`);
      }

      return;
    }

    return UserProfileService.updatePassword({ requestBody: body });
  },

  async register(body: RegisterRequestBody) {
    return UserRegistrationService.registerUser({ requestBody: body });
  }
};

export const { login, register, getUserInfo, updatePassword } = rudexClient;
