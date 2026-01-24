'use client'

import { Play, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { MOCK_USER, MOCK_DECKS } from '@/lib/data'

export function LastSessionCard() {
  // Ambil deck terakhir dari mock data (simulasi REST API)
  const lastDeck = MOCK_DECKS.find(
    (deck) => deck.id === MOCK_USER.lastOpenedDeckId,
  )

  if (!lastDeck) return null

  const mastered = Math.round((lastDeck.progress / 100) * lastDeck.totalWords)
  const remaining = lastDeck.totalWords - mastered

  return (
    <div className="bg-linear-to-br from-blue to-navy rounded-4xl sm:rounded-[3rem] p-6 sm:p-10 text-white relative overflow-hidden group flex flex-col justify-between min-h-80 shadow-2xl shadow-navy/20 border border-white/5">
      {/* Decorative Background Icon */}
      <div className="absolute -top-6 -right-6 text-white/5 group-hover:text-white/10 group-hover:scale-110 transition-all duration-700 pointer-events-none">
        <BookOpen size={180} strokeWidth={1} />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          <p className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-cyan/70">
            Instant Insights • Last Session
          </p>
        </div>

        {/* Deck Title */}
        <h3 className="text-3xl sm:text-4xl font-black tracking-tighter leading-tight mb-2">
          {lastDeck.title.split(' ').slice(0, 2).join(' ')}
          <br />
          {lastDeck.title.split(' ').slice(2).join(' ')}
        </h3>

        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-8 italic">
          {lastDeck.description}
        </p>

        {/* === MASTERED & REMAINING (SIDE BY SIDE ALWAYS) === */}
        <div className="mb-10">
          <div className="grid grid-cols-2 gap-8">
            {/* Mastered */}
            <div className="space-y-3">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/40">
                Mastered
              </p>

              <div className="flex items-end gap-2">
                <span className="text-5xl sm:text-6xl font-black tabular-nums text-white leading-none">
                  {mastered}
                </span>
                <span className="text-white/40 text-sm sm:text-base mb-1">
                  / {lastDeck.totalWords}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-white/15 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lastDeck.progress}%` }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="h-full bg-linear-to-r from-cyan via-sky to-white rounded-full"
                />
              </div>

              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                {lastDeck.progress}% completed
              </p>
            </div>

            {/* Remaining */}
            <div className="space-y-3 text-right">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/40">
                Remaining
              </p>

              <div className="flex justify-end items-end gap-2">
                <span className="text-5xl sm:text-6xl font-black tabular-nums text-cyan leading-none">
                  {remaining}
                </span>
                <span className="text-white/40 text-sm sm:text-base mb-1">
                  words
                </span>
              </div>

              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Out of {lastDeck.totalWords}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <Button
        asChild
        variant="secondary"
        className="w-full h-14 sm:h-16 bg-white hover:bg-cyan text-navy rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 group/btn shadow-xl relative z-10"
      >
        <motion.button whileTap={{ scale: 0.97 }}>
          RESUME SESSION
          <Play
            size={14}
            fill="currentColor"
            className="ml-2 group-hover/btn:translate-x-1 transition-transform"
          />
        </motion.button>
      </Button>
    </div>
  )
}
