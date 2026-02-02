'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GameOptionButton } from '@/components/games/common/game-option-button'

interface Option {
  id: string
  text: string
}

interface MultipleChoiceCardProps {
  description: string
  options: Option[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function MultipleChoiceCard({
  description,
  options,
  selectedId,
  onSelect,
}: MultipleChoiceCardProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-4 mx-auto max-w-5xl">
      {/* DESCRIPTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex-1 min-h-0 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center border-4 border-white/50 p-6 sm:p-8 md:p-10 lg:p-12"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white via-sky/5 to-cyan/10" />
        <div className="absolute inset-0 bg-linear-to-br from-transparent via-blue/5 to-sky/10" />
        <div className="absolute inset-0">
          <div className="absolute -top-12 -left-12 w-48 h-48 lg:w-60 lg:h-60 bg-sky/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-40 h-40 lg:w-52 lg:h-52 bg-blue/15 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 left-1/4 w-44 h-44 lg:w-56 lg:h-56 bg-cyan/25 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 lg:w-72 lg:h-72 bg-linear-to-br from-sky/10 to-blue/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.8),transparent_50%)]"
            style={{ backgroundSize: '30px 30px' }}
          />
        </div>
        <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(28,77,141,0.03)_100%)]" />

        <div className="relative z-10 shrink-0 px-4 py-1.5 rounded-full bg-navy border border-blue backdrop-blur-sm">
          <span className="text-[11px] font-black tracking-[0.2em] text-slate-100 uppercase">
            Deskripsi
          </span>
        </div>

        <div className="relative z-10 flex-1 w-full flex items-center justify-center overflow-y-auto mt-6 px-2">
          <div className="w-full max-w-4xl">
            <p className="text-lg font-bold leading-relaxed text-navy/80 md:text-xl lg:text-2xl">
              {description}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.1)]" />
      </motion.div>

      {/* OPTIONS */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-4">
        {options.map((option) => (
          <GameOptionButton
            key={option.id}
            id={option.id}
            text={option.text}
            selectedId={selectedId}
            onSelect={onSelect}
            enableHoverEffect={isDesktop}
          />
        ))}
      </div>
    </div>
  )
}
