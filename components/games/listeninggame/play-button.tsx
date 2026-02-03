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
      whileHover={isDesktop ? { scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto"
    >
      <Button
        onClick={onClick}
        className={cn(
          'rounded-xl sm:rounded-2xl transition-colors duration-500 relative overflow-hidden',
          'w-full sm:w-14 sm:h-14 md:w-16 md:h-16',
          'h-14 sm:h-auto',
          isPlaying
            ? 'bg-linear-to-br from-cyan via-sky to-blue text-navy'
            : 'bg-linear-to-br from-navy via-blue to-sky text-white',
        )}
        style={{
          boxShadow: isPlaying
            ? '0 8px 30px rgba(6,182,212,0.3)'
            : '0 8px 30px rgba(28,77,141,0.2)',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={isPlaying ? 'pause' : 'play'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex items-center justify-center gap-3 w-full"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-current" />
                <span className="sm:hidden font-bold tracking-wide">
                  PAUSE AUDIO
                </span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-current" />
                <span className="sm:hidden font-bold tracking-wide">
                  PLAY AUDIO
                </span>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        )}
      </Button>
    </motion.div>
  )
}
