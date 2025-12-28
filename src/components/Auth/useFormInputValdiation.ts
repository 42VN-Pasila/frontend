export enum ValidationField {
  usernameRegister="usernameRegister",
  usernameLogin="usernameLogin",
  email="email",
  password="password"
}

const usernameRegisterRules = [
  { regex: /.{8,16}/, error: 'Username length must be 8-16.' },
  {
    regex: /^[a-zA-Z0-9_.-]+$/,
    error: 'Username can only contains letters, numbers, or [_.-]'
  }
];
  
const usernameLoginRules = [{ regex: /^[^\s]{8,16}$/, error: 'Invalid username' }];

const validateUsernameRegister=(username: string): void => {
  const error = usernameRegisterRules
    .filter((rule) => !rule.regex.test(username))
    .map((rule) => rule.error);
  if (error.length > 0) throw error[0];
}

const emailRules = [
  {
    regex: /^[^\s'"\\]+$/,
    error: 'Email cannot contain whitspace, quote and backflash'
  },
  {
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    error: 'Email must be a valid address (ex: email@gmail.com)'
  }
];

const validateUsernameLogin=(username: string): void =>{
  const error = usernameLoginRules
    .filter((rule) => !rule.regex.test(username))
    .map((rule) => rule.error);
  if (error.length > 0) throw error[0];
}

const passwordRules = [
  { regex: /.{8,16}/, error: 'Password length must be 8-16' },
  { regex: /[a-z]/, error: 'Password requires at least 1 lowercase letter' },
  { regex: /[A-Z]/, error: 'Password requires at least 1 uppercase letter' },
  { regex: /\d/, error: 'Password requires at least 1 number' },
  { regex: /[\W_]/, error: 'Password requires at least 1 special character' },
  {
    regex: /^[^\s'"\\;]+$/,
    error: 'Password cannot contain quotes, backflash or whitespace'
  }
];

const validateEmail=(email: string): void => {
  const error = emailRules
    .filter((rule) => !rule.regex.test(email))
    .map((rule) => rule.error);
  if (error.length > 0) throw error[0];
}


const validatePassword=(password: string): void =>{
  const error = passwordRules
    .filter((rule) => !rule.regex.test(password))
    .map((rule) => rule.error);
  if (error.length > 0) throw error[0];
}

export const useFormInputValidation = (inputField: ValidationField, value: string) : string | null => {

  const validators: Record<string, (value: string) => void> = {
    usernameRegister: validateUsernameRegister,
    usernameLogin: validateUsernameLogin,
    email: validateEmail,
    password: validatePassword
  };

    try {
      validators[inputField](value);
      return null;
    } catch (error: any) {
      return error;
    }
};
