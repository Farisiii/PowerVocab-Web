'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { z } from 'zod'
import { WordPair } from '@/types/library-type'
import { Button } from '@/components/ui/button'
import { mockAiResponse } from '@/lib/data'
import DeckDetailsSection from '@/components/home/library/deck-page/DeckDetailsSection'
import WordPairsSection from '@/components/home/library/deck-page/WordPairsSection'
import StickyFooter from '@/components/home/library/deck-page/StickyFooter'

const MAX_PAIRS = 20

const deckNameSchema = z.object({
  deckName: z.string().min(1, 'Deck name is required'),
})

const generateEmptyPairs = (): WordPair[] =>
  Array.from({ length: 5 }, (_, i) => ({
    id: `pair-${i + 1}`,
    english: '',
    indonesian: '',
  }))

export default function DeckPage() {
  const router = useRouter()

  const [deckName, setDeckName] = useState('')
  const [description, setDescription] = useState('')
  const [pairs, setPairs] = useState<WordPair[]>(generateEmptyPairs())
  const [deckNameError, setDeckNameError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

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
    setPairs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    )
  }

  const handleRemovePair = (id: string) => {
    setPairs((prev) => prev.filter((p) => p.id !== id))
  }

  const handleAddPair = () => {
    setPairs((prev) => {
      if (prev.length >= MAX_PAIRS) return prev
      return [...prev, { id: crypto.randomUUID(), english: '', indonesian: '' }]
    })
  }

  const handleAiGenerate = async () => {
    if (!validateDeckName(deckName)) return
    setIsGenerating(true)

    await new Promise((r) => setTimeout(r, 1500))

    const newPairs = mockAiResponse.data.slice(0, MAX_PAIRS).map((p) => ({
      ...p,
      id: crypto.randomUUID(),
    }))

    setPairs(newPairs)
    setIsGenerating(false)
  }

  const handleSave = () => {
    if (!validateDeckName(deckName)) return
    router.push('/library')
  }

  const completedPairsCount = pairs.filter(
    (p) => p.english.trim() !== '' && p.indonesian.trim() !== '',
  ).length

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#eaf4fb] to-cyan relative pb-32">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-4 h-16 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-xl active:scale-90 text-navy"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </Button>

        <h1 className="text-lg font-black text-navy uppercase tracking-widest">
          New Deck
        </h1>

        <div className="w-10" />
      </header>

      <div className="px-5 py-6 space-y-8">
        <DeckDetailsSection
          deckName={deckName}
          description={description}
          deckNameError={deckNameError}
          isGenerating={isGenerating}
          onDeckNameChange={(val) => {
            setDeckName(val)
            validateDeckName(val)
          }}
          onDeckNameBlur={() => validateDeckName(deckName)}
          onDescriptionChange={setDescription}
          onAiGenerate={handleAiGenerate}
        />

        <div className="w-full h-px bg-slate-200" />

        <WordPairsSection
          pairs={pairs}
          completedPairsCount={completedPairsCount}
          onChangePair={handleChangePair}
          onRemovePair={handleRemovePair}
          onAddPair={handleAddPair}
          maxPairs={MAX_PAIRS}
        />
      </div>

      <StickyFooter disabled={!deckName.trim()} onSave={handleSave} />
    </div>
  )
}
