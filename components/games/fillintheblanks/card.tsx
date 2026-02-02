'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
  const selectedOption = options.find((o) => o.id === selectedId)

  return (
    <div className="w-full h-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 mx-auto max-w-5xl">
      {/* QUESTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative flex flex-col items-center justify-center text-center transition-all',
          'flex-1 min-h-0 rounded-3xl p-4',
          'bg-white border-2 border-slate-100 shadow-xl shadow-navy/5',
          'sm:p-6 sm:rounded-4xl',
          'md:p-8 md:rounded-[2.5rem]',
          'lg:p-10 lg:rounded-[3rem]',
          'xl:p-12 xl:rounded-[3.5rem]',
          'overflow-hidden',
        )}
      >
        <div className="flex-1 w-full flex items-center justify-center overflow-y-auto px-2">
          <div className="w-full max-w-4xl py-1 sm:py-2">
            <h2 className="text-base font-bold leading-relaxed text-navy/80 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              {parts[0]}

              <span className="inline-block relative align-bottom mx-1">
                <motion.span
                  layout
                  className={cn(
                    'block rounded-full transition-colors duration-300',
                    'h-1 sm:h-1.5 md:h-2 lg:h-2.5',
                    'min-w-20 sm:min-w-24 md:min-w-32 lg:min-w-40 xl:min-w-48',
                    selectedId ? 'bg-blue' : 'bg-slate-200',
                  )}
                >
                  <span className="opacity-0 px-2 whitespace-nowrap font-black">
                    {selectedOption?.label || 'placeholder'}
                  </span>
                </motion.span>

                <AnimatePresence mode="wait">
                  {selectedId && selectedOption && (
                    <motion.span
                      key={selectedId}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="absolute bottom-full left-0 w-full text-center"
                    >
                      <span className="block text-blue font-black whitespace-nowrap drop-shadow-sm">
                        {selectedOption.label}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>

              {parts[1]}
            </h2>
          </div>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-30 md:hidden">
          <svg
            className="w-4 h-4 animate-bounce text-navy/40"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>

        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan/10 rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* OPTIONS */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-4">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          return (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.96 }}
            >
              <Button
                variant="outline"
                onClick={() => onSelect(option.id)}
                className={cn(
                  'w-full h-14 rounded-xl border-2 font-bold',
                  isSelected
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy/70 border-slate-200 md:hover:border-blue/30 md:hover:bg-slate-50',
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  />
                )}
                {option.label}
              </Button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
