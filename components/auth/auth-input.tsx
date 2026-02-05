'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LucideIcon, AlertCircle } from 'lucide-react'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { ReactNode, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon: LucideIcon
  extraLabel?: ReactNode
  containerClassName?: string
  error?: string
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

export function AuthInput({
  label,
  icon: Icon,
  extraLabel,
  className,
  containerClassName,
  error,
  ...props
}: AuthInputProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn('space-y-2 sm:space-y-3', containerClassName)}
    >
      <div className="flex justify-between items-center ml-1">
        {label && (
          <Label className="font-bold text-[12px] sm:text-xs uppercase tracking-[0.2em] text-navy/60">
            {label}
          </Label>
        )}
        {extraLabel && extraLabel}
      </div>

      <div className="relative group">
        <Input
          {...props}
          className={cn(
            'h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white/60 border-2 pl-11 pr-4 sm:pl-12 sm:pr-6 transition-all shadow-sm md:group-hover:bg-white/80',
            'focus-visible:ring-0 focus-visible:border-blue focus-visible:bg-white focus-visible:text-navy',

            error
              ? 'border-red-500/50 text-red-900 placeholder:text-red-300 focus-visible:placeholder:text-gray-400'
              : 'border-transparent',
            className,
          )}
        />
        <Icon
          className={cn(
            'absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition-colors',
            error
              ? 'text-red-400 group-focus-within:text-blue'
              : 'text-navy/30 group-focus-within:text-blue',
          )}
        />

        {/* Alert Icon */}
        {error && (
          <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500 animate-in fade-in zoom-in duration-300 transition-opacity group-focus-within:opacity-0" />
        )}
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="text-[10px] sm:text-xs font-bold text-red-500 ml-1 flex items-center gap-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
