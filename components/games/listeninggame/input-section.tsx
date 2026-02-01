'use client'

import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface InputSectionProps {
  userInput: string
  onInputChange: (value: string) => void
}

export function InputSection({ userInput, onInputChange }: InputSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative z-10"
    >
      <div className="relative group">
        <div className="absolute -inset-2 bg-linear-to-r from-blue/30 via-sky/30 to-cyan/30 rounded-2xl md:rounded-3xl blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-1 bg-linear-to-r from-blue/20 via-sky/20 to-cyan/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

        <Textarea
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Start typing here..."
          className={cn(
            'relative w-full resize-none',
            'text-sm sm:text-base md:text-lg',
            'rounded-xl sm:rounded-2xl md:rounded-3xl',
            'bg-white/80 border-2 border-white/60',
            'px-4 sm:px-6 md:px-8 lg:px-10',
            'py-4 sm:py-5 md:py-6 lg:py-7',
            'font-medium text-navy placeholder:text-navy/30',
            'focus-visible:ring-4 focus-visible:ring-sky/30 focus-visible:border-blue/60 focus-visible:bg-white',
            'transition-all duration-300',
            'shadow-[inset_0_2px_8px_rgba(15,40,84,0.03),0_4px_20px_rgba(28,77,141,0.08)]',
            'hover:border-white/80 hover:shadow-[inset_0_2px_8px_rgba(15,40,84,0.05),0_8px_30px_rgba(28,77,141,0.12)]',
            'h-80 sm:h-55 md:h-130 lg:h-40',
            'leading-relaxed',
            'overflow-y-auto',
          )}
          style={{
            textShadow: '0 1px 2px rgba(28,77,141,0.03)',
          }}
        />
      </div>
    </motion.div>
  )
}
