'use client'

import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { WordPairRowProps } from '@/types/library-type'

export function WordPairRow({ pair, onChange, onRemove }: WordPairRowProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 },
      }}
      transition={{ duration: 0.2 }}
      className="mb-3 grid grid-cols-[1fr_1fr_auto] gap-4 items-center group"
    >
      <input
        value={pair.english}
        onChange={(e) => onChange(pair.id, 'english', e.target.value)}
        maxLength={15}
        placeholder="Word"
        className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all font-medium text-navy placeholder:text-slate-300"
      />

      <input
        value={pair.indonesian}
        onChange={(e) => onChange(pair.id, 'indonesian', e.target.value)}
        maxLength={20}
        placeholder="Terjemahan"
        className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all font-medium text-navy placeholder:text-slate-300"
      />

      <button
        onClick={() => onRemove(pair.id)}
        className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-red-50 text-red-500 transition-colors opacity-100"
        tabIndex={-1}
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  )
}
