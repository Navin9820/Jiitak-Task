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

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate inputs
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      })
      setIsLoading(false)
      toast.error('入力内容を確認してください')
      return
    }

    // Clear errors
    setErrors({})

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate login success/failure
      if (email === 'test@example.com' && password === 'Test123456') {
        toast.success('ログインしました！')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        toast.error('メールアドレスまたはパスワードが間違っています')
        setIsLoading(false)
      }
    } catch (error) {
      toast.error('エラーが発生しました。もう一度お試しください。')
      setIsLoading(false)
    }
  }

  const isFormValid = email && password && !errors.email && !errors.password

  return (
    <main className="lookmeals-bg grid justify-items-center min-h-screen">
      <div className="lookmeals-bg w-full max-w-[1440px] min-h-screen relative">
        <Header />

        <Card className="flex flex-col w-[400px] items-start gap-11 absolute top-[150px] left-1/2 transform -translate-x-1/2 border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto] p-0">
            <h1 className="relative self-stretch h-[22px] mt-[-1.00px] font-noto font-medium lookmeals-text text-[28px] text-center tracking-[0] leading-9 whitespace-nowrap">
              ログイン
            </h1>

            <p className="relative self-stretch font-noto font-normal text-gray-600 text-[15px] text-center tracking-[-0.07px] leading-[normal]">
              メールアドレスとパスワードを入力して
              <br />
              ログインしてください。
            </p>
          </CardContent>

          <form onSubmit={handleSubmit} className="w-full">
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

              <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                <label className="relative self-stretch mt-[-1.00px] font-noto font-medium lookmeals-text text-xs tracking-[0] leading-[normal]">
                  パスワード
                </label>

                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  error={errors.password}
                  placeholder="パスワードを入力"
                />

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-end w-full">
                <Link 
                  href="/forgot-password"
                  className="text-sm lookmeals-text underline hover:no-underline transition-all"
                >
                  パスワードを忘れた方はこちら
                </Link>
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
                    {isLoading ? 'ログイン中...' : 'ログイン'}
                  </span>
                </div>
              </Button>

              <div className="text-center text-sm text-gray-600">
                テスト用: test@example.com / Test123456
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </main>
  )
}