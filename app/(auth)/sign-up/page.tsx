'use client'

import { RegisterForm } from '@/components/auth/register-form'
import { AuthLayout } from '@/components/auth/auth-layout'

export default function SignUpPage() {
  return (
    <AuthLayout
      title={
        <>
          Start <br /> Learning.
        </>
      }
      badge="The Journey Begins"
      description="Unlock your full potential with PowerVocab. Create an account to track your progress."
      mobileSubtitle="Join the New Wave of Learning"
      stats={[
        { value: 'Free', label: 'To Join' },
        { value: 'AI', label: 'Powered Path' },
      ]}
    >
      <RegisterForm />
    </AuthLayout>
  )
}
