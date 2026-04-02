import { OpenAPI } from '@/gen/rudex/core/OpenAPI';
import { UserLoginService } from '@/gen/rudex/services/UserLoginService';
import { UserRegistrationService } from '@/gen/rudex/services/UserRegistrationService';
import type { LoginRequestBody } from '@/gen/rudex/models/LoginRequestBody';
import type { RegisterRequestBody } from '@/gen/rudex/models/RegisterRequestBody';
import { toDevPath } from './path.dev';

OpenAPI.BASE = toDevPath(import.meta.env.VITE_RUDEX_URL ?? "");
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
