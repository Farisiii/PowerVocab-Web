'use client'

// =============================
// AccuracyCard.tsx
// =============================
import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function AccuracyCard({ accuracy = 94 }: { accuracy?: number }) {
  return (
    <div className="flex-1 rounded-[2.5rem] p-6 sm:p-8 xl:p-10 relative overflow-hidden border border-slate-200/60 shadow-soft-lg bg-white">
      {/* Soft Accent */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky/20 rounded-full blur-3xl opacity-60" />

      <div className="relative z-10 flex flex-col gap-8 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 bg-sky/10 rounded-lg border border-sky/20">
            <TrendingUp size={14} className="text-blue" />
            <p className="text-[10px] font-black text-navy uppercase tracking-[0.25em]">
              Accuracy
            </p>
          </div>
        </div>

        {/* Main Value */}
        <div className="flex items-end justify-center gap-3 flex-1">
          <h2 className="text-7xl sm:text-8xl font-black tracking-tighter leading-none text-navy">
            {accuracy}
          </h2>
          <span className="text-3xl font-black text-blue mb-2">%</span>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${accuracy}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-linear-to-r from-blue via-sky to-cyan rounded-full"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Performance
            </span>
            <span className="px-4 py-1.5 bg-emerald-500 text-[10px] font-black text-white rounded-xl uppercase tracking-widest shadow-md">
              Elite
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
