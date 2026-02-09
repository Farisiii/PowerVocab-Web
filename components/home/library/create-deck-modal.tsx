'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Trash2, Languages, Type } from 'lucide-react'
import { z } from 'zod'
import { WordPair, mockAiResponse } from '@/lib/data'

interface CreateDeckModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (deck: any) => void
}

const deckNameSchema = z.object({
  deckName: z.string().min(1, 'Deck name is required'),
})

const generateEmptyPairs = (): WordPair[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `pair-${i + 1}`,
    english: '',
    indonesian: '',
  }))
}

export function CreateDeckModal({
  isOpen,
  onClose,
  onCreate,
}: CreateDeckModalProps) {
  const [deckName, setDeckName] = useState('')
  const [description, setDescription] = useState('')
  const [pairs, setPairs] = useState<WordPair[]>(generateEmptyPairs())
  const [isGenerating, setIsGenerating] = useState(false)

  const [deckNameError, setDeckNameError] = useState<string>('')

  const listRef = useRef<HTMLDivElement>(null)

  const showDeckNameError = deckNameError !== ''

  const validateDeckName = (value: string) => {
    const result = deckNameSchema.safeParse({ deckName: value })
    if (!result.success) {
      setDeckNameError(result.error.issues[0].message)
      return false
    }
    setDeckNameError('')
    return true
  }

  const handleDeckNameChange = (value: string) => {
    setDeckName(value)
    validateDeckName(value)
  }

  const handleRemovePair = (id: string) => {
    setPairs(
      pairs.map((p) =>
        p.id === id ? { ...p, english: '', indonesian: '' } : p,
      ),
    )
  }

  const handleChange = (
    id: string,
    field: 'english' | 'indonesian',
    value: string,
  ) => {
    const maxLength = field === 'english' ? 15 : 20
    if (value.length <= maxLength) {
      setPairs(pairs.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
    }
  }

  const handleAiGenerate = async () => {
    if (!validateDeckName(deckName)) return

    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const result = mockAiResponse

    const newPairs = generateEmptyPairs()

    result.data.forEach((aiPair, index) => {
      newPairs[index] = aiPair
    })

    setPairs(newPairs)
    setIsGenerating(false)
  }

  const handleSubmit = () => {
    if (!validateDeckName(deckName)) return

    const filledPairs = pairs.filter(
      (p) => p.english.trim() && p.indonesian.trim(),
    )

    const newDeck = {
      id: crypto.randomUUID(),
      title: deckName,
      description,
      totalWords: filledPairs.length,
      progress: 0,
    }

    onCreate(newDeck)
  }

  const filledPairsCount = pairs.filter(
    (p) => p.english.trim() && p.indonesian.trim(),
  ).length

  const isFormValid =
    !deckNameError && deckName.trim() !== '' && filledPairsCount > 0

  const handleClearAll = () => {
    setPairs(generateEmptyPairs())
  }

  useEffect(() => {
    if (isOpen) {
      setDeckName('')
      setDescription('')
      setPairs(generateEmptyPairs())
      setDeckNameError('Deck name is required')
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-40 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy/40 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl h-[85vh] bg-white rounded-[2.5rem] shadow-glass overflow-hidden flex flex-row z-10 border border-white/50"
          >
            {/* Sidebar Section */}
            <div className="w-1/3 bg-linear-to-b from-[#f8fafc] to-[#eaf4fb] border-r border-blue/10 relative overflow-y-auto shrink-0">
              <div className="p-10 space-y-8">
                <div>
                  <h2 className="text-3xl font-black text-navy tracking-tighter mb-1">
                    NEW DECK
                  </h2>
                  <p className="text-navy/60 text-sm font-medium">
                    Create a new vocabulary set manually or let AI help you.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Deck Name Input */}
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
                        id="deck-name-input"
                        value={deckName}
                        onChange={(e) => handleDeckNameChange(e.target.value)}
                        placeholder="e.g., Advanced Adjectives"
                        className={`w-full h-14 pl-12 pr-4 rounded-2xl bg-white border-2 focus:ring-0 text-base text-navy font-bold placeholder:font-medium placeholder:text-navy/20 transition-all shadow-sm ${
                          showDeckNameError
                            ? 'border-red-300 focus:border-red-400'
                            : 'border-transparent focus:border-blue/20'
                        }`}
                      />
                      {/* Error Message */}
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

                  {/* Description Input */}
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
                    onClick={handleAiGenerate}
                    disabled={isGenerating || !deckName.trim()}
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

            {/* Word Pairs Section (Right Side) */}
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
                    onClick={handleClearAll}
                    className="text-xs text-red-400 hover:text-red-600 font-bold uppercase tracking-wider transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Column Headers */}
              <div className="grid grid-cols-[1fr_1fr_40px] gap-4 mb-2 px-2 shrink-0">
                <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">
                  English <span className="lowercase">(15 letters)</span>
                </span>
                <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">
                  Indonesia <span className="lowercase">(20 letters)</span>
                </span>
                <span className="w-10"></span>
              </div>

              {/* LIST CONTAINER */}
              <div
                ref={listRef}
                className="flex-1 overflow-y-auto pr-2 -mr-2 scroll-smooth"
              >
                <LayoutGroup>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {pairs.map((pair) => (
                      <motion.div
                        key={pair.id}
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
                          onChange={(e) =>
                            handleChange(pair.id, 'english', e.target.value)
                          }
                          maxLength={15}
                          placeholder="Word"
                          className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all font-medium text-navy placeholder:text-slate-300"
                        />
                        <input
                          value={pair.indonesian}
                          onChange={(e) =>
                            handleChange(pair.id, 'indonesian', e.target.value)
                          }
                          maxLength={20}
                          placeholder="Terjemahan"
                          className="h-12 px-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all font-medium text-navy placeholder:text-slate-300"
                        />
                        <button
                          onClick={() => handleRemovePair(pair.id)}
                          className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-red-50 text-red-500 transition-colors opacity-100"
                          tabIndex={-1}
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </LayoutGroup>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex justify-end gap-4 shrink-0">
                <button
                  onClick={onClose}
                  className="px-8 h-14 rounded-2xl font-bold text-navy/60 hover:text-navy hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="px-10 h-14 rounded-2xl bg-linear-to-r from-blue to-navy text-white font-black tracking-widest text-sm uppercase shadow-lg shadow-navy/20 hover:bg-blue hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-navy"
                >
                  Create Deck
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
