'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FillBlankControlsProps {
  onCheck: () => void
  disabled: boolean
}

export function FillBlankControls({
  onCheck,
  disabled,
}: FillBlankControlsProps) {
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
          'h-14 text-lg rounded-2xl',
          'md:w-80 lg:w-96 lg:h-16 lg:text-xl lg:rounded-full',
          disabled && 'opacity-50 cursor-not-allowed grayscale-[0.5]',
        )}
      >
        Check Answer
      </Button>
    </motion.div>
  )
}
