'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
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
        className={cn(
          'relative flex flex-col items-center text-center',
          'flex-1 min-h-0 rounded-3xl p-6',
          'bg-white border-2 border-slate-100 shadow-xl shadow-navy/5',
          'overflow-hidden',
        )}
      >
        <div className="shrink-0 px-4 py-1.5 rounded-full bg-navy/5 border border-navy/10 backdrop-blur-sm">
          <span className="text-[11px] font-black tracking-[0.2em] text-navy/60 uppercase">
            Deskripsi
          </span>
        </div>

        <div className="flex-1 w-full flex items-center justify-center overflow-y-auto mt-6 px-2">
          <div className="w-full max-w-4xl">
            <p className="text-lg font-bold leading-relaxed text-navy/80 md:text-xl lg:text-2xl">
              {description}
            </p>
          </div>
        </div>

        {/* Decorative glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan/10 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* OPTIONS */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
