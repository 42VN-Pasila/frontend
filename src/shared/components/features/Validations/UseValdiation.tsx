import { useState } from "react";
import { ValidateUser } from "./ValidationUtils";

export const useValidation = () => {
  const [errors, setErrors] = useState({
    usernameRegister: "",
    usernameLogin: "",
    email: "",
    password: "",
  });

  const validate = (field: string, value: string) => {
    const validators: Record<string, (value: string) => void> = {
      usernameRegister: ValidateUser.validateUsernameRegister.bind(ValidateUser),
      usernameLogin: ValidateUser.validateUsernameLogin.bind(ValidateUser),
      email: ValidateUser.validateEmail.bind(ValidateUser),
      password: ValidateUser.validatePassword.bind(ValidateUser),
    };

    const validator = validators[field];
    if (!validator) return;

    try {
      validator(value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };
  return { errors, validate };
};

