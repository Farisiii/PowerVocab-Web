'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GameOptionButtonProps {
  id: string
  text: string
  selectedId: string | null
  onSelect: (id: string) => void
  enableHoverEffect?: boolean
}

export function GameOptionButton({
  id,
  text,
  selectedId,
  onSelect,
  enableHoverEffect = true,
}: GameOptionButtonProps) {
  const isSelected = selectedId === id

  return (
    <motion.div
      whileHover={enableHoverEffect ? { scale: 1.03, y: -6 } : {}}
      whileTap={{ scale: 0.97 }}
      className="h-full"
    >
      <Button
        variant="outline"
        onClick={() => onSelect(id)}
        className={cn(
          'relative w-full h-14 rounded-2xl border-2 font-bold transition-all duration-300 overflow-hidden',
          isSelected
            ? 'bg-navy text-white border-navy shadow-soft-lg'
            : 'bg-white/80 text-navy/70 border-slate-200/80 backdrop-blur-sm md:hover:border-blue/50 md:hover:bg-white md:hover:shadow-glass md:hover:text-navy md:hover:scale-[1.01]',
        )}
      >
        {isSelected && (
          <>
            <div className="absolute inset-0 bg-linear-to-br from-navy via-blue to-navy opacity-100" />
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div className="absolute inset-0 bg-linear-to-br from-sky/20 via-transparent to-cyan/20 opacity-50" />
            <motion.div
              layoutId="active-dot"
              className="absolute top-3 right-3 w-2 h-2 bg-cyan rounded-full shadow-[0_0_12px_rgba(34,211,238,1)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            <motion.div
              className="absolute top-3 right-3 w-2 h-2 bg-cyan/30 rounded-full"
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </>
        )}

        {!isSelected && (
          <>
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.8),transparent_50%)] bg-size-[20px_20px]" />
            <div className="absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_20px_rgba(28,77,141,0.1)]" />
          </>
        )}
        <span
          className={cn(
            'relative z-10 px-3 wrap-break-word hyphens-auto leading-tight transition-all duration-300',
            isSelected ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]' : '',
          )}
        >
          {text}
        </span>

        {isSelected && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-cyan to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        )}
      </Button>
    </motion.div>
  )
}
