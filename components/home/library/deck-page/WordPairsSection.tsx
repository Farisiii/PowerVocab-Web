'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { WordPair } from '@/types/library-type'

interface Props {
  pairs: WordPair[]
  completedPairsCount: number
  onChangePair: (
    id: string,
    field: 'english' | 'indonesian',
    value: string,
  ) => void
  onRemovePair: (id: string) => void
  onAddPair: () => void
  maxPairs: number
}

export default function WordPairsSection({
  pairs,
  completedPairsCount,
  onChangePair,
  onRemovePair,
  onAddPair,
  maxPairs,
}: Props) {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between md:justify-start md:gap-4">
        <h3 className="font-bold text-navy text-lg">Word Pairs</h3>

        <span className="text-xs font-bold bg-blue/10 text-blue px-3 py-1 rounded-full">
          {completedPairsCount} Pairs
        </span>
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {pairs.map((pair) => (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue rounded-l-full" />

              <div className="grid grid-cols-[1fr_auto] gap-3 items-start md:grid-cols-1 md:gap-0">
                <div className="space-y-3 md:flex md:gap-4">
                  {/* English */}
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">
                      English
                    </label>
                    <Input
                      value={pair.english}
                      maxLength={15}
                      onChange={(e) =>
                        onChangePair(pair.id, 'english', e.target.value)
                      }
                      className="h-10 border-slate-100 bg-slate-50 font-medium text-navy focus-visible:bg-white"
                      placeholder="Word"
                    />
                  </div>

                  {/* Indonesian */}
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">
                      Indonesia
                    </label>
                    <Input
                      value={pair.indonesian}
                      maxLength={20}
                      onChange={(e) =>
                        onChangePair(pair.id, 'indonesian', e.target.value)
                      }
                      className="h-10 border-slate-100 bg-slate-50 font-medium text-navy focus-visible:bg-white"
                      placeholder="Terjemahan"
                    />
                  </div>
                </div>

                {/* Delete */}
                <div className="flex justify-end">
                  <button
                    onClick={() => onRemovePair(pair.id)}
                    className="mt-6 w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 active:bg-red-100 md:w-fit md:px-10 md:gap-2 md:rounded-b-lg md:mt-2"
                  >
                    <Trash2 size={18} />
                    <span className="hidden md:block">delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Button */}
      <Button
        variant="outline"
        onClick={onAddPair}
        disabled={pairs.length >= maxPairs}
        className="w-full h-12 rounded-xl border-dashed border-2 border-slate-300 text-slate-400 hover:text-blue hover:border-blue hover:bg-blue/5 gap-2 font-bold uppercase tracking-widest text-xs"
      >
        <Plus size={16} /> Add Pair
      </Button>
    </section>
  )
}
