'use client'

import { Button } from '@/components/ui/button'
import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

interface AuthButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export function AuthButton({
  children,
  onClick,
  type = 'button',
}: AuthButtonProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        type={type}
        onClick={onClick}
        className="shadow-lg shadow-blue/20 w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg tracking-wide bg-navy hover:bg-blue text-white rounded-xl sm:rounded-2xl font-black uppercase transition-all duration-300"
      >
        {children}
      </Button>
    </motion.div>
  )
}
