export interface PasswordValidation {
  hasMinLength: boolean;
  hasSpecialChar: boolean;
  hasNumberAndLetter: boolean;
  hasUpperCase: boolean;
}

export const validatePassword = (
  password: string | undefined
): PasswordValidation => {
  const value = password || "";
  return {
    hasMinLength: value.length >= 8,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    hasNumberAndLetter: /^(?=.*[0-9])(?=.*[a-zA-Z])/.test(value),
    hasUpperCase: /[A-Z]/.test(value),
  };
};

export const isPasswordStrong = (validation: PasswordValidation): boolean => {
  return Object.values(validation).every(Boolean);
};
