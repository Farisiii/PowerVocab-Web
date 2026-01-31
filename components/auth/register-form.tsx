'use client'

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

  const handleSignUp = () => {
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
        type="text"
        placeholder="John Doe"
        icon={User}
      />

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="name@domain.com"
        icon={AtSign}
      />

      <AuthInput
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
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
