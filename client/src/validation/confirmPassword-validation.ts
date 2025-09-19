export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
): string | undefined => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }
  if (confirmPassword !== password) {
    return "Passwords do not match";
  }
  return undefined;
};
