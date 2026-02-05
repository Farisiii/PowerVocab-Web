'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { motion, Variants } from 'framer-motion'
import { Loader2 } from 'lucide-react'

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
  isLoading?: boolean
  disabled?: boolean
  className?: string
}

export function AuthButton({
  children,
  onClick,
  type = 'button',
  isLoading = false,
  disabled = false,
  className,
}: AuthButtonProps) {
  const isButtonDisabled = isLoading || disabled

  return (
    <motion.div
      variants={itemVariants}
      whileHover={isButtonDisabled ? {} : { scale: 1.01 }}
      whileTap={isButtonDisabled ? {} : { scale: 0.98 }}
      className="w-full"
    >
      <Button
        type={type}
        onClick={onClick}
        disabled={isButtonDisabled}
        className={`
            shadow-lg shadow-blue/20 w-full h-11 sm:h-12 md:h-14 
            text-sm sm:text-base tracking-wide 
            bg-navy md:hover:bg-blue text-white 
            rounded-xl sm:rounded-2xl font-black uppercase 
            transition-all duration-300
            disabled:opacity-70 disabled:cursor-not-allowed
            ${className ?? ''}
        `}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={20} strokeWidth={2.5} />
            <span>{children}</span>
          </div>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  )
}
