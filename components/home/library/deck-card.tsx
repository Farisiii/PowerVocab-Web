'use client'

import { Edit3, Trash2, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

export function DeckCard({ title, words, progress, description }: any) {
  const radius = 24
  const circumference = 2 * Math.PI * radius

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="h-full"
    >
      <Card className="relative h-full overflow-hidden group rounded-3xl lg:rounded-4xl border-0 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-500">
        <div className="p-6 lg:p-7 flex flex-col h-full justify-between gap-5">
          {/* Card Header */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              {/* Badge & Status */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-2 py-0.5 rounded-md bg-blue/5 text-[9px] font-black text-blue uppercase tracking-widest border border-blue/10">
                  {words} Words
                </div>
                {progress === 100 && (
                  <div className="px-2 py-0.5 rounded-md bg-emerald-50 text-[8px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
                    Done
                  </div>
                )}
              </div>

              {/* Deck Title */}
              <h4 className="text-lg lg:text-xl font-black text-navy leading-tight tracking-tight wrap-break-word line-clamp-2 group-hover:text-blue transition-colors">
                {title}
              </h4>
            </div>

            {/* Progress Circle */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center bg-slate-50 rounded-full">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-slate-100"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r={radius}
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-blue"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{
                    strokeDashoffset:
                      circumference - (circumference * progress) / 100,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[12px] font-black text-navy">
                {progress}%
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-[13px] font-medium italic leading-snug line-clamp-2">
            “{description}”
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-50">
            {/* Study Action */}
            <Button className="flex-1 min-w-25 h-10 bg-navy text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue transition-all active:scale-95 shadow-md shadow-navy/5">
              Study <Play size={12} className="ml-1.5 fill-current" />
            </Button>

            <div className="flex items-center gap-2 w-full xl:w-auto">
              {/* Edit Action */}
              <Button
                variant="outline"
                className="flex-1 h-10 px-3 sm:px-4 rounded-xl bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-navy/60 hover:text-navy transition-all flex items-center justify-center gap-2"
              >
                <Edit3 size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest xl:hidden">
                  Edit
                </span>
              </Button>

              {/* Delete Action */}
              <Button
                variant="outline"
                className="flex-1 h-10 px-3 sm:px-4 rounded-xl bg-white border-slate-200 hover:bg-red-50 hover:border-red-200 text-navy/60 hover:text-red-600 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest xl:hidden">
                  Delete
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
