import { ValidateUser } from "./validation.utils";

export type ValidationField =
  | "usernameRegister"
  | "usernameLogin"
  | "email"
  | "password";

const validators: Record<string, (value: string) => void> = {
  usernameRegister: ValidateUser.validateUsernameRegister.bind(ValidateUser),
  usernameLogin: ValidateUser.validateUsernameLogin.bind(ValidateUser),
  email: ValidateUser.validateEmail.bind(ValidateUser),
  password: ValidateUser.validatePassword.bind(ValidateUser),
};

export const validateField = (
  field: ValidationField,
  value: string
): string => {
  try {
    validators[field](value);
    return "";
  } catch (error: any) {
    return error;
  }
};

export const validateAll = (
  fields: Partial<Record<ValidationField, string>>
): boolean => {
  return (Object.keys(fields) as ValidationField[]).every((field) =>
    validateField(field, fields[field] ?? "")
  );
};