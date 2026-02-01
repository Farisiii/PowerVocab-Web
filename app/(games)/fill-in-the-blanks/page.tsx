'use client'

import { useState } from 'react'
import { GameHeader } from '@/components/games/common/game-header'
import { FillBlankCard } from '@/components/games/fillintheblanks/card'
import { FillBlankControls } from '@/components/games/fillintheblanks/controls'
import BackgroundAmbience from '@/components/common/background-ambience'

// Mock Data
const MOCK_QUESTIONS = [
  {
    id: '1',
    sentence:
      "The architect's vision was so {blank} that it redefined the city's skyline forever.",
    options: [
      { id: '1', label: 'Innovative' },
      { id: '2', label: 'Minimalist' },
      { id: '3', label: 'Ostentatious' },
      { id: '4', label: 'Erratic' },
    ],
  },
]

export default function FillBlankPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const currentQuestion = MOCK_QUESTIONS[currentIndex]

  const handleCheck = () => {
    console.log('Checking answer:', selectedId)
  }

  return (
    <div className="h-dvh w-full bg-[#f8fafc] overflow-hidden flex flex-col items-center relative selection:bg-cyan/30">
      <BackgroundAmbience />

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-4 sm:px-5 md:px-6 xl:px-8 py-4 sm:py-5 md:py-6 xl:py-8 relative z-10">
        {/* Header */}
        <div className="shrink-0 mb-4 md:mb-5 lg:mb-6">
          <GameHeader
            current={currentIndex + 1}
            total={MOCK_QUESTIONS.length}
            deckTitle="Architecture 101"
          />
        </div>

        {/* Game Area */}
        <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden py-2 md:py-4">
          <div className="w-full h-full max-w-5xl flex items-center justify-center">
            <FillBlankCard
              sentence={currentQuestion.sentence}
              options={currentQuestion.options}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="shrink-0 mt-2 md:mt-3">
          <FillBlankControls onCheck={handleCheck} disabled={!selectedId} />
        </div>
      </div>
    </div>
  )
}
