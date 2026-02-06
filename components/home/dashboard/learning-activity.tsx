'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
}

const dayVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

export function LearningActivity() {
  const [currentDate] = useState(new Date(2026, 0, 1))

  const daysInMonth = 31
  const startDayIndex = currentDate.getDay()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const activity: Record<number, number> = {
    5: 1,
    12: 1,
    19: 1,
    1: 2,
    2: 2,
    3: 2,
    4: 2,
    6: 2,
    7: 2,
    8: 2,
    9: 2,
    10: 2,
    11: 2,
    13: 2,
    14: 2,
    15: 2,
    16: 2,
    17: 2,
    18: 2,
    20: 2,
    21: 2,
    22: 2,
    23: 2,
    24: 3,
  }

  return (
    <Card className="relative rounded-[3rem] border-4 border-white/50 shadow-glass overflow-hidden bg-linear-to-br from-cyan via-[#eaf4fb] to-white/70 backdrop-blur-xl">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-br from-sky/5 to-blue/5" />
      </div>
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
      <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.08)]" />
      <CardContent className="p-6 sm:p-8 lg:p-10 relative z-10">
        {/* HEADER */}
        <div className="flex flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-black text-navy uppercase tracking-tighter">
              Activity
            </h3>
            <p className="text-[9px] sm:text-[10px] font-bold text-sky tracking-[0.3em] uppercase">
              Consistency Monitor
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-0 md:gap-2 bg-white/60 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white/60 shadow-sm"
          >
            <Button
              size="icon"
              variant="ghost"
              className="rounded-xl text-navy hover:bg-white hover:shadow-md"
            >
              <ChevronLeft size={18} strokeWidth={3} />
            </Button>

            <span className="text-xs font-black uppercase tracking-widest min-w-24 text-center text-navy">
              Jan 2026
            </span>

            <Button size="icon" variant="ghost" disabled className="rounded-xl">
              <ChevronRight size={18} strokeWidth={3} />
            </Button>
          </motion.div>
        </div>

        {/* GRID */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4"
        >
          {days.map((d) => (
            <div
              key={d}
              className="text-center text-[9px] sm:text-[10px] md:text-xs font-black text-navy/60 tracking-[0.2em]"
            >
              {d}
            </div>
          ))}

          {Array.from({ length: startDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => {
            const type = activity[date]
            let styles = 'bg-white/40 border-transparent text-slate-300'

            if (type === 1)
              styles = 'bg-red-50/70 border-red-100 text-red-500 shadow-sm'
            if (type === 2)
              styles = 'bg-sky/10 border-sky/20 text-sky shadow-sm'
            if (type === 3)
              styles = 'bg-navy border-navy text-white scale-110 shadow-lg'

            return (
              <motion.div
                key={date}
                variants={dayVariants}
                className="aspect-square flex items-center justify-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: type === 3 ? 0 : [0, -2, 2, 0],
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-full max-w-10 sm:max-w-12 aspect-square
                    flex items-center justify-center
                    text-xs sm:text-sm font-black
                    border-2 transition-colors duration-300
                    rounded-xl sm:rounded-2xl
                    ${styles}
                    ${type === 3 ? 'rounded-full' : ''}
                  `}
                >
                  {date}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </CardContent>
    </Card>
  )
}
