'use client'

import { useState } from 'react'
import { MOCK_DECKS } from '@/lib/data'
import { GameHeader } from '@/components/games/common/game-header'
import { FlashcardCard } from '@/components/games/flashcard/card'
import { FlashcardControls } from '@/components/games/flashcard/controls'
import BackgroundAmbience from '@/components/common/background-ambience'

const MOCK_WORDS = [
  { id: '1', word: 'makan', translation: 'eat' },
  { id: '2', word: 'tidur', translation: 'sleep' },
  { id: '3', word: 'bekerja', translation: 'work' },
]

export default function FlashcardPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const currentDeck = MOCK_DECKS.find((d) => d.id === '3') || MOCK_DECKS[0]
  const currentWord = MOCK_WORDS[currentIndex]

  const handleNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_WORDS.length)
    }, 200)
  }

  return (
    <div className="h-dvh w-full bg-[#f8fafc] overflow-hidden flex flex-col items-center relative selection:bg-cyan/30">
      <BackgroundAmbience />

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-4 sm:px-5 md:px-6 xl:px-8 py-4 sm:py-5 md:py-6 xl:py-8 relative z-10">
        {/* Header */}
        <div className="shrink-0 mb-4 md:mb-5 lg:mb-6">
          <GameHeader
            current={currentIndex + 1}
            total={MOCK_WORDS.length}
            deckTitle={currentDeck.title}
          />
        </div>

        {/* Flashcard - takes remaining space */}
        <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden py-2 md:py-4">
          <FlashcardCard
            word={currentWord.word}
            translation={currentWord.translation}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />
        </div>

        {/* Controls */}
        <div className="shrink-0 mt-4 md:mt-5 lg:mt-6 mb-2">
          <FlashcardControls onNext={handleNext} />
        </div>
      </div>
    </div>
  )
}
