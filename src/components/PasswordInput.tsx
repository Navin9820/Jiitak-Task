'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
}

export default function PasswordInput({ 
  value, 
  onChange, 
  placeholder = "パスワードを入力",
  error,
  className = ""
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-11 pr-12 ${error ? 'lookmeals-orange-border border-2' : 'lookmeals-border'} ${className}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm lookmeals-text font-medium underline hover:no-underline transition-all"
      >
        {showPassword ? (
          <span className="flex items-center gap-1">
            <EyeOff size={16} />
            非表示
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Eye size={16} />
            表示
          </span>
        )}
      </button>
    </div>
  )
}