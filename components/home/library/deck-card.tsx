'use client'

import { Edit3, Trash2, Layers, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

export function DeckCard({ title, words, progress, description }: any) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="h-full"
    >
      <Card
        className="
          relative overflow-hidden group
          rounded-[2.25rem]
          border border-white/40
          bg-white/60 backdrop-blur-xl
          shadow-[0_20px_50px_rgba(15,40,84,0.08)]
          hover:shadow-[0_30px_70px_rgba(15,40,84,0.15)]
          transition-all duration-500
          p-6 lg:p-7
          flex flex-col justify-between gap-6
          h-full
        "
      >
        {/* Soft glow background */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-cyan/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* TOP CONTENT */}
        <div className="flex items-start gap-5 relative z-10">
          {/* DONUT PROGRESS */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="relative w-16 h-16 lg:w-20 lg:h-20">
              <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                  className="text-navy/10"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="transparent"
                  className="text-blue"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Percentage */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs lg:text-sm font-black text-navy leading-none">
                  {progress}%
                </span>
                <span className="text-[8px] lg:text-[9px] uppercase tracking-widest opacity-40">
                  Done
                </span>
              </div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="min-w-0 flex-1 space-y-2">
            {/* Title */}
            <div className="flex items-center gap-2">
              <h4 className="font-black text-[15px] lg:text-base text-navy truncate tracking-tight">
                {title}
              </h4>

              {progress === 100 && (
                <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full bg-cyan/20 text-cyan">
                  Done
                </span>
              )}
            </div>

            {/* Meta */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-sky/10 border border-sky/10">
              <Layers size={11} className="text-sky" />
              <p className="text-[9px] font-black text-sky uppercase tracking-widest">
                {words} WORDS
              </p>
            </div>

            {/* Description */}
            <p className="text-[11px] lg:text-[12px] text-slate-500 line-clamp-2 italic leading-relaxed opacity-80">
              “{description}”
            </p>
          </div>
        </div>

        {/* ACTION AREA */}
        <div className="flex gap-3 relative z-10">
          {/* MAIN ACTION */}
          <Button
            className="
              flex-1 h-11 lg:h-12
              text-[10px] font-black uppercase tracking-widest
              rounded-2xl gap-2
              bg-navy text-white
              hover:bg-blue
              shadow-md hover:shadow-lg
              transition-all duration-300
            "
          >
            <Play size={14} />
            Study
          </Button>

          {/* EDIT */}
          <Button
            variant="secondary"
            className="
              h-11 lg:h-12 px-4
              rounded-2xl
              bg-white/70 border border-white/30
              hover:bg-white hover:shadow-sm
              transition-all duration-300
            "
          >
            <Edit3 size={14} className="text-navy/70" />
          </Button>

          {/* DELETE */}
          <Button
            variant="secondary"
            className="
              h-11 lg:h-12 px-4
              rounded-2xl
              bg-white/70 border border-white/30
              hover:bg-red-50 hover:text-red-500 hover:border-red-200
              transition-all duration-300
            "
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
