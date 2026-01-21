'use client'

import { LoginForm } from '@/components/auth/login-form'
import { AuthLayout } from '@/components/auth/auth-layout'

export default function SignInPage() {
  return (
    <AuthLayout
      title={
        <>
          Power <br /> Vocab.
        </>
      }
      badge="Elevate Your Lexicon"
      description="Join thousands of learners mastering English through our AI-driven path."
      mobileSubtitle="Elevate Your Lexicon"
      stats={[
        { value: '12k+', label: 'Active Users' },
        { value: '50k+', label: 'Mastered Words' },
      ]}
    >
      <LoginForm />
    </AuthLayout>
  )
}
