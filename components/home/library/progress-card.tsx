'use client'

import { Play } from 'lucide-react'
import { MOCK_DECKS, MOCK_USER } from '@/lib/data'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function ProgressCard() {
  const activeDeck =
    MOCK_DECKS.find((d) => d.id === MOCK_USER.lastOpenedDeckId) || MOCK_DECKS[0]

  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset =
    circumference - (activeDeck.progress / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] bg-linear-to-br from-navy via-[#1a2b4b] to-blue p-7 lg:p-12 text-white shadow-soft-xl group w-full"
    >
      {/* Glow background */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-12">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center lg:text-left min-w-0 order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.3em] mb-4 lg:mb-6 text-cyan/80">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            Active Session
          </div>

          <h2 className="text-3xl lg:text-5xl font-black mb-3 lg:mb-4 tracking-tighter leading-tight lg:leading-[1.1]">
            {activeDeck.title}
          </h2>

          <p className="text-white/50 text-xs lg:text-base font-medium mb-8 italic max-w-xl mx-auto lg:mx-0 line-clamp-2">
            "{activeDeck.description}"
          </p>

          {/* Desktop Button */}
          <Button
            size="lg"
            className="hidden lg:flex bg-white text-navy hover:bg-cyan font-black text-xs tracking-widest rounded-2xl px-10 h-14"
          >
            START SESSION
            <Play size={16} fill="currentColor" className="ml-2" />
          </Button>
        </div>

        {/* RIGHT PROGRESS */}
        <div className="relative shrink-0 flex flex-col items-center order-2">
          <div className="relative w-36 h-36 lg:w-48 lg:h-48 flex items-center justify-center">
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/5"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-cyan"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeDasharray={circumference}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute text-center">
              <span className="block text-3xl lg:text-4xl font-black tracking-tighter">
                {activeDeck.progress}%
              </span>
              <span className="text-[8px] uppercase font-black opacity-40 tracking-[0.2em]">
                Mastery
              </span>
            </div>
          </div>
        </div>

        {/* Mobile + Tablet Button */}
        <Button className="w-full lg:hidden order-3 bg-white text-navy hover:bg-cyan font-black text-xs tracking-widest rounded-2xl shadow-lg h-12">
          START SESSION
          <Play size={16} fill="currentColor" className="ml-2" />
        </Button>
      </div>
    </motion.div>
  )
}
