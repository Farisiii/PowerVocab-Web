'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AtSign, Lock, User } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { motion, Variants } from 'framer-motion'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSignUp = () => {
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
    router.push('/library')
  }

  return (
    <AuthCard
      title="Create Account"
      description="Start your ultra-modern learning path today"
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
      />

      <motion.div
        variants={itemVariants}
        className="flex items-start space-x-3 py-2 px-1"
      >
        <Checkbox
          id="terms"
          className="mt-0.5 border-navy/20 data-[state=checked]:bg-navy text-white rounded-md transition-all active:scale-90"
        />
        <label
          htmlFor="terms"
          className="text-xs sm:text-sm font-medium leading-snug text-navy/60 select-none cursor-pointer"
        >
          I agree to the{' '}
          <Link href="#" className="text-blue font-bold md:hover:underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-blue font-bold md:hover:underline">
            Privacy Policy
          </Link>
        </label>
      </motion.div>

      <AuthButton onClick={handleSignUp}>Create Account</AuthButton>

      <AuthDivider />
      <GoogleButton />
    </AuthCard>
  )
}
