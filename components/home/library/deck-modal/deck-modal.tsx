'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Trash2, Languages, Type, Loader2 } from 'lucide-react'
import { z } from 'zod'
import { mockAiResponse } from '@/lib/data'
import { WordPair } from '@/types/library-type'
import { DeckSidebar } from './deck-sidebar'
import { WordPairsSection } from './word-pair-section'

interface DeckModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (deck: any) => void
  editDeckId?: string | null
}

const deckNameSchema = z.object({
  deckName: z.string().min(1, 'Deck name is required'),
})

const generateEmptyPairs = (): WordPair[] =>
  Array.from({ length: 20 }, (_, i) => ({
    id: `pair-${i + 1}`,
    english: '',
    indonesian: '',
  }))

const fetchDeckDetail = async (id: string) => {
  await new Promise((r) => setTimeout(r, 1000))
  return {
    id,
    title: 'deck edit test',
    description: 'uji coba buat edit aja ini mah, mari kita cobaaa',
    pairs: [
      { id: 'srv-1', english: 'Ambiguous', indonesian: 'Ambigu' },
      { id: 'srv-2', english: 'Benevolent', indonesian: 'Baik Hati' },
      { id: 'srv-3', english: 'Candid', indonesian: 'Jujur' },
    ],
  }
}

export function DeckModal({
  isOpen,
  onClose,
  onSave,
  editDeckId,
}: DeckModalProps) {
  const [deckName, setDeckName] = useState('')
  const [description, setDescription] = useState('')
  const [pairs, setPairs] = useState<WordPair[]>(generateEmptyPairs())
  const [deckNameError, setDeckNameError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(false)

  const listRef = useRef<HTMLDivElement | null>(null)
  const isEditMode = !!editDeckId

  const validateDeckName = (value: string) => {
    const result = deckNameSchema.safeParse({ deckName: value })
    if (!result.success) {
      setDeckNameError(result.error.issues[0].message)
      return false
    }
    setDeckNameError('')
    return true
  }

  const handleChangePair = (
    id: string,
    field: 'english' | 'indonesian',
    value: string,
  ) => {
    const maxLength = field === 'english' ? 15 : 20
    if (value.length > maxLength) return

    setPairs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    )
  }

  const handleRemovePair = (id: string) => {
    setPairs((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, english: '', indonesian: '' } : p,
      ),
    )
  }

  const handleClearAll = () => setPairs(generateEmptyPairs())

  const handleAiGenerate = async () => {
    if (!validateDeckName(deckName)) return
    setIsGenerating(true)

    await new Promise((r) => setTimeout(r, 1500))
    const newPairs = generateEmptyPairs()

    mockAiResponse.data.forEach((aiPair, index) => {
      newPairs[index] = {
        id: aiPair.id,
        english: aiPair.english.slice(0, 15),
        indonesian: aiPair.indonesian.slice(0, 20),
      }
    })

    setPairs(newPairs)
    setIsGenerating(false)
  }

  const handleSubmit = () => {
    if (!validateDeckName(deckName)) return

    const filled = pairs.filter((p) => p.english.trim() && p.indonesian.trim())

    onSave({
      id: editDeckId || crypto.randomUUID(),
      title: deckName,
      description,
      pairs,
      totalWords: filled.length,
      progress: 0,
    })

    onClose()
  }

  const filledPairsCount = useMemo(
    () => pairs.filter((p) => p.english.trim() && p.indonesian.trim()).length,
    [pairs],
  )

  const isFormValid =
    !deckNameError && deckName.trim() !== '' && filledPairsCount > 0

  useEffect(() => {
    if (!isOpen) return

    const init = async () => {
      setDeckNameError('')

      if (!editDeckId) {
        setDeckName('')
        setDescription('')
        setPairs(generateEmptyPairs())
        setDeckNameError('Deck name is required')
        return
      }

      setIsLoadingData(true)
      try {
        const data = await fetchDeckDetail(editDeckId)
        setDeckName(data.title)
        setDescription(data.description)

        const loaded = generateEmptyPairs()
        data.pairs?.slice(0, 20).forEach((p: any, idx: number) => {
          loaded[idx] = {
            id: p.id,
            english: p.english || '',
            indonesian: p.indonesian || '',
          }
        })

        setPairs(loaded)
      } finally {
        setIsLoadingData(false)
      }
    }

    init()
  }, [isOpen, editDeckId])

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
            {isLoadingData && <LoadingOverlay />}

            <DeckSidebar
              isEditMode={isEditMode}
              deckName={deckName}
              setDeckName={setDeckName}
              description={description}
              setDescription={setDescription}
              deckNameError={deckNameError}
              validateDeckName={validateDeckName}
              isGenerating={isGenerating}
              isLoadingData={isLoadingData}
              onAiGenerate={handleAiGenerate}
            />

            <WordPairsSection
              pairs={pairs}
              filledPairsCount={filledPairsCount}
              onChange={handleChangePair}
              onRemove={handleRemovePair}
              onClearAll={handleClearAll}
              onCancel={onClose}
              onSubmit={handleSubmit}
              isFormValid={isFormValid}
              isEditMode={isEditMode}
              isLoadingData={isLoadingData}
              listRef={listRef}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-blue" size={48} />
      <p className="text-navy/60 font-bold animate-pulse">
        pair words deck details...
      </p>
    </div>
  )
}
