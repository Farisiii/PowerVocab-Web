'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AtSign, Lock, User } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-input'
import { AuthButton } from './auth-button'
import { AuthDivider, GoogleButton } from './auth-social'
import Link from 'next/link'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

export function RegisterForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
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

  const handleSignUp = async () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required to start your journey'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is missing'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Secure password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setGeneralError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push('/library')
    } catch (err: any) {
      setGeneralError(
        err.message || 'Failed to create account. Please try again.',
      )
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Create Account"
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
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
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
              Start your ultra-modern learning path today
            </motion.span>
          )}
        </AnimatePresence>
      }
      footer={
        <p className="text-xs sm:text-sm text-navy/50 font-medium text-center">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-navy font-bold md:hover:text-blue transition-colors underline decoration-transparent md:hover:decoration-blue underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      }
    >
      <AuthInput
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="John Doe"
        icon={User}
        value={formData.fullName}
        onChange={handleInputChange}
        error={errors.fullName}
        disabled={isLoading}
      />

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
      />
      <AuthButton onClick={handleSignUp} isLoading={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </AuthButton>

      <AuthDivider />
      <GoogleButton />
    </AuthCard>
  )
}
