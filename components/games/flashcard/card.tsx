'use client'

import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlashcardCardProps {
  english: string
  indonesian: string
  isFlipped: boolean
  onFlip: () => void
}

const getFontSize = (text: string, isTranslation = false) => {
  const cleanLength = text.replace(/\s/g, '').length

  if (isTranslation) {
    if (cleanLength <= 8) return 'text-5xl sm:text-6xl md:text-7xl'
    if (cleanLength <= 14) return 'text-4xl sm:text-5xl md:text-6xl'
    if (cleanLength <= 20) return 'text-3xl sm:text-4xl md:text-5xl'
    return 'text-2xl sm:text-3xl md:text-4xl'
  }

  if (cleanLength <= 6) return 'text-6xl sm:text-7xl md:text-8xl'
  if (cleanLength <= 10) return 'text-5xl sm:text-6xl md:text-7xl'
  if (cleanLength <= 15) return 'text-4xl sm:text-5xl md:text-6xl'
  return 'text-3xl sm:text-4xl md:text-5xl'
}

export function FlashcardCard({
  english,
  indonesian,
  isFlipped,
  onFlip,
}: FlashcardCardProps) {
  const speak = (text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div
      className="relative w-full max-w-85 sm:max-w-95 md:max-w-105 lg:max-w-135 xl:max-w-150 h-full perspective-1000 mx-auto transition-all duration-500"
      onClick={onFlip}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="w-full h-full relative cursor-pointer rounded-[2.5rem] lg:rounded-[3rem]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT SIDE - English */}
        <div className="absolute inset-0 backface-hidden rounded-[2.5rem] lg:rounded-[3rem] bg-linear-to-br from-navy via-blue to-sky flex flex-col items-center justify-center border-4 border-white/10 p-6 sm:p-8 md:p-10 lg:p-12">
          <span className="absolute top-6 sm:top-8 lg:top-10 px-4 sm:px-5 lg:px-6 py-1.5 lg:py-2 rounded-full bg-white/20 text-[9px] sm:text-[10px] lg:text-[11px] font-black tracking-[0.2em] text-white uppercase">
            English
          </span>

          <div className="flex flex-col items-center gap-5 sm:gap-6 md:gap-8 lg:gap-10">
            <h2
              className={`${getFontSize(english, true)} font-black text-white text-center leading-tight px-4`}
            >
              {english}
            </h2>

            <Button
              size="icon"
              className="rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 bg-white text-navy md:hover:bg-cyan md:hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-xl"
              onClick={(e) => {
                e.stopPropagation()
                speak(english)
              }}
            >
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            </Button>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-white">
              Tap to Reveal
            </span>
          </div>
        </div>

        {/* BACK SIDE - Indonesian */}
        <div
          className="absolute inset-0 backface-hidden rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center border-4 border-white/50 p-6 sm:p-8 md:p-10 lg:p-12"
          style={{ transform: 'rotateY(180deg)' }}
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

          <span className="absolute top-6 sm:top-8 lg:top-10 px-4 sm:px-5 lg:px-6 py-1.5 lg:py-2 rounded-full bg-navy text-[9px] sm:text-[10px] lg:text-[11px] font-black tracking-[0.2em] text-white uppercase">
            Indonesian
          </span>

          <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6 md:gap-8 lg:gap-10">
            <h2
              className={`${getFontSize(indonesian)} font-black text-navy text-center leading-none px-4`}
              style={{
                textShadow:
                  '0 2px 10px rgba(28,77,141,0.1), 0 0 30px rgba(28,77,141,0.05)',
              }}
            >
              {indonesian}
            </h2>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 flex flex-col items-center gap-2 opacity-50 z-10">
            <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-navy drop-shadow-sm">
              Tap to Reveal
            </span>
          </div>

          <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.1)]" />
        </div>
      </motion.div>
    </div>
  )
}
