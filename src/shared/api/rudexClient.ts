import { OpenAPI } from '@/gen/rudex/core/OpenAPI';
import { UserLoginService } from '@/gen/rudex/services/UserLoginService';
import { UserRegistrationService } from '@/gen/rudex/services/UserRegistrationService';
import type { LoginRequestBody } from '@/gen/rudex/models/LoginRequestBody';
import type { RegisterRequestBody } from '@/gen/rudex/models/RegisterRequestBody';

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
