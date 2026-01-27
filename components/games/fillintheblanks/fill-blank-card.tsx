'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Option {
  id: string
  label: string
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
  const parts = sentence.split('{blank}')

  return (
    <div className=" w-full h-7/8 lg:w-full lg:h-full flex flex-col justify-center gap-4 lg:gap-8 mx-auto">
      {/* QUESTION CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'glass-card relative flex flex-col items-center justify-center text-center shadow-soft-lg transition-all',
          'flex-1 rounded-4xl px-5 py-6',
          'lg:flex-none lg:w-full lg:aspect-21/9 lg:rounded-[48px] lg:px-20 lg:py-10 lg:max-h-[50vh]',
        )}
      >
        <div className="overflow-y-auto max-h-full w-full no-scrollbar flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold leading-relaxed text-navy md:text-3xl lg:text-5xl lg:leading-tight">
            {parts[0]}

            <span className="relative inline-flex flex-col justify-end mx-4 align-bottom">
              {/* Garis */}
              <span
                className={cn(
                  'block h-1 lg:h-1.5 rounded-full transition-all duration-500 mb-1 lg:mb-2',
                  'w-20 md:w-32 lg:w-48',
                  selectedId
                    ? 'bg-blue shadow-[0_0_20px_rgba(28,77,141,0.5)]'
                    : 'bg-cyan',
                )}
              />

              {/* Floating Answer */}
              {selectedId && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-center text-blue font-black italic text-xl lg:text-4xl whitespace-nowrap"
                >
                  {options.find((o) => o.id === selectedId)?.label}
                </motion.span>
              )}
            </span>

            {parts[1]}
          </h2>
        </div>
      </motion.div>

      {/* OPTIONS GRID */}
      <div className="shrink-0 w-full lg:w-[80%] lg:mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {options.map((option) => {
            const isSelected = selectedId === option.id
            return (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  onClick={() => onSelect(option.id)}
                  className={cn(
                    'w-full border-2 transition-all duration-300 shadow-sm whitespace-normal',
                    'h-16 text-base font-bold rounded-2xl px-2',
                    'lg:h-20 lg:text-xl lg:rounded-4xl',
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-blue/25 shadow-lg'
                      : 'bg-white/80 text-navy border-transparent hover:bg-white hover:border-blue/20',
                  )}
                >
                  {option.label}
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
