'use client'
import { Flame, Target, Zap, Trophy, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function StatsCards({ accuracy = 94, streak = 12, best = 15 }) {
  return (
    <div className="flex flex-col lg:flex-row xl:flex-col gap-6 w-full">
      <div className="order-2 md:order-1 xl:order-2 flex-1 rounded-[2.5rem] p-6 sm:p-8 xl:p-10 relative overflow-hidden border border-white/60 shadow-soft-lg bg-linear-to-br from-white via-[#F1F9FD] to-[#D9F2FD]">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan/40 rounded-full blur-3xl opacity-70" />

        <div className="relative z-10 flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/70 rounded-lg border border-navy/20">
              <TrendingUp size={14} className="text-blue" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
                Accuracy
              </p>
            </div>
          </div>

          {/* Main Value */}
          <div className="flex items-end justify-center gap-3">
            <h2 className="text-7xl sm:text-8xl font-black text-navy tracking-tighter leading-none">
              {accuracy}
            </h2>
            <span className="text-3xl font-black text-blue mb-2">%</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full bg-linear-to-r from-navy via-blue to-sky rounded-full"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Performance Rate
              </span>
              <span className="px-4 py-1.5 bg-emerald-500 text-[10px] font-black text-white rounded-xl uppercase tracking-widest shadow-md">
                Elite
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-1 md:order-2 xl:order-1 flex-1 rounded-[2.5rem] p-8 text-white shadow-soft-lg relative overflow-hidden bg-linear-to-br from-navy via-blue to-sky">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_70%)]" />

        <div className="relative z-10 flex flex-col justify-between h-full gap-8">
          {/* Top */}
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Zap size={16} fill="currentColor" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                  Streak
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-6xl xl:text-7xl font-black tracking-tighter leading-none">
                  {streak}
                </span>
                <span className="text-2xl font-black text-cyan uppercase italic">
                  Days
                </span>
              </div>
            </div>

            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Flame fill="white" size={28} />
            </div>
          </div>

          {/* Bottom */}
          <div className="space-y-5">
            <div className="flex justify-between items-center bg-white/10 rounded-2xl px-5 py-4 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Trophy size={18} className="text-cyan" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">
                  Best
                </span>
              </div>
              <span className="text-base font-black text-white">
                {best} Days
              </span>
            </div>

            <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(streak / best) * 100}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full bg-linear-to-r from-cyan via-sky to-white rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
