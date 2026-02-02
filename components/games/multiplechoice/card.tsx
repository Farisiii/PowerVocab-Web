'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Option {
  id: string
  word: string
}

interface MatchDefinitionCardProps {
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
}: MatchDefinitionCardProps) {
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
    <div className="w-full h-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 mx-auto max-w-5xl">
      {/* DESCRIPTION CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative flex flex-col items-center text-center transition-all',
          'flex-1 min-h-0 rounded-3xl p-4',
          'bg-white border-2 border-slate-100 shadow-xl shadow-navy/5',
          'sm:p-6 sm:rounded-4xl',
          'md:p-8 md:rounded-[2.5rem]',
          'lg:p-10 lg:pt-0 lg:rounded-[3rem]',
          'xl:p-12 xl:pt-0xl:rounded-[3.5rem]',
          'overflow-hidden',
        )}
      >
        {/* Indonesian Badge - Fixed at top */}
        <div className="shrink-0 lg:absolute lg:top-4 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 backdrop-blur-sm sm:px-4 sm:py-1.5 lg:px-5 lg:py-2">
          <span className="text-[10px] font-black tracking-[0.2em] text-navy/60 uppercase sm:text-[10px] lg:text-[11px] flex items-center">
            Deskripsi
          </span>
        </div>

        {/* Scrollable Description Container */}
        <div className="flex-1 w-full flex items-center justify-center overflow-y-auto mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-2">
          <div className="w-full max-w-4xl py-1 sm:py-2">
            <p className="text-base font-bold leading-relaxed text-navy/80 sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:text-2xl lg:leading-relaxed xl:text-3xl xl:leading-relaxed 2xl:text-4xl 2xl:leading-relaxed">
              {description}
            </p>
          </div>
        </div>

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
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:grid-cols-4">
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
                  <span
                    className="relative z-10 wrap-break-word hyphens-auto"
                    lang="en"
                  >
                    {option.word}
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
