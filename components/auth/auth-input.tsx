'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LucideIcon } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { ReactNode, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon: LucideIcon
  extraLabel?: ReactNode
  containerClassName?: string
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
  ...props
}: AuthInputProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn('space-y-2 sm:space-y-3', containerClassName)}
    >
      {/* Label & Extra Actions */}
      <div className="flex justify-between items-center ml-1">
        {label && (
          <Label className="font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-navy/60">
            {label}
          </Label>
        )}
        {extraLabel && extraLabel}
      </div>

      {/* Input Field */}
      <div className="relative group">
        <Input
          {...props}
          className={cn(
            'h-11 sm:h-12 md:h-14 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white/60 border-2 border-transparent pl-11 pr-4 sm:pl-12 sm:pr-6 focus-visible:ring-0 focus-visible:border-blue focus-visible:bg-white transition-all shadow-sm group-hover:bg-white/80',
            className,
          )}
        />
        {/* Input Icon */}
        <Icon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-navy/30 transition-colors group-focus-within:text-blue" />
      </div>
    </motion.div>
  )
}
