'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface GameHeaderProps {
  current: number
  total: number
  deckTitle: string
}

export function GameHeader({ current, total, deckTitle }: GameHeaderProps) {
  const router = useRouter()
  const [isDesktop, setIsDesktop] = useState(false)
  const progressValue = Math.min((current / total) * 100, 100)

  useEffect(() => {
    const checkDesktop = () =>
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <header className="w-full relative z-20 mx-auto max-w-7xl">
      <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
        {/* BACK BUTTON */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={isDesktop ? { scale: 1.05, x: -2 } : {}}
          onClick={() => router.back()}
          className="group shrink-0 flex items-center justify-center rounded-2xl bg-white border-2 border-slate-100 text-navy shadow-sm w-11 h-11 md:w-14 md:h-14 transition-all hover:border-blue/30 hover:shadow-md hover:text-blue cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5px]" />
        </motion.button>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col justify-center gap-2 md:gap-3 min-w-0">
          <div className="flex justify-between items-end px-1">
            <div className="flex flex-col min-w-0 pr-3">
              <h2 className="text-sm md:text-xl font-black text-navy uppercase tracking-tight truncate leading-none">
                {deckTitle}
              </h2>
            </div>

            {/* Counter Badge */}
            <div className="shrink-0 flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-black text-blue tabular-nums leading-none">
                {current}
              </span>
              <span className="text-xs md:text-sm font-bold text-slate-300">
                / {total}
              </span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="h-3 md:h-4 w-full bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[8px_8px]" />
            <motion.div
              className="absolute top-0 left-0 h-full bg-linear-to-r from-blue via-sky to-cyan rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressValue}%` }}
              transition={{ type: 'spring', stiffness: 40, damping: 15 }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-12 md:w-20 bg-linear-to-l from-white/40 to-transparent" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] mr-1" />
            </motion.div>
          </div>
        </div>
        <div className="hidden md:block w-14" />
      </div>
    </header>
  )
}
