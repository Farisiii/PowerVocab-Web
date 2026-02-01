'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.5x' },
  { value: 1.0, label: '1.0x' },
  { value: 2.0, label: '2.0x' },
]

interface Props {
  playbackRate: number
  onChange: (rate: number) => void
  isDesktop: boolean
}

export function SpeedControls({ playbackRate, onChange, isDesktop }: Props) {
  return (
    <div className="flex gap-1 bg-white/50 backdrop-blur-sm p-1.5 rounded-xl border-2 border-white/60 shadow-lg">
      {SPEED_OPTIONS.map((option) => {
        const isActive = playbackRate === option.value
        return (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            whileHover={isDesktop ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative rounded-lg transition-all cursor-pointer',
              'px-3 py-2 sm:px-4 sm:py-2.5',
              'text-xs sm:text-sm font-bold',
              'flex-1 sm:flex-none sm:min-w-14 md:min-w-16',
            )}
          >
            {isActive && (
              <motion.div
                layoutId="speed-active"
                className="absolute inset-0 bg-linear-to-br from-navy to-blue rounded-lg shadow-[0_4px_20px_rgba(28,77,141,0.3)]"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}
            <span
              className={cn(
                'relative z-10 transition-colors duration-200',
                isActive ? 'text-white' : 'text-navy/60 hover:text-navy',
              )}
            >
              {option.label}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
