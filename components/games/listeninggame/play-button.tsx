'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  isPlaying: boolean
  onClick: () => void
  isDesktop: boolean
}

export function PlayButton({ isPlaying, onClick, isDesktop }: Props) {
  return (
    <motion.div
      whileHover={isDesktop ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        size="icon"
        onClick={onClick}
        className={cn(
          'rounded-xl sm:rounded-2xl transition-all duration-300 relative overflow-hidden',
          'w-full sm:w-14 sm:h-14 md:w-16 md:h-16',
          'h-14 sm:h-auto',
          'shadow-[0_8px_30px_rgba(28,77,141,0.2)]',
          isPlaying
            ? 'bg-linear-to-br from-cyan via-sky to-blue text-navy'
            : 'bg-linear-to-br from-navy via-blue to-sky text-white',
        )}
        style={{
          boxShadow: isPlaying
            ? '0 8px 30px rgba(6,182,212,0.3), 0 0 50px rgba(56,189,248,0.2)'
            : '0 8px 30px rgba(28,77,141,0.2)',
        }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-2 sm:gap-0"
            >
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 fill-current" />
              <span className="sm:hidden font-bold">Pause Audio</span>
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-2 sm:gap-0"
            >
              <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 fill-current" />
              <span className="sm:hidden font-bold">Play Audio</span>
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && (
          <>
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 bg-white/10"
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.3,
              }}
            />
          </>
        )}
      </Button>
    </motion.div>
  )
}
