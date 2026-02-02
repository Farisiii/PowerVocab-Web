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
      whileHover={enableHoverEffect ? { scale: 1.02, y: -4 } : {}}
      whileTap={{ scale: 0.96 }}
      className="h-full"
    >
      <Button
        variant="outline"
        onClick={() => onSelect(id)}
        className={cn(
          'relative w-full h-14 rounded-xl border-2 font-bold transition-all',
          isSelected
            ? 'bg-navy text-white border-navy'
            : 'bg-white text-navy/70 border-slate-200 md:hover:border-blue/30 md:hover:bg-slate-50',
        )}
      >
        {isSelected && (
          <motion.div
            layoutId="active-dot"
            className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          />
        )}

        <span className="relative z-10 wrap-break-word hyphens-auto">
          {text}
        </span>
      </Button>
    </motion.div>
  )
}
