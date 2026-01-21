'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AtSign, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-input'
import { AuthDivider, GoogleButton } from './auth-social'

export function LoginForm() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to continue your journey"
      footer={
        <p className="text-sm md:text-base text-navy/50 font-medium">
          Don&apos;t have an account?{' '}
          <motion.span className="inline-block" whileTap={{ y: -2 }}>
            <Link
              href="/sign-up"
              className="text-navy font-bold hover:text-blue transition-colors"
            >
              Create for free
            </Link>
          </motion.span>
        </p>
      }
    >
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="name@domain.com"
        icon={AtSign}
      />

      <div className="space-y-3">
        <div className="flex justify-between items-center ml-1">
          <span className="font-bold text-xs uppercase tracking-[0.2em] text-navy/60">
            Password
          </span>
          <motion.div whileTap={{ scale: 0.95, opacity: 0.7 }}>
            <Link
              href="#"
              className="text-xs font-bold text-blue hover:underline transition-all"
            >
              Forgot Password?
            </Link>
          </motion.div>
        </div>

        <AuthInput
          label=""
          type="password"
          placeholder="••••••••"
          icon={Lock}
        />
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <Button className="btn-modern shadow-soft-lg w-full text-lg tracking-wide h-15 active:bg-blue/90">
          Sign In
        </Button>
      </motion.div>

      <AuthDivider />
      <GoogleButton />
    </AuthCard>
  )
}
