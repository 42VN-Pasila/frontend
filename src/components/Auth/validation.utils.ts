export class ValidateUser {
  private static usernameRegisterRules = [
    { regex: /.{8,16}/, error: 'Username length must be 8-16.' },
    {
      regex: /^[a-zA-Z0-9_.-]+$/,
      error: 'Username can only contains letters, numbers, or [_.-]'
    }
  ];

  static validateUsernameRegister(username: string): void {
    const error = ValidateUser.usernameRegisterRules
      .filter((rule) => !rule.regex.test(username))
      .map((rule) => rule.error);
    if (error.length > 0) throw error[0];
  }

  private static usernameLoginRules = [{ regex: /^[^\s]{8,16}$/, error: 'Invalid username' }];

  static validateUsernameLogin(username: string): void {
    const error = ValidateUser.usernameLoginRules
      .filter((rule) => !rule.regex.test(username))
      .map((rule) => rule.error);
    if (error.length > 0) throw error[0];
  }

  private static emailRules = [
    {
      regex: /^[^\s'"\\]+$/,
      error: 'Email cannot contain whitspace, quote and backflash'
    },
    {
      regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      error: 'Email must be a valid address (ex: email@gmail.com)'
    }
  ];

  static validateEmail(email: string): void {
    const error = ValidateUser.emailRules
      .filter((rule) => !rule.regex.test(email))
      .map((rule) => rule.error);
    if (error.length > 0) throw error[0];
  }

  private static passwordRules = [
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

  static validatePassword(password: string): void {
    const error = ValidateUser.passwordRules
      .filter((rule) => !rule.regex.test(password))
      .map((rule) => rule.error);
    if (error.length > 0) throw error[0];
  }
}
