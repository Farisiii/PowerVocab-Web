'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { motion, Variants } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface AuthCardProps {
  title: string
  description: string
  footer: ReactNode
  children: ReactNode
}

const cardContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

export function AuthCard({
  title,
  description,
  footer,
  children,
}: AuthCardProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () =>
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <motion.div
      initial={isDesktop ? 'hidden' : 'visible'}
      animate="visible"
      variants={cardContainerVariants}
      className="relative w-full"
    >
      <Card className="glass-card relative z-10 overflow-hidden rounded-[2.5rem] border-white/50 shadow-xl shadow-blue/5">
        <div className="absolute inset-0 bg-linear-to-tr from-white/40 to-transparent pointer-events-none" />

        <CardHeader className="text-center lg:space-y-4 p-0 lg:mb-10 relative z-10 pt-6 sm:pt-8 px-5 sm:px-8">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-navy">
            {title}
          </CardTitle>

          <CardDescription className="text-xs sm:text-sm md:text-base lg:text-lg text-navy/50 font-medium leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 p-0 relative z-10 px-5 sm:px-8">
          {children}
        </CardContent>

        <CardFooter className="justify-center p-0 relative z-10 pb-8 px-8 pt-6">
          {footer}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
