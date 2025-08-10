import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Password validation regex
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/

// Email validation regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validation functions
export const validatePassword = (password: string): string | null => {
  if (!password) return "パスワードを入力してください"
  if (password.length < 8) return "パスワードは8文字以上で入力してください"
  if (password.length > 20) return "パスワードは20文字以内で入力してください"
  if (!passwordRegex.test(password)) return "半角大文字・小文字・数字を含めてください"
  return null
}

export const validateEmail = (email: string): string | null => {
  if (!email) return "メールアドレスを入力してください"
  if (!emailRegex.test(email)) return "正しいメールアドレスを入力してください"
  return null
}