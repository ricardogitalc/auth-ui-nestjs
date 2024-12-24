export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  return phoneRegex.test(phone);
}
