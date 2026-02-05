'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AtSign, Lock } from 'lucide-react'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-input'
import { AuthButton } from './auth-button'
import { AuthDivider, GoogleButton } from './auth-social'

export function LoginForm() {
  const router = useRouter()

  // 1. State untuk menangampung input dan error
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // 2. Handle perubahan input & hapus error saat mengetik
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Auto-clear error ketika user mulai mengetik ulang
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSignIn = () => {
    const newErrors: { [key: string]: string } = {}

    // 3. Validasi Sederhana
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required to sign in'
    }

    // Jika ada error, set state dan stop proses
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // 4. Jika valid, lanjut navigasi
    router.push('/library')
  }

  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to continue your journey"
      footer={
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-xs sm:text-sm text-navy/50 font-medium text-center">
          <span>Don&apos;t have an account?</span>
          <Link
            href="/sign-up"
            className="text-navy font-bold md:hover:text-blue transition-colors underline decoration-transparent md:hover:decoration-blue underline-offset-4"
          >
            Create for free
          </Link>
        </div>
      }
    >
      <AuthInput
        label="Email Address"
        name="email" // Penting untuk binding
        type="email"
        placeholder="name@domain.com"
        icon={AtSign}
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email} // Pass error message
      />

      <AuthInput
        label="Password"
        name="password" // Penting untuk binding
        type="password"
        placeholder="••••••••"
        icon={Lock}
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password} // Pass error message
        extraLabel={
          <Link
            href="#"
            className="text-[10px] sm:text-xs font-bold text-blue md:hover:text-blue/80 md:hover:underline transition-all"
          >
            Forgot Password?
          </Link>
        }
      />

      <AuthButton onClick={handleSignIn}>Sign In</AuthButton>

      <AuthDivider />
      <GoogleButton />
    </AuthCard>
  )
}
