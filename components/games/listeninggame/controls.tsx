'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ListenAndTypeControlsProps {
  onCheck: () => void
  disabled: boolean
}

export function ListenAndTypeControls({
  onCheck,
  disabled,
}: ListenAndTypeControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex justify-center"
    >
      <Button
        onClick={onCheck}
        disabled={disabled}
        className={cn(
          'btn-modern w-full shadow-soft-lg transition-all duration-300',
          'h-14 text-base rounded-2xl',
          'sm:w-96 sm:h-15 sm:text-lg',
          'md:w-100 md:h-16 md:text-lg md:rounded-full',
          'lg:w-112.5 lg:h-17 lg:text-xl',
          'xl:w-125 xl:h-18',
          'active:scale-95',
          disabled && 'opacity-50 cursor-not-allowed grayscale-[0.5]',
        )}
      >
        Check Answer
      </Button>
    </motion.div>
  )
}
