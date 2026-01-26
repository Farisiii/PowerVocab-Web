'use client'

import { motion } from 'framer-motion'
import { RotateCw, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlashcardCardProps {
  word: string
  translation: string
  isFlipped: boolean
  onFlip: () => void
}

export function FlashcardCard({
  word,
  translation,
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
      className="relative w-full max-w-85 md:max-w-md h-full min-h-110 max-h-135 md:max-h-155 perspective-1000 mx-auto transition-all duration-500"
      onClick={onFlip}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="w-full h-full relative cursor-pointer shadow-2xl rounded-[2.5rem]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT — English (Dibalik jadi sisi depan) */}
        <div className="absolute inset-0 backface-hidden rounded-[2.5rem] bg-linear-to-br from-navy via-blue to-sky flex flex-col items-center justify-center border-4 border-white/10 p-8 shadow-glass">
          <span className="absolute top-8 px-5 py-1.5 rounded-full bg-white/20 text-[10px] font-black tracking-[0.2em] text-white uppercase">
            English
          </span>

          <div className="flex flex-col items-center gap-6 md:gap-8">
            <h2 className="text-5xl md:text-7xl font-black text-white text-center tracking-tighter leading-none">
              {translation}
            </h2>

            <Button
              size="icon"
              className="rounded-full w-14 h-14 bg-white text-navy hover:bg-cyan hover:scale-110 shadow-xl transition-all cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                speak(translation)
              }}
            >
              <Volume2 className="w-6 h-6" />
            </Button>
          </div>

          <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-40">
            <RotateCw className="w-5 h-5 text-white animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">
              Tap to Reveal
            </span>
          </div>
        </div>

        {/* BACK — Indonesian (Dibalik jadi sisi belakang) */}
        <div
          className="absolute inset-0 backface-hidden rounded-[2.5rem] glass-card flex flex-col items-center justify-center border border-white bg-white shadow-soft-lg p-8"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <span className="absolute top-8 px-5 py-1.5 rounded-full bg-navy/5 text-[10px] font-black tracking-[0.2em] text-navy/40 uppercase">
            Indonesian
          </span>

          <h2 className="text-5xl md:text-7xl font-black text-navy text-center tracking-tighter leading-none">
            {word}
          </h2>

          <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50">
            <RotateCw className="w-5 h-5 text-blue" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Back to Front
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
