'use client'

import { motion } from 'framer-motion'
import { GameOptionButton } from '@/components/games/common/game-option-button'

interface Option {
  id: string
  text: string
}

interface FillBlankCardProps {
  sentence: string
  options: Option[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function FillBlankCard({
  sentence,
  options,
  selectedId,
  onSelect,
}: FillBlankCardProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4 mx-auto max-w-5xl">
      {/* SENTENCE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 min-h-0 rounded-3xl p-6 bg-white border-2 border-slate-100 shadow-xl shadow-navy/5 flex items-center justify-center text-center"
      >
        <p className="text-lg font-bold text-navy/80 md:text-xl lg:text-2xl">
          {sentence}
        </p>
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
          />
        ))}
      </div>
    </div>
  )
}
