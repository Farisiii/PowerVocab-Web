'use client'

import { Play } from 'lucide-react'
import { MOCK_DECKS, MOCK_USER } from '@/lib/data'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function ProgressCard() {
  const activeDeck =
    MOCK_DECKS.find((d) => d.id === MOCK_USER.lastOpenedDeckId) || MOCK_DECKS[0]

  const radius = 50
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset =
    circumference - (activeDeck.progress / 100) * circumference

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-4xl lg:rounded-[2.5rem] bg-linear-to-br from-navy via-[#1a2b4b] to-blue p-5 sm:p-8 lg:p-10 text-white shadow-xl group w-full"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -top-12 -right-12 w-48 h-48 lg:w-64 lg:h-64 bg-cyan/20 rounded-full blur-[60px] lg:blur-[80px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-12">
        <div className="flex-1 text-center md:text-left min-w-0 w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em] mb-3 lg:mb-4 text-cyan">
              <span className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              Active Session
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-2 tracking-tighter leading-tight wrap-break-word line-clamp-2 md:mb-8 lg:mb-2">
              {activeDeck.title}
            </h2>

            <p className="hidden lg:block text-white/50 text-sm font-medium mb-8 italic max-w-lg line-clamp-2">
              "{activeDeck.description}"
            </p>

            <Button
              size="sm"
              className="hidden md:flex bg-white text-navy hover:bg-cyan hover:scale-105 transition-all font-black text-[10px] tracking-widest rounded-xl px-8 h-8 lg:h-12 shadow-md shadow-cyan/10"
            >
              START SESSION
              <Play size={14} fill="currentColor" className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="relative shrink-0">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center">
            <svg
              viewBox="0 0 120 120"
              className="w-full h-full -rotate-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]"
            >
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-white/5"
              />
              <motion.circle
                cx="60"
                cy="60"
                r={radius}
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-cyan"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'circOut' }}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute text-center">
              <span className="block text-xl sm:text-2xl lg:text-3xl font-black tracking-tighter">
                {activeDeck.progress}%
              </span>
              <span className="text-[8px] uppercase font-bold opacity-40 tracking-widest">
                Mastery
              </span>
            </div>
          </div>
        </div>

        <Button className="w-full md:hidden bg-white text-navy active:bg-cyan font-black text-[10px] tracking-widest rounded-xl h-11 shadow-lg active:scale-95 transition-all">
          START SESSION
          <Play size={14} fill="currentColor" className="ml-2" />
        </Button>
      </div>
    </motion.div>
  )
}
