'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AtSign, Lock, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-input'
import { AuthButton } from './auth-button'
import { AuthDivider, GoogleButton } from './auth-social'

export function LoginForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    if (generalError) setGeneralError(null)
  }

  const handleSignIn = async () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.email.trim())
      newErrors.email = 'Please enter your email address'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format'
    if (!formData.password) newErrors.password = 'Password is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setIsLoading(true)
    setGeneralError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const isLoginSuccess =
        formData.email === 'demo@pvocab.com' && formData.password === '12345678'
      if (!isLoginSuccess) throw new Error('Invalid email or password')
      router.push('/library')
    } catch (err: any) {
      setGeneralError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Welcome Back"
      description={
        <AnimatePresence mode="wait" initial={false}>
          {generalError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-full flex justify-center"
            >
              <div
                className="
                inline-flex items-center px-4 py-1 gap-2.5 h-8
                rounded-full 
                bg-red-50/80 backdrop-blur-sm 
                border border-red-100/50 
                shadow-sm shadow-red-500/5
              "
              >
                <span className="text-[11px] sm:text-xs font-bold text-red-600 tracking-wide uppercase">
                  {generalError}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.span
              key="description"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              Sign in to continue your journey
            </motion.span>
          )}
        </AnimatePresence>
      }
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
        name="email"
        type="email"
        placeholder="name@domain.com"
        icon={AtSign}
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        disabled={isLoading}
      />

      <AuthInput
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        disabled={isLoading}
        extraLabel={
          <Link
            href="#"
            className="text-[10px] sm:text-xs font-bold text-blue md:hover:text-blue/80 md:hover:underline transition-all"
          >
            Forgot Password?
          </Link>
        }
      />

      <AuthButton onClick={handleSignIn} isLoading={isLoading}>
        Sign In
      </AuthButton>

      <AuthDivider />
      <GoogleButton />
    </AuthCard>
  )
}
