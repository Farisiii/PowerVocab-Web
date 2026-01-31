'use client'

import { Check, X } from 'lucide-react'

interface FlashcardControlsProps {
  onNext: (mastered: boolean) => void
}

export function FlashcardControls({ onNext }: FlashcardControlsProps) {
  return (
    <div className="flex items-center justify-center gap-12 sm:gap-14 md:gap-16 lg:gap-20 xl:gap-24">
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <button
          onClick={() => onNext(false)}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-white shadow-soft-lg flex items-center justify-center text-red-400 md:hover:bg-red-500 md:hover:text-white md:hover:scale-105 transition-all active:scale-90 z-1"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={3} />
        </button>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
          Revise
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <button
          onClick={() => onNext(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full bg-navy shadow-soft-lg flex items-center justify-center text-white md:hover:bg-blue md:hover:scale-105 transition-all active:scale-90 z-1"
        >
          <Check
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            strokeWidth={3}
          />
        </button>
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
          Mastered
        </span>
      </div>
    </div>
  )
}
