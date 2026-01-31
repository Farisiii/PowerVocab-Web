'use client'

import { useState } from 'react'
import { FlashcardHeader } from '@/components/games/common/flashcard-header'
import { MultipleChoiceCard } from '@/components/games/multiplechoice/card'
import { MultipleChoiceControls } from '@/components/games/multiplechoice/controls'

// Mock Data
const MOCK_QUESTIONS = [
  {
    id: '1',
    description:
      'Sesuatu yang sangat baru dan kreatif, membawa ide atau metode yang belum pernah ada sebelumnya dan banyak yang perlu dilakukan dengan berbagai kecepatan',
    options: [
      { id: '1', word: 'Innovative' },
      { id: '2', word: 'Traditional' },
      { id: '3', word: 'Obsolete' },
      { id: '4', word: 'Mundane' },
    ],
    correctId: '1',
  },
  {
    id: '2',
    description:
      'Sangat berlebihan dan mencolok, dirancang untuk menarik perhatian dan menunjukkan kekayaan atau kemewahan.',
    options: [
      { id: '1', word: 'Modest' },
      { id: '2', word: 'Ostentatious' },
      { id: '3', word: 'Subtle' },
      { id: '4', word: 'Reserved' },
    ],
    correctId: '2',
  },
  {
    id: '3',
    description:
      'Tidak dapat diprediksi dan tidak konsisten dalam perilaku atau pola, sering berubah tanpa alasan yang jelas.',
    options: [
      { id: '1', word: 'Steady' },
      { id: '2', word: 'Reliable' },
      { id: '3', word: 'Erratic' },
      { id: '4', word: 'Consistent' },
    ],
    correctId: '3',
  },
]

export default function MatchDefinitionPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const currentQuestion = MOCK_QUESTIONS[currentIndex]

  const handleCheck = () => {
    console.log('Checking answer:', selectedId)
    console.log('Correct answer:', currentQuestion.correctId)
    console.log('Is correct:', selectedId === currentQuestion.correctId)
    // TODO: Implement answer checking logic
  }

  return (
    <div className="h-dvh w-full bg-linear-to-br from-white via-[#eaf4fb] to-cyan overflow-hidden flex flex-col items-center">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-sky/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-4 sm:px-5 md:px-6 xl:px-8 py-4 sm:py-5 md:py-6 xl:py-8">
        {/* Header */}
        <div className="shrink-0 mb-4 md:mb-5 lg:mb-6">
          <FlashcardHeader
            current={currentIndex + 1}
            total={MOCK_QUESTIONS.length}
            deckTitle="Vocabulary Mastery"
          />
        </div>

        {/* Game Area - takes remaining space */}
        <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden py-2 md:py-4">
          <div className="w-full h-full max-w-5xl flex items-center justify-center">
            <MultipleChoiceCard
              description={currentQuestion.description}
              options={currentQuestion.options}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="shrink-0 mt-2 md:mt-3">
          <MultipleChoiceControls
            onCheck={handleCheck}
            disabled={!selectedId}
          />
        </div>
      </div>
    </div>
  )
}
