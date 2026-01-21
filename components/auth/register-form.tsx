'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AtSign, Lock, User } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { motion } from 'framer-motion'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-input'
import { AuthDivider, GoogleButton } from './auth-social'

export function RegisterForm() {
  const router = useRouter()

  const handleSignUp = () => {
    // logic for sign-up
    router.push('/library')
  }
  return (
    <AuthCard
      title="Create Account"
      description="Start your ultra-modern learning path today"
      footer={
        <p className="text-sm md:text-base text-navy/50 font-medium">
          Already have an account?{' '}
          <motion.span className="inline-block" whileTap={{ y: -2 }}>
            <Link
              href="/sign-in"
              className="text-navy font-bold hover:text-blue transition-colors"
            >
              Sign In
            </Link>
          </motion.span>
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

      {/* TERMS */}
      <div className="flex items-start space-x-3 py-2 px-1">
        <Checkbox
          id="terms"
          className="mt-1 border-navy/20 data-[state=checked]:bg-navy rounded-sm transition-transform active:scale-90"
        />
        <label
          htmlFor="terms"
          className="text-xs md:text-sm font-medium leading-snug text-navy/60"
        >
          I agree to the{' '}
          <Link href="#" className="text-blue font-bold hover:underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-blue font-bold hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <Button
          onClick={handleSignUp}
          className="btn-modern shadow-soft-lg w-full text-lg tracking-wide h-15 active:bg-blue/90"
        >
          Create Account
        </Button>
      </motion.div>

      <AuthDivider />
      <GoogleButton />
    </AuthCard>
  )
}
