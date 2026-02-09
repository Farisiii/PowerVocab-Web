'use client'

import { LayoutGroup, AnimatePresence } from 'framer-motion'
import { Languages } from 'lucide-react'
import { WordPairsSectionProps } from '@/types/library-type'
import { WordPairRow } from './word-pair-row'

export function WordPairsSection({
  pairs,
  filledPairsCount,
  onChange,
  onRemove,
  onClearAll,
  onCancel,
  onSubmit,
  isFormValid,
  isEditMode,
  isLoadingData,
  listRef,
}: WordPairsSectionProps) {
  return (
    <div className="flex-1 bg-white p-10 flex flex-col min-h-0 overflow-hidden">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-cyan/20 flex items-center justify-center text-blue">
            <Languages size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-navy">Word Pairs</h3>
            <p className="text-xs font-bold text-navy/40 uppercase tracking-wider">
              {filledPairsCount} / 20 Filled
            </p>
          </div>
        </div>

        {filledPairsCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-red-400 hover:text-red-600 font-bold uppercase tracking-wider transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-[1fr_1fr_40px] gap-4 mb-2 px-2 shrink-0">
        <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">
          English <span className="lowercase">(15 letters)</span>
        </span>
        <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">
          Indonesia <span className="lowercase">(20 letters)</span>
        </span>
        <span className="w-10"></span>
      </div>

      <div
        ref={listRef}
        className="flex-1 overflow-y-auto pr-2 -mr-2 scroll-smooth"
      >
        <LayoutGroup>
          <AnimatePresence mode="popLayout" initial={false}>
            {pairs.map((pair) => (
              <WordPairRow
                key={pair.id}
                pair={pair}
                onChange={onChange}
                onRemove={onRemove}
              />
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      <div className="pt-6 mt-4 border-t border-slate-100 flex justify-end gap-4 shrink-0">
        <button
          onClick={onCancel}
          className="px-8 h-14 rounded-2xl font-bold text-navy/60 hover:text-navy hover:bg-slate-100 transition-all"
        >
          Cancel
        </button>

        <button
          onClick={onSubmit}
          disabled={!isFormValid || isLoadingData}
          className="px-10 h-14 rounded-2xl bg-linear-to-r from-blue to-navy text-white font-black tracking-widest text-sm uppercase shadow-lg shadow-navy/20 hover:bg-blue hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-navy"
        >
          {isEditMode ? 'Save Changes' : 'Create Deck'}
        </button>
      </div>
    </div>
  )
}
