'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface GameHeaderProps {
  current: number
  total: number
  deckTitle: string
  onBackClick?: () => void
}

export function GameHeader({
  current,
  total,
  deckTitle,
  onBackClick,
}: GameHeaderProps) {
  const progressValue = Math.min((current / total) * 100, 100)

  return (
    <header className="w-full relative z-20 mx-auto max-w-7xl">
      <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
        {/* BACK BUTTON */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05, x: -2 }}
          onClick={onBackClick}
          className="group relative shrink-0 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-navy shadow-glass w-11 h-11 md:w-14 md:h-14 transition-all duration-300 hover:border-blue/50 hover:shadow-soft-lg hover:text-blue hover:bg-white cursor-pointer overflow-hidden"
        >
          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-blue/5 via-sky/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Icon */}
          <ArrowLeft className="relative z-10 w-5 h-5 md:w-6 md:h-6 stroke-[2.5px] transition-transform duration-300 group-hover:-translate-x-0.5" />

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_20px_rgba(28,77,141,0.1)]" />
        </motion.button>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col justify-center gap-2.5 md:gap-3.5 min-w-0">
          <div className="flex justify-between items-center gap-3 px-1">
            <div className="flex flex-col min-w-0 pr-3">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm md:text-xl font-black text-navy uppercase tracking-tight truncate leading-none"
                style={{
                  textShadow: '0 2px 10px rgba(15, 40, 84, 0.1)',
                }}
              >
                {deckTitle}
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative shrink-0 flex items-center gap-1 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 shadow-glass overflow-hidden"
            >
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.8),transparent_50%)] bg-size-[15px_15px]" />
              <div className="absolute inset-0 bg-linear-to-br from-blue/5 via-transparent to-sky/5" />
              <span className="relative z-10 text-lg md:text-xl font-black text-navy tabular-nums leading-none">
                {current}
              </span>
              <span className="relative z-10 text-[10px] md:text-xs font-bold text-blue/60 uppercase tracking-wider">
                / {total}
              </span>
            </motion.div>
          </div>

          {/* PROGRESS BAR */}
          <div className="relative h-3.5 md:h-4 w-full bg-white/60 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border-2 border-slate-200/80">
            <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.5),transparent_70%)] bg-size-[12px_12px]" />
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full shadow-lg shadow-blue/30 overflow-hidden"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-blue), var(--color-sky), var(--color-cyan))',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressValue}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-white/40" />
              <div className="absolute top-0 right-0 bottom-0 w-12 md:w-20 bg-linear-to-l from-white/60 to-transparent" />
              <motion.div
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/40 rounded-full"
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  )
}
