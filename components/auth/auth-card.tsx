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
import { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  description: string
  footer: ReactNode
  children: ReactNode
}

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1,
    },
  },
}

export function AuthCard({
  title,
  description,
  footer,
  children,
}: AuthCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="relative w-full"
    >
      <Card className="glass-card relative z-10 overflow-hidden rounded-[2.5rem]">
        <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />

        {/* HEADER */}
        <CardHeader className="text-center space-y-4 p-0 mb-10 relative z-10">
          <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-navy">
            {title}
          </CardTitle>
          <CardDescription className="text-sm md:text-base lg:text-lg text-navy/50 font-medium italic leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="grid gap-7 p-0 relative z-10">
          {children}
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="justify-center p-0 mt-10 relative z-10">
          {footer}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
