import { useState } from "react";
import { validateField, type ValidationField } from "./validation.services.ts";

export const useValidation = () => {
  const [errors, setErrors] = useState({
    usernameRegister: "",
    usernameLogin: "",
    email: "",
    password: "",
  });

  const validate = (field: ValidationField, value: string) => {
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  return { errors, validate };
};
