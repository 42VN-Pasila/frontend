import { OpenAPI } from '@/gen/core/OpenAPI';
import { UserLoginService } from '@/gen/services/UserLoginService';
import { UserRegistrationService } from '@/gen/services/UserRegistrationService';
import type { LoginRequestBody } from '@/gen/models/LoginRequestBody';
import type { RegisterRequestBody } from '@/gen/models/RegisterRequestBody';

OpenAPI.BASE = import.meta.env.VITE_RUDEX_URL;

export const rudexClient = {
  async login(body: LoginRequestBody) {
    return UserLoginService.postLogin({ requestBody: body });
  },

  async register(body: RegisterRequestBody) {
    return UserRegistrationService.postRegister({ requestBody: body });
  }
};

export const { login, register } = rudexClient;
