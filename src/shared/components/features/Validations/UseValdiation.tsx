import { useState } from "react";
import { ValidateUser } from "./ValidationUtils";

export const UseValidation = () => {
    const [errors, setErrors] = useState({
        usernameRegister: '',
        usernameLogin: '',
        email: '',
        password: ''
    })

    const Validate = (field: string, form: string, value: string) => {
        const validators = {
            usernameRegister: ValidateUser.validateUsernameRegister,
            usernameLogin: ValidateUser.validateUsernameLogin,
            usernameEmail: ValidateUser.validateEmail,
            usernamePassword: ValidateUser.validatePassword
        };

        const validator = validators[field];
        if (!validator) return;

        try {
            validator(value);
            setErrors(prev => ({...prev, }))
        }
    }

};