'use client'

import { Play, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function LastSessionCard() {
  return (
    <div className="bg-linear-to-br from-blue to-navy rounded-4xl sm:rounded-[3rem] p-6 sm:p-10 text-white relative overflow-hidden group flex flex-col justify-between min-h-80 shadow-2xl shadow-navy/20 border border-white/5">
      {/* Decorative Background Icon */}
      <div className="absolute -top-6 -right-6 text-white/5 group-hover:text-white/10 group-hover:scale-110 transition-all duration-700 pointer-events-none">
        <BookOpen size={180} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          <p className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-cyan/70">
            Instant Insights • Last Session
          </p>
        </div>

        <h3 className="text-3xl sm:text-4xl font-black tracking-tighter leading-tight mb-2">
          Advanced
          <br />
          Slang
        </h3>

        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-8 italic">
          Master informal English
        </p>

        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 mb-8">
          {/* Mastered Stat */}
          <div className="flex-1 flex-row md:flex-col items-center justify-between px-5 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md group/stat hover:bg-white/10 transition-colors">
            <p className="text-sm lg:text-md font-black uppercase text-white/30 tracking-[0.2em]">
              Mastered
            </p>
            <p className="text-4xl md:text-5xl font-black tabular-nums">
              42<span className="text-white/20 text-lg ml-0.5">/60</span>
            </p>
          </div>

          {/* Left Stat */}
          <div className="flex-1 flex-row md:flex-col items-center justify-between px-5 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md group/stat hover:bg-white/10 transition-colors">
            <p className="text-sm lg:text-md font-black uppercase text-white/30 tracking-[0.2em]">
              Remaining
            </p>
            <p className="text-4xl md:text-5xl font-black text-cyan tabular-nums">
              18
            </p>
          </div>
        </div>
      </div>

      <Button
        asChild
        variant="secondary"
        className="w-full h-14 sm:h-16 bg-white hover:bg-cyan text-navy rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 group/btn shadow-xl relative z-10"
      >
        <motion.button whileTap={{ scale: 0.98 }}>
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
