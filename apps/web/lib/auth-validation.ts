interface RegistrationFields { name: string; email: string; password: string; code: string; consent: boolean }

/** Checks the registration fields before the form is submitted. */
export function validateRegistration(fields: RegistrationFields): string {
  if (!fields.name.trim()) return 'Укажите ваше имя.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) return 'Укажите корректный адрес электронной почты.';
  if (fields.password.length < 8 || !/[a-z]/.test(fields.password) || !/[A-Z]/.test(fields.password) || !/\d/.test(fields.password)) return 'Пароль должен содержать не менее 8 символов, латинские строчные и прописные буквы и цифру.';
  if (!fields.code.trim()) return 'Укажите код приглашения.';
  if (!fields.consent) return 'Подтвердите согласие на обработку персональных данных.';
  return '';
}
