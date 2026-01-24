'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function LearningActivity() {
  const [] = useState(new Date(2026, 0, 24))
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

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
    <div className="bg-white rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-8 lg:p-10 shadow-2xl shadow-navy/5 border border-white h-full">
      {/* HEADER */}
      <div className="flex flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-navy uppercase tracking-tighter italic">
            Activity
          </h3>
          <p className="text-[9px] sm:text-[10px] font-bold text-sky tracking-[0.3em] uppercase">
            Consistency Monitor
          </p>
        </div>

        <div className="flex items-center bg-slate-50 p-2 rounded-2xl gap-3 border border-slate-100">
          <button className="py-2 md:p-2 hover:bg-white hover:shadow-sm rounded-xl text-navy transition-all">
            <ChevronLeft size={18} strokeWidth={3} />
          </button>
          <span className="text-xs font-black uppercase tracking-widest min-w-22.5 text-center">
            Jan 2026
          </span>
          <button className="py-2 md:p-2 text-slate-300 cursor-not-allowed">
            <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4">
        {days.map((d) => (
          <div
            key={d}
            className="text-center text-[9px] sm:text-[10px] font-black text-slate-300 tracking-[0.2em]"
          >
            {d}
          </div>
        ))}

        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
          const type = activity[date]
          return (
            <div
              key={date}
              className="aspect-square flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`
                  w-full max-w-10 sm:max-w-12 aspect-square rounded-xl sm:rounded-2xl
                  flex items-center justify-center text-xs sm:text-sm font-black transition-all border-2
                  ${type === 1 ? 'bg-red-50 border-red-100 text-red-500' : ''}
                  ${type === 2 ? 'bg-sky/10 border-sky/20 text-sky' : ''}
                  ${
                    type === 3
                      ? 'bg-navy border-navy text-white shadow-xl shadow-navy/30 rounded-full scale-110'
                      : 'border-transparent text-slate-300'
                  }
                `}
              >
                {date}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
