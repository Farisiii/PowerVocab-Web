'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AtSign, Lock } from 'lucide-react'
import { AuthCard } from './auth-card'
import { AuthInput } from './auth-input'
import { AuthButton } from './auth-button'
import { AuthDivider, GoogleButton } from './auth-social'

export function LoginForm() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/library')
  }

  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to continue your journey"
      footer={
        /* Footer Navigation */
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-xs sm:text-sm text-navy/50 font-medium text-center">
          <span>Don&apos;t have an account?</span>
          <Link
            href="/sign-up"
            className="text-navy font-bold hover:text-blue transition-colors underline decoration-transparent hover:decoration-blue underline-offset-4"
          >
            Create for free
          </Link>
        </div>
      }
    >
      {/* Email Field */}
      <AuthInput
        label="Email Address"
        type="email"
        placeholder="name@domain.com"
        icon={AtSign}
      />

      {/* Password Field */}
      <AuthInput
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
        extraLabel={
          <Link
            href="#"
            className="text-[10px] sm:text-xs font-bold text-blue hover:text-blue/80 hover:underline transition-all"
          >
            Forgot Password?
          </Link>
        }
      />

      {/* Submit Action */}
      <AuthButton onClick={handleSignIn}>Sign In</AuthButton>

      {/* Social Login */}
      <AuthDivider />
      <GoogleButton />
    </AuthCard>
  )
}
