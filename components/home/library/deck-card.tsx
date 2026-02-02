'use client'

import { Edit3, Trash2, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface DeckCardProps {
  title: string
  words: number
  progress: number
  description: string
  onEdit?: () => void
  onDelete?: () => void
  onPlay?: () => void
}

export function DeckCard({
  title,
  words,
  progress,
  description,
  onEdit,
  onDelete,
  onPlay,
}: DeckCardProps) {
  const radius = 24
  const circumference = 2 * Math.PI * radius

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="h-full"
    >
      <Card
        className="
          relative h-full overflow-hidden
          rounded-3xl border border-white/60
          bg-white/80 backdrop-blur-xl
          shadow-glass
          transition-all duration-500
          group
          hover:shadow-soft-lg
        "
      >
        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-white via-white to-cyan/10 opacity-60 pointer-events-none" />

        <div className="relative z-10 p-6 flex flex-col h-full gap-6">
          {/* TOP */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-blue/5 text-[10px] font-black text-blue uppercase tracking-widest border border-blue/10">
                  {words} Words
                </span>

                {progress === 100 && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
                    Done
                  </span>
                )}
              </div>

              <h4 className="text-xl font-black text-navy leading-tight tracking-tight line-clamp-2 group-hover:text-blue transition-colors">
                {title}
              </h4>
            </div>

            {/* Progress Circle */}
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
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
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
              </svg>

              <span className="absolute text-[12px] font-black text-navy">
                {progress}%
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* ACTIONS */}
          <div className="mt-auto pt-5 border-t border-slate-100 flex flex-col gap-3">
            <Button
              onClick={onPlay}
              className="
                w-full h-11 rounded-2xl
                bg-navy text-white
                font-black text-xs uppercase tracking-widest
                hover:bg-blue
                transition-all
                active:scale-95
                shadow-md shadow-navy/10
              "
            >
              Flashcard
              <Play size={14} className="ml-2 fill-current" />
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={onEdit}
                variant="outline"
                className="
                  flex-1 h-10 rounded-xl
                  border-slate-200
                  text-navy/70
                  hover:bg-green-50 hover:text-green-600 hover:border-green-200
                  transition-all active:scale-95
                "
              >
                <Edit3 size={14} />
              </Button>

              <Button
                onClick={onDelete}
                variant="outline"
                className="
                  flex-1 h-10 rounded-xl
                  border-slate-200
                  text-navy/70
                  hover:bg-red-50 hover:text-red-600 hover:border-red-200
                  transition-all active:scale-95
                "
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
