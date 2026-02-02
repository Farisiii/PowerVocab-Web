'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GameControlsProps {
  onAction: () => void
  disabled: boolean
  label: string
}

export function GameControls({ onAction, disabled, label }: GameControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex justify-center"
    >
      <Button
        onClick={onAction}
        disabled={disabled}
        className={cn(
          'btn-modern w-full shadow-soft-lg transition-all duration-300',
          'h-14 text-base rounded-2xl bg-primary text-white',
          'sm:w-96 md:w-100 md:h-16 md:rounded-full',
          'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        )}
      >
        {label}
      </Button>
    </motion.div>
  )
}
