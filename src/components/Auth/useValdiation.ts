import { ValidateUser } from './validation.utils';

export enum ValidationField {
  usernameRegister="usernameRegister",
  usernameLogin="usernameLogin",
  email="email",
  password="password"
}

export const useFormInputValidation = (inputField: ValidationField, value: string) : string | null => {

  const validators: Record<string, (value: string) => void> = {
    usernameRegister: ValidateUser.validateUsernameRegister.bind(ValidateUser),
    usernameLogin: ValidateUser.validateUsernameLogin.bind(ValidateUser),
    email: ValidateUser.validateEmail.bind(ValidateUser),
    password: ValidateUser.validatePassword.bind(ValidateUser)
  };

    try {
      validators[inputField](value);
      return null;
    } catch (error: any) {
      return error;
    }
};
