'use client'

import { useState, useEffect } from 'react'
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
  const [isDesktop, setIsDesktop] = useState(false)
  const radius = 24
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    // Cek apakah layar >= 768px (md breakpoint)
    const checkScreen = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return (
    <motion.div
      // Logic: Hover cuma aktif kalau di desktop
      whileHover={isDesktop ? { y: -8 } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="h-full"
    >
      {/* Tambahkan prefix 'md:' pada semua class hover agar tidak nyangkut di mobile */}
      <Card className="relative h-full overflow-hidden group rounded-3xl lg:rounded-4xl border-0 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] md:hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] active:shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-500">
        <div className="p-6 lg:p-7 flex flex-col h-full justify-between gap-5">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="px-2 py-0.5 rounded-md bg-blue/5 text-[9px] xl:text-[10px] font-black text-blue uppercase tracking-widest border border-blue/10">
                  {words} Words
                </div>
                {progress === 100 && (
                  <div className="px-2 py-0.5 rounded-md bg-emerald-50 text-[9px] xl:text-[10px] font-black text-emerald-600 uppercase tracking-widest border border-emerald-100">
                    Done
                  </div>
                )}
              </div>

              {/* md:group-hover:text-blue */}
              <h4 className="text-lg lg:text-xl font-black text-navy leading-tight tracking-tight wrap-break-word line-clamp-2 md:group-hover:text-blue group-active:text-blue transition-colors">
                {title}
              </h4>
            </div>

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

          <p className="text-slate-400 text-[13px] font-medium italic leading-snug line-clamp-2">
            "{description}"
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-50">
            <Button
              onClick={onPlay}
              className="flex-1 min-w-25 h-10 bg-navy text-white rounded-xl font-black text-[10px] uppercase tracking-widest md:hover:bg-blue active:bg-blue transition-all active:scale-95 shadow-md shadow-navy/5"
            >
              Flashcard <Play size={12} className="ml-1.5 fill-current" />
            </Button>

            <div className="flex items-center gap-2 w-full xl:w-auto">
              <Button
                onClick={onEdit}
                variant="outline"
                className="flex-1 h-10 px-3 sm:px-4 rounded-xl bg-white border-slate-200 md:hover:bg-green-50 md:hover:border-green-200 active:bg-green-50 active:border-green-200 text-navy/60 md:hover:text-green-600 active:text-green-600 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Edit3 size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest xl:hidden">
                  Edit
                </span>
              </Button>

              <Button
                onClick={onDelete}
                variant="outline"
                className="flex-1 h-10 px-3 sm:px-4 rounded-xl bg-white border-slate-200 md:hover:bg-red-50 md:hover:border-red-200 active:bg-red-50 active:border-red-200 text-navy/60 md:hover:text-red-600 active:text-red-600 transition-all flex items-center justify-center gap-2 active:scale-95"
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
