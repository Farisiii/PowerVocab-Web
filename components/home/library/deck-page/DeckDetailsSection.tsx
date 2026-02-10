'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  deckName: string
  description: string
  deckNameError: string
  isGenerating: boolean
  onDeckNameChange: (val: string) => void
  onDeckNameBlur: () => void
  onDescriptionChange: (val: string) => void
  onAiGenerate: () => void
}

export default function DeckDetailsSection({
  deckName,
  description,
  deckNameError,
  isGenerating,
  onDeckNameChange,
  onDeckNameBlur,
  onDescriptionChange,
  onAiGenerate,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      {/* Deck Name */}
      <div className="relative flex flex-col gap-2">
        <label className="text-xs font-bold text-navy/60 uppercase tracking-widest ml-1">
          Deck Name
        </label>

        <Input
          placeholder="e.g. Advanced Verbs"
          value={deckName}
          onBlur={onDeckNameBlur}
          onChange={(e) => onDeckNameChange(e.target.value)}
          className={`h-14 rounded-2xl border-2 text-lg font-bold text-navy ${
            deckNameError
              ? 'border-red-300 focus-visible:ring-red-200'
              : 'border-slate-200 focus-visible:border-blue'
          }`}
        />

        <AnimatePresence>
          {deckNameError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute -bottom-5 left-1 text-xs font-bold text-red-500"
            >
              {deckNameError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-navy/60 uppercase tracking-widest ml-1">
          Description{' '}
          <span className="text-slate-300 normal-case font-medium">
            (Optional)
          </span>
        </label>

        <Textarea
          placeholder="What is this deck about?"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="min-h-25 rounded-2xl border-slate-200 text-base text-navy resize-none"
        />
      </div>

      {/* AI Generate Button */}
      <button
        onClick={onAiGenerate}
        disabled={!deckName.trim()}
        className="w-full relative group overflow-hidden rounded-2xl bg-linear-to-r from-blue to-navy p-0.5 disabled:opacity-50 active:scale-[0.98] transition-all md:w-1/2 md:mx-auto md:block"
      >
        <div className="bg-white/10 backdrop-blur-sm h-12 rounded-[14px] flex items-center justify-center gap-2 group-hover:bg-transparent transition-colors">
          {isGenerating && (
            <Loader2 className="animate-spin text-white" size={18} />
          )}
          <span className="font-black text-white text-sm uppercase tracking-widest">
            {isGenerating ? 'Generating...' : 'AI Generate'}
          </span>
        </div>
      </button>
    </motion.section>
  )
}
