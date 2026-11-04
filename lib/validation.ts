// Общая валидация — используется и в форме, и в API-роуте

export const LEVELS = ["beginner", "intermediate", "advanced"] as const;
export type Level = (typeof LEVELS)[number];

export type RegistrationInput = {
  name: string;
  phone: string;
  level: string;
  about: string;
};

export const ABOUT_MIN = 15;
export const ABOUT_MAX = 1000;

export type FieldError =
  | "nameRequired"
  | "nameShort"
  | "phoneRequired"
  | "phoneInvalid"
  | "levelRequired"
  | "aboutRequired"
  | "aboutShort";

export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // 0700123456 → 996700123456
  if (digits.length === 10 && digits.startsWith("0")) return "996" + digits.slice(1);
  // 700123456 → 996700123456
  if (digits.length === 9) return "996" + digits;
  return digits;
}

export function validateRegistration(input: RegistrationInput) {
  const errors: Partial<Record<keyof RegistrationInput, FieldError>> = {};

  const name = input.name.trim();
  if (!name) errors.name = "nameRequired";
  else if (name.length < 2) errors.name = "nameShort";

  const phone = input.phone.trim();
  if (!phone) errors.phone = "phoneRequired";
  else {
    const digits = normalizePhone(phone);
    // Кыргызстан: 996 + 9 цифр. Иностранные номера — от 10 до 15 цифр.
    const isKg = /^996\d{9}$/.test(digits);
    const isIntl = phone.startsWith("+") && digits.length >= 10 && digits.length <= 15;
    if (!isKg && !isIntl) errors.phone = "phoneInvalid";
  }

  if (!LEVELS.includes(input.level as Level)) errors.level = "levelRequired";

  const about = input.about.trim();
  if (!about) errors.about = "aboutRequired";
  else if (about.length < ABOUT_MIN) errors.about = "aboutShort";

  return errors;
}
