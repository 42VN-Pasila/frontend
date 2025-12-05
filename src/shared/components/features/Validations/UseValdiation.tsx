import { useState } from "react";
import { ValidateUser } from "./ValidationUtils";

type ValidationField =
  | "usernameRegister"
  | "usernameLogin"
  | "email"
  | "password";

export const useValidation = () => {
  const [errors, setErrors] = useState({
    usernameRegister: "",
    usernameLogin: "",
    email: "",
    password: "",
  });

  const validators: Record<string, (value: string) => void> = {
    usernameRegister: ValidateUser.validateUsernameRegister.bind(ValidateUser),
    usernameLogin: ValidateUser.validateUsernameLogin.bind(ValidateUser),
    email: ValidateUser.validateEmail.bind(ValidateUser),
    password: ValidateUser.validatePassword.bind(ValidateUser),
  };

  const validate = (field: string, value: string) => {
    const validator = validators[field];
    if (!validator) return;

    try {
      validator(value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
      return true;
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [field]: error }));
      return false;
    }
  };

  const validateAll = (fields: Partial<Record<ValidationField, string>>): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(fields).forEach(([field, value]) => {
      const validator = validators[field as ValidationField];
      if (!validator) return;

      try {
        validator(value);
        newErrors[field] = "";
      } catch (error: any) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    return isValid;
  };

  return { errors, validate, validateAll };
};
