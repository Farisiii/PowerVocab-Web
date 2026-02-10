'use client'

import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  disabled: boolean
  onSave: () => void
}

export default function StickyFooter({ disabled, onSave }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-50 flex justify-center">
      <Button
        onClick={onSave}
        disabled={disabled}
        size="lg"
        className="w-full h-14 rounded-2xl bg-navy hover:bg-blue text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-blue/20 active:scale-95 transition-all md:w-1/2 md:mx-auto"
      >
        <Save className="mr-2" size={20} />
        Create Deck
      </Button>
    </div>
  )
}
