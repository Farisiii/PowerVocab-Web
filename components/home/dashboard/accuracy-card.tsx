'use client'

import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function AccuracyCard({ accuracy = 94 }: { accuracy?: number }) {
  return (
    <div className="relative flex-1 rounded-[3rem] overflow-hidden border-4 border-white/50 shadow-glass p-6 sm:p-8 xl:p-10">
      <div className="absolute inset-0 bg-white" />

      <div className="absolute inset-0">
        <div className="absolute -top-16 -left-16 w-56 h-56 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-br from-sky/5 to-blue/5" />
      </div>

      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
      <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.08)]" />
      <div className="relative z-10 flex flex-col gap-10 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-sky/10 rounded-xl border border-sky/20">
            <TrendingUp size={14} className="text-blue" />
            <p className="text-[10px] font-black text-sky uppercase tracking-[0.25em]">
              Accuracy
            </p>
          </div>
        </div>

        {/* Main Value */}
        <div className="flex items-end justify-center gap-3 flex-1">
          <h2 className="text-7xl sm:text-8xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-linear-to-br from-navy via-blue to-sky drop-shadow-sm">
            {accuracy}
          </h2>
          <span className="text-3xl font-black text-blue mb-2">%</span>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          <div className="h-3 w-full bg-white/60 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-linear-to-r from-navy via-blue to-sky rounded-full shadow-md"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-navy/50 uppercase tracking-widest">
              Performance
            </span>

            <span className="px-4 py-1.5 bg-linear-to-r from-emerald-400 to-emerald-600 text-[10px] font-black text-white rounded-xl uppercase tracking-widest shadow-md">
              Elite
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
