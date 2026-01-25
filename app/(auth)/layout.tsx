'use client'

import { useEffect } from 'react'
import QueryProvider from '@/components/providers/query-provider'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    document.documentElement.classList.add('no-gutter-root')

    return () => {
      document.documentElement.classList.remove('no-gutter-root')
    }
  }, [])

  return <QueryProvider>{children}</QueryProvider>
}
