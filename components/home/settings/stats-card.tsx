'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { Sparkles, Zap } from 'lucide-react'

export default function StatsCard({ isPremium }: { isPremium: boolean }) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      strokeDashoffset: 251.2 * (1 - 0.75),
      transition: { duration: 1.5, ease: 'easeOut', delay: 0.5 },
    })
  }, [controls])

  return (
    <div className="glass-card rounded-[3rem] flex items-center gap-8 relative overflow-hidden border-[1.5px] border-white/50">
      <div className="absolute -right-5 -top-5 text-blue/5 rotate-12">
        <Zap size={120} strokeWidth={1} fill="currentColor" />
      </div>

      <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-cyan/20 blur-xl rounded-full" />

        <svg
          className="w-full h-full -rotate-90 relative z-10"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={isPremium ? '#dbeafe' : '#e2e8f0'}
            strokeWidth="8"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4988c4" />
              <stop offset="50%" stopColor="#1c4d8d" />
              <stop offset="100%" stopColor="#0f2854" />
            </linearGradient>
          </defs>

          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={isPremium ? 'url(#progressGradient)' : '#94a3b8'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset="251.2"
            animate={controls}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center z-20 leading-none">
          <span className="text-2xl font-black text-navy drop-shadow-sm">
            75<span className="text-lg text-sky">%</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col relative z-10">
        <span className="text-[10px] font-bold text-sky tracking-[0.25em] uppercase mb-1.5 flex items-center gap-2">
          <Sparkles
            size={12}
            className={isPremium ? 'text-navy animate-pulse' : 'text-slate-400'}
          />
          Mastery Level
        </span>

        <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-navy to-blue tracking-tighter leading-[0.9] mb-2">
          2,450
        </span>

        <span className="text-xs font-bold tracking-wider text-navy/50">
          Total words learned
        </span>
      </div>
    </div>
  )
}
