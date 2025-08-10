'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Header from '@/components/Header'
import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { validateEmail, validatePassword } from '@/lib/utils'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'reset'>('email')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; newPassword?: string; confirmPassword?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const emailError = validateEmail(email)
    if (emailError) {
      setErrors({ email: emailError })
      setIsLoading(false)
      toast.error('正しいメールアドレスを入力してください')
      return
    }

    setErrors({})

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('パスワードリセット用のメールを送信しました')
      setStep('reset')
    } catch (error) {
      toast.error('エラーが発生しました。もう一度お試しください。')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const passwordError = validatePassword(newPassword)
    const confirmPasswordError = !confirmPassword 
      ? "確認用パスワードを入力してください" 
      : newPassword !== confirmPassword 
        ? "パスワードが一致しません" 
        : null

    if (passwordError || confirmPasswordError) {
      setErrors({
        newPassword: passwordError || undefined,
        confirmPassword: confirmPasswordError || undefined,
      })
      setIsLoading(false)
      toast.error('入力内容を確認してください')
      return
    }

    setErrors({})

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('パスワードがリセットされました！')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } catch (error) {
      toast.error('エラーが発生しました。もう一度お試しください。')
      setIsLoading(false)
    }
  }

  return (
    <main className="lookmeals-bg grid justify-items-center min-h-screen">
      <div className="lookmeals-bg w-full max-w-[1440px] min-h-screen relative">
        <Header />

        <Card className="flex flex-col w-[400px] items-start gap-11 absolute top-[150px] left-1/2 transform -translate-x-1/2 border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto] p-0">
            <h1 className="relative self-stretch h-[22px] mt-[-1.00px] font-noto font-medium lookmeals-text text-[28px] text-center tracking-[0] leading-9 whitespace-nowrap">
              {step === 'email' ? 'パスワードリセット' : '新しいパスワード設定'}
            </h1>

            <p className="relative self-stretch font-noto font-normal text-gray-600 text-[15px] text-center tracking-[-0.07px] leading-[normal]">
              {step === 'email' ? (
                <>
                  登録されたメールアドレスを入力してください。
                  <br />
                  パスワードリセット用のリンクをお送りします。
                </>
              ) : (
                <>
                  新しいパスワードを入力してください。
                  <br />
                  設定後、ログイン画面に戻ります。
                </>
              )}
            </p>
          </CardContent>

          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="w-full">
              <CardContent className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto] p-0">
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <label className="relative self-stretch mt-[-1.00px] font-noto font-medium lookmeals-text text-xs tracking-[0] leading-[normal]">
                    メールアドレス
                  </label>

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレスを入力"
                    className={`h-11 ${errors.email ? 'lookmeals-orange-border border-2' : 'lookmeals-border'}`}
                  />

                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!email || isLoading}
                  className={`flex flex-col h-12 items-center justify-center gap-4 relative self-stretch w-full lookmeals-orange rounded-[100px] hover:bg-orange-600 transition-all ${
                    !email || isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                >
                  <span className="font-noto font-bold text-white text-sm">
                    {isLoading ? '送信中...' : 'リセットメールを送信'}
                  </span>
                </Button>

                <div className="flex justify-center w-full">
                  <Link 
                    href="/login"
                    className="text-sm lookmeals-text underline hover:no-underline transition-all"
                  >
                    ログイン画面に戻る
                  </Link>
                </div>
              </CardContent>
            </form>
          ) : (
            <form onSubmit={handlePasswordReset} className="w-full">
              <CardContent className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto] p-0">
                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <label className="relative self-stretch mt-[-1.00px] font-noto font-medium lookmeals-text text-xs tracking-[0] leading-[normal]">
                    新しいパスワード
                  </label>

                  <PasswordInput
                    value={newPassword}
                    onChange={setNewPassword}
                    error={errors.newPassword}
                    placeholder="新しいパスワードを入力"
                  />

                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
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
                    onChange={setConfirmPassword}
                    error={errors.confirmPassword}
                    placeholder="パスワードを再入力"
                  />

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!newPassword || !confirmPassword || isLoading}
                  className={`flex flex-col h-12 items-center justify-center gap-4 relative self-stretch w-full lookmeals-orange rounded-[100px] hover:bg-orange-600 transition-all ${
                    !newPassword || !confirmPassword || isLoading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                  }`}
                >
                  <span className="font-noto font-bold text-white text-sm">
                    {isLoading ? 'リセット中...' : 'パスワードをリセット'}
                  </span>
                </Button>
              </CardContent>
            </form>
          )}
        </Card>
      </div>
    </main>
  )
}