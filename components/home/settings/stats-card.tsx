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
    <div className="relative rounded-[3rem] flex items-center gap-8 overflow-hidden border-4 border-white/50 shadow-glass p-6 md:p-12">
      {/* Glass Effect Layers */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0">
        <div className="absolute -top-12 -left-12 w-48 h-48 lg:w-60 lg:h-60 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-40 h-40 lg:w-52 lg:h-52 bg-blue/15 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 left-1/4 w-44 h-44 lg:w-56 lg:h-56 bg-cyan/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 lg:w-72 lg:h-72 bg-linear-to-br from-sky/10 to-blue/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.8),transparent_50%)]"
          style={{ backgroundSize: '30px 30px' }}
        />
      </div>
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(28,77,141,0.03)_100%)]" />
      <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.1)]" />

      {/* Decorative Icon */}
      <div className="absolute -right-5 -top-5 text-blue/5 rotate-12 z-0">
        <Zap size={120} strokeWidth={1} fill="currentColor" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-8 w-full">
        {/* Progress Circle */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <div className="absolute inset-0 bg-cyan/30 blur-xl rounded-full" />

          <svg
            className="w-full h-full -rotate-90 relative z-10"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={isPremium ? '#0f2854' : '#e2e8f0'}
              strokeWidth="8"
              strokeLinecap="round"
              opacity={isPremium ? 0.15 : 1}
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
              stroke={isPremium ? 'url(#progressGradient)' : '#1c4d8d'}
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

        {/* Stats Info */}
        <div className="flex flex-col relative z-10">
          <span className="text-[10px] font-bold text-sky tracking-[0.25em] uppercase mb-1.5 flex items-center gap-2">
            <Sparkles
              size={12}
              strokeWidth={2.5}
              className={
                isPremium ? 'text-blue animate-pulse' : 'text-slate-400'
              }
            />
            Mastery Level
          </span>

          <span className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-br from-navy via-blue to-sky tracking-tighter leading-[0.9] mb-2 drop-shadow-sm">
            2,450
          </span>

          <span className="text-xs font-bold tracking-wider text-navy/60">
            Total words learned
          </span>
        </div>
      </div>
    </div>
  )
}
