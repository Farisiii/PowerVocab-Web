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
        {/* Scrollable Content Container */}
        <div className="flex-1 w-full flex items-center justify-center overflow-y-auto px-2">
          <div className="w-full max-w-4xl py-1 sm:py-2">
            <h2 className="text-base font-bold leading-relaxed text-navy/80 sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed xl:text-3xl xl:leading-relaxed 2xl:text-4xl 2xl:leading-relaxed">
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
                  <span className="opacity-0 px-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl whitespace-nowrap font-black">
                    {selectedOption ? selectedOption.label : 'placeholder'}
                  </span>
                </motion.span>

                <AnimatePresence mode="wait">
                  {selectedId && selectedOption && (
                    <motion.span
                      key={selectedId}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="absolute bottom-full left-0 w-full text-center pb-0.5 sm:pb-1 md:pb-1.5 lg:pb-2"
                    >
                      <span className="block text-blue font-black text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl whitespace-nowrap drop-shadow-sm">
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

        {/* Scroll Hint - Only show on mobile if content overflows */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-30 md:hidden">
          <svg
            className="w-4 h-4 animate-bounce text-navy/40"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>

        {/* Decorative elements for depth */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl sm:rounded-4xl md:rounded-[2.5rem] lg:rounded-[3rem] xl:rounded-[3.5rem] pointer-events-none">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-sky/10 rounded-full blur-3xl sm:w-40 sm:h-40" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan/10 rounded-full blur-3xl sm:w-40 sm:h-40" />
        </div>
      </motion.div>

      {/* OPTIONS GRID */}
      <div className="shrink-0 w-full">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-4 lg:gap-4 xl:gap-5">
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
                    'w-full h-14 relative overflow-hidden transition-all duration-300',
                    'rounded-xl border-2',
                    'text-sm font-bold whitespace-normal leading-tight px-2',
                    'sm:h-16 sm:rounded-2xl sm:text-base sm:px-3',
                    'md:h-18 md:text-lg md:px-4',
                    'lg:h-20 lg:rounded-2xl lg:text-xl',
                    'xl:h-22 xl:rounded-3xl xl:text-2xl',
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-lg shadow-navy/25'
                      : 'bg-white text-navy/70 border-slate-200 md:hover:border-blue/30 md:hover:bg-slate-50 md:hover:shadow-md active:bg-slate-100',
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-dot"
                      className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    />
                  )}
                  <span
                    className="relative z-10 wrap-break-word hyphens-auto"
                    lang="en"
                  >
                    {option.label}
                  </span>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
