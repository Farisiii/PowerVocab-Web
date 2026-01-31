'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'

interface FlashcardHeaderProps {
  current: number
  total: number
  deckTitle: string
}

export function FlashcardHeader({
  current,
  total,
  deckTitle,
}: FlashcardHeaderProps) {
  const router = useRouter()
  const [isDesktop, setIsDesktop] = useState(false)
  const progressValue = (current / total) * 100

  useEffect(() => {
    const checkDesktop = () =>
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <header className="w-full flex items-center justify-between gap-3 md:gap-8">
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={isDesktop ? { scale: 1.05 } : {}}
        onClick={() => router.back()}
        className="shrink-0 flex items-center justify-center rounded-xl shadow-soft-lg border-none bg-navy text-white w-10 h-10 md:w-12 md:h-12 transition-all md:hover:bg-blue cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      <div className="flex-1 flex flex-col gap-1.5 md:gap-2 min-w-0">
        <div className="flex justify-between items-end px-0.5 md:px-1">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] text-blue/60 truncate pr-2">
            {deckTitle}
          </span>
          <span className="text-xs md:text-sm font-black text-navy whitespace-nowrap">
            {current} <span className="text-slate-300">/</span> {total}
          </span>
        </div>

        <Progress
          value={progressValue}
          className="h-1.5 md:h-2.5 bg-slate-200/50"
        />
      </div>

      <div className="hidden lg:block w-12" />
    </header>
  )
}
