'use client'

import { useState, useEffect } from 'react'
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
  const [isDesktop, setIsDesktop] = useState(false)
  const parts = sentence.split('{blank}')
  const selectedOption = options.find((o) => o.id === selectedId)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <div className="w-full h-full flex flex-col gap-4 lg:gap-8 mx-auto max-w-5xl">
      {/* QUESTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative flex flex-col items-center justify-center text-center transition-all',
          'flex-1 min-h-75 rounded-[2.5rem] p-6 sm:p-10',
          'bg-white border-2 border-slate-100 shadow-xl shadow-navy/5',
          'lg:min-h-100 lg:rounded-[3.5rem] lg:p-16',
        )}
      >
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold leading-relaxed text-navy md:text-3xl lg:text-5xl lg:leading-[1.4]">
            {parts[0]}

            <span className="inline-block relative align-bottom mx-2 sm:mx-3 -mb-1 sm:-mb-2">
              <motion.span
                layout
                className={cn(
                  'block rounded-full transition-colors duration-300',
                  'h-1.5 sm:h-2 lg:h-2.5',
                  'min-w-20 sm:min-w-30 lg:min-w-40',
                  selectedId ? 'bg-blue' : 'bg-slate-200',
                )}
              >
                <span className="opacity-0 px-2 text-xl lg:text-4xl whitespace-nowrap font-black">
                  {selectedOption ? selectedOption.label : 'placeholder'}
                </span>
              </motion.span>

              <AnimatePresence mode="wait">
                {selectedId && selectedOption && (
                  <motion.span
                    key={selectedId}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -6, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute bottom-full left-0 w-full text-center"
                  >
                    <span className="block text-blue font-black text-xl sm:text-2xl lg:text-5xl whitespace-nowrap drop-shadow-sm pb-2">
                      {selectedOption.label}
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>

            {parts[1]}
          </h2>
        </div>
      </motion.div>

      {/* OPTIONS GRID */}
      <div className="shrink-0 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {options.map((option) => {
            const isSelected = selectedId === option.id
            return (
              <motion.div
                key={option.id}
                whileHover={isDesktop ? { scale: 1.02, y: -4 } : {}}
                whileTap={{ scale: 0.96 }}
                className="h-full"
              >
                <Button
                  variant="outline"
                  onClick={() => onSelect(option.id)}
                  className={cn(
                    'w-full h-16 sm:h-20 lg:h-24 relative overflow-hidden transition-all duration-300',
                    'rounded-2xl lg:rounded-3xl border-2',
                    'text-base sm:text-lg lg:text-2xl font-bold whitespace-normal leading-tight px-2',
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-lg shadow-navy/25 translate-y-0'
                      : 'bg-white text-navy/70 border-slate-200 md:hover:border-blue/30 md:hover:bg-slate-50 md:hover:shadow-md',
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-dot"
                      className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    />
                  )}
                  <span className="relative z-10">{option.label}</span>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
