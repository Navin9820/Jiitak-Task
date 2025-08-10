'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Header from '@/components/Header'
import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { validatePassword } from '@/lib/utils'

export default function SetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {}
    
    // Validate password
    const passwordError = validatePassword(password)
    if (passwordError) {
      newErrors.password = passwordError
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "確認用パスワードを入力してください"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません"
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('入力内容を確認してください')
      return
    }

    // Clear errors if validation passes
    setErrors({})
    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('パスワードが設定されました！')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } catch (error) {
      toast.error('エラーが発生しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  // Real-time validation when user types
  const handlePasswordChange = (value: string) => {
    setPassword(value)
    
    // Clear password error when user starts typing
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }))
    }
    
    // Validate confirm password if it exists
    if (confirmPassword && value !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "パスワードが一致しません" }))
    } else if (confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }))
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    
    // Clear confirm password error when user starts typing
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }))
    }
    
    // Validate confirm password against current password
    if (password && value !== password) {
      setErrors(prev => ({ ...prev, confirmPassword: "パスワードが一致しません" }))
    } else if (password) {
      setErrors(prev => ({ ...prev, confirmPassword: undefined }))
    }
  }

  const isFormValid = password && confirmPassword && !errors.password && !errors.confirmPassword

  return (
    <main className="lookmeals-bg grid justify-items-center min-h-screen">
      <div className="lookmeals-bg w-full max-w-[1440px] min-h-screen relative">
        <Header />

        <Card className="flex flex-col w-[400px] items-start gap-11 absolute top-[207px] left-1/2 transform -translate-x-1/2 border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto] p-0">
            <h1 className="relative self-stretch h-[22px] mt-[-1.00px] font-noto font-medium lookmeals-text text-[28px] text-center tracking-[0] leading-9 whitespace-nowrap">
              パスワード設定
            </h1>

            <p className="relative self-stretch font-noto font-normal text-gray-600 text-[15px] text-center tracking-[-0.07px] leading-[normal]">
              パスワードを入力後 [設定ボタン] を押してサービスの
              <br />
              利用を開始してください。
            </p>
          </CardContent>

          <form onSubmit={handleSubmit} className="w-full">
            <CardContent className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto] p-0">
              <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <label className="relative self-stretch mt-[-1.00px] font-noto font-medium lookmeals-text text-xs tracking-[0] leading-[normal]">
                  パスワード
                </label>

                <PasswordInput
                  value={password}
                  onChange={handlePasswordChange}
                  error={errors.password}
                  placeholder="パスワードを入力"
                 
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}

                <p className="relative self-stretch font-noto font-normal lookmeals-text text-xs tracking-[0] leading-[normal]">
                  半角大文字・小文字・数字を含めた8文字以上20文字以内
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <label className="relative self-stretch mt-[-1.00px] font-noto font-medium lookmeals-text text-xs tracking-[0] leading-[normal]">
                  パスワード確認用
                </label>

                <PasswordInput
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={errors.confirmPassword}
                  placeholder="パスワードを再入力"
                  
                />

                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`flex flex-col h-12 items-center justify-center gap-4 relative self-stretch w-full lookmeals-orange rounded-[100px] hover:bg-orange-600 transition-all ${
                  !isFormValid || isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
              >
                <div className="flex flex-col w-full items-center justify-center gap-2.5 py-0 relative flex-1 grow">
                  <span className="relative flex-1 self-stretch mt-[-1.00px] font-noto font-bold text-white text-sm text-center tracking-[0] leading-6">
                    {isLoading ? '設定中...' : '設定'}
                  </span>
                </div>
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </main>
  )
}