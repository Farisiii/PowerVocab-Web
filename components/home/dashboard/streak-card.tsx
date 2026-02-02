import { Flame, Zap, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

export function StreakCard({
  streak = 12,
  best = 15,
}: {
  streak?: number
  best?: number
}) {
  return (
    <div className="relative flex-1 rounded-[3rem] overflow-hidden border-4 border-white/40 shadow-glass text-white">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-navy via-blue to-sky" />

      {/* Glow Layers */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan/30 rounded-full blur-3xl" />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_2px_20px_rgba(255,255,255,0.15)]" />

      <div className="relative z-10 flex flex-col justify-between h-full gap-10 p-8">
        {/* Top */}
        <div className="flex justify-between items-start">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Zap size={16} fill="currentColor" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                Streak
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-6xl xl:text-7xl font-black tracking-tighter leading-none drop-shadow-md">
                {streak}
              </span>
              <span className="text-2xl font-black text-cyan uppercase italic">
                Days
              </span>
            </div>
          </div>

          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-md">
            <Flame fill="white" size={30} />
          </div>
        </div>

        {/* Bottom */}
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white/10 rounded-2xl px-5 py-4 border border-white/20 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-3">
              <Trophy size={20} className="text-cyan" />
              <span className="text-[12px] md:text-sm font-black text-white/60 uppercase tracking-widest">
                Best
              </span>
            </div>
            <span className="text-base font-black text-white">{best} Days</span>
          </div>

          <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(streak / best) * 100}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-linear-to-r from-cyan via-sky to-white rounded-full shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
