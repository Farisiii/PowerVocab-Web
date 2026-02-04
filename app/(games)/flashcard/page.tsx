'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MOCK_DECKS } from '@/lib/data'
import { GameHeader } from '@/components/games/common/game-header'
import { FlashcardCard } from '@/components/games/flashcard/card'
import { FlashcardControls } from '@/components/games/flashcard/controls'
import { ExitConfirmModal } from '@/components/games/common/game-exitConfirm-modal'
import { FlashcardFinishModal } from '@/components/games/flashcard/finish-modal'

const MOCK_WORDS = [
  { id: '1', word: 'makan', translation: 'eat' },
  { id: '2', word: 'tidur', translation: 'sleep' },
  { id: '3', word: 'bekerja', translation: 'work' },
]

export default function FlashcardPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)

  const [cardStatus, setCardStatus] = useState<Record<string, boolean>>({})

  const currentDeck = MOCK_DECKS.find((d) => d.id === '3') || MOCK_DECKS[0]
  const currentWord = MOCK_WORDS[currentIndex]
  const isLastCard = currentIndex === MOCK_WORDS.length - 1

  const memorizedCount = Object.values(cardStatus).filter(Boolean).length
  const notMemorizedCount = Object.values(cardStatus).filter((s) => !s).length

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      window.history.pushState(null, '', window.location.pathname)
      setIsExitModalOpen(true)
    }

    window.history.pushState(null, '', window.location.pathname)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const handleBackClick = () => {
    setIsExitModalOpen(true)
  }

  const handleExitConfirm = () => {
    setIsExitModalOpen(false)
    router.push('/games')
  }

  const handleExitCancel = () => {
    setIsExitModalOpen(false)
  }

  const handleNext = (mastered: boolean) => {
    setCardStatus((prev) => ({
      ...prev,
      [currentWord.id]: mastered,
    }))

    setIsFlipped(false)

    setTimeout(() => {
      if (isLastCard) {
        setIsFinishModalOpen(true)
      } else {
        setCurrentIndex((prev) => prev + 1)
      }
    }, 200)
  }

  const handleRestart = () => {
    setIsFinishModalOpen(false)
    setCurrentIndex(0)
    setIsFlipped(false)
    setCardStatus({})
  }

  const handleExit = () => {
    setIsFinishModalOpen(false)
    router.push('/games')
  }

  return (
    <div className="h-dvh w-full bg-linear-to-br from-cyan via-[#eaf4fb] to-white overflow-hidden flex flex-col items-center relative selection:bg-cyan/30">
      <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-4 sm:px-5 md:px-6 xl:px-8 py-4 sm:py-5 md:py-6 xl:py-8 relative z-10">
        {/* Header */}
        <div className="shrink-0 mb-4 md:mb-5 lg:mb-6">
          <GameHeader
            current={currentIndex + 1}
            total={MOCK_WORDS.length}
            deckTitle={currentDeck.title}
            onBackClick={handleBackClick}
          />
        </div>

        {/* Flashcard */}
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

      {/* Exit Confirm Modal */}
      <ExitConfirmModal
        isOpen={isExitModalOpen}
        onClose={handleExitCancel}
        onConfirm={handleExitConfirm}
        title="Flashcard Session"
        description="Progress kamu di sesi flashcard ini bakal hilang kalau keluar sekarang"
        imageSrc="/flashcard.webp"
        confirmText="Lanjut Belajar"
        cancelText="Keluar Aja"
      />

      {/* Finish Modal */}
      <FlashcardFinishModal
        isOpen={isFinishModalOpen}
        onClose={handleExit}
        memorizedCount={memorizedCount}
        notMemorizedCount={notMemorizedCount}
        onRestart={handleRestart}
        onExit={handleExit}
        showSkeleton={true}
      />
    </div>
  )
}
