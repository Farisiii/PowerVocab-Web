'use client'

import { Check, X } from 'lucide-react'

interface FlashcardControlsProps {
  onNext: (mastered: boolean) => void
}

export function FlashcardControls({ onNext }: FlashcardControlsProps) {
  return (
    <div className="flex items-center justify-center gap-14 md:gap-20">
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => onNext(false)}
          className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white shadow-soft-lg flex items-center justify-center text-red-400 md:hover:bg-red-500 md:hover:text-white transition-all active:scale-90"
        >
          <X className="w-7 h-7" strokeWidth={3} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Revise
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => onNext(true)}
          className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-navy shadow-soft-lg flex items-center justify-center text-white md:hover:bg-blue transition-all active:scale-90"
        >
          <Check className="w-7 h-7" strokeWidth={3} />
        </button>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Mastered
        </span>
      </div>
    </div>
  )
}
