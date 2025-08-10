'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      router.push('/set-password')
    }, 3000) // 3 seconds loading

    return () => clearTimeout(timer)
  }, [router])

  if (!isLoading) return null

  return (
    <div className="lookmeals-bg min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <img src="/launcher.png" alt="Logo" className="h-24" />
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    </div>
  );
}