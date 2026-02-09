'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Type } from 'lucide-react'
import { DeckSidebarProps } from '@/types/library-type'

export function DeckSidebar({
  isEditMode,
  deckName,
  setDeckName,
  description,
  setDescription,
  deckNameError,
  validateDeckName,
  isGenerating,
  isLoadingData,
  onAiGenerate,
}: DeckSidebarProps) {
  const showDeckNameError = deckNameError !== ''

  return (
    <div className="w-1/3 bg-linear-to-b from-[#f8fafc] to-[#eaf4fb] border-r border-blue/10 relative overflow-y-auto shrink-0">
      <div className="p-10 space-y-8">
        <div>
          <h2 className="text-3xl font-black text-navy tracking-tighter mb-1">
            {isEditMode ? 'EDIT DECK' : 'NEW DECK'}
          </h2>
          <p className="text-navy/60 text-sm font-medium">
            {isEditMode
              ? 'Update your vocabulary set details.'
              : 'Create a new vocabulary set manually or let AI help you.'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Deck Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-navy/70 uppercase tracking-widest ml-1">
              Deck Name
            </label>

            <div className="relative">
              <Type
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  showDeckNameError ? 'text-red-400' : 'text-blue/40'
                }`}
                size={15}
              />

              <input
                value={deckName}
                onChange={(e) => {
                  setDeckName(e.target.value)
                  validateDeckName(e.target.value)
                }}
                placeholder="e.g., Advanced Adjectives"
                className={`w-full h-14 pl-12 pr-4 rounded-2xl bg-white border-2 focus:ring-0 text-base text-navy font-bold placeholder:font-medium placeholder:text-navy/20 transition-all shadow-sm ${
                  showDeckNameError
                    ? 'border-red-300 focus:border-red-400'
                    : 'border-transparent focus:border-blue/20'
                }`}
              />

              <div className="relative h-0">
                <AnimatePresence>
                  {showDeckNameError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-1 left-1 text-xs font-bold text-red-500"
                    >
                      {deckNameError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-navy/70 uppercase tracking-widest ml-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this deck about?"
              className="w-full p-4 h-32 rounded-2xl bg-white border-2 border-transparent focus:border-blue/20 focus:ring-0 text-base text-navy resize-none placeholder:text-navy/20 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* AI Button */}
        <div>
          <button
            onClick={onAiGenerate}
            disabled={isGenerating || !deckName.trim() || isLoadingData}
            className="group relative w-full overflow-hidden rounded-2xl bg-linear-to-r from-blue to-navy p-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-blue/20"
          >
            <div className="relative flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm h-14 w-full rounded-2xl transition-all group-hover:bg-transparent">
              <span className="font-black text-white tracking-widest text-sm uppercase">
                {isGenerating ? 'Generating...' : 'AI Generate'}
              </span>
            </div>
          </button>

          <p className="text-center text-[10px] text-navy/40 mt-2 font-medium">
            AI will generate words based on your deck name.
          </p>
        </div>
      </div>
    </div>
  )
}
