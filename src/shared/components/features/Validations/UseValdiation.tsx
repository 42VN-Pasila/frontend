import { useState } from "react";
import { ValidateUser } from "./ValidationUtils";

export const useValidation = () => {
    const [errors, setErrors] = useState({
        usernameRegister: '',
        usernameLogin: '',
        usernameEmail: '',
        usernamePassword: ''
    })

    const validate = (field: string, value: string) => {
        const validators: Record<string, (value: string) => void> = {
            usernameRegister: ValidateUser.validateUsernameRegister,
            usernameLogin: ValidateUser.validateUsernameLogin,
            usernameEmail: ValidateUser.validateEmail,
            usernamePassword: ValidateUser.validatePassword
        };

        const validator = validators[field];
        if (!validator) return;

        try {
            validator(value);
            setErrors(prev => ({...prev, [field]: ''}));
        }
        catch (error: any)
        {
            setErrors(prev => ({...prev, [field]: error}));
        }
    }
    return {errors, validate};
};