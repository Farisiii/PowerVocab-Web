'use client'

import { useState } from 'react'
import { GameHeader } from '@/components/games/common/game-header'
import { GameControls } from '@/components/games/common/game-controls'
import { FillBlankCard } from '@/components/games/fillintheblanks/card'
import BackgroundAmbience from '@/components/common/background-ambience'

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
    correctId: '1',
  },
]

export default function FillBlankPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<
    { questionId: string; selectedId: string | null }[]
  >([])

  const currentQuestion = MOCK_QUESTIONS[currentIndex]
  const isLastQuestion = currentIndex === MOCK_QUESTIONS.length - 1

  const handleNextAction = () => {
    const updatedAnswers = [
      ...answers,
      { questionId: currentQuestion.id, selectedId: selectedId },
    ]
    setAnswers(updatedAnswers)

    if (isLastQuestion) {
      handleFinish(updatedAnswers)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setSelectedId(null)
    }
  }

  const handleFinish = (finalAnswers: typeof answers) => {
    console.log('Game Selesai! Mengirim jawaban...', finalAnswers)
    const score = finalAnswers.filter((ans, index) => {
      return ans.selectedId === MOCK_QUESTIONS[index].correctId
    }).length

    alert(`Game Selesai! Skor Anda: ${score} dari ${MOCK_QUESTIONS.length}`)
  }

  return (
    <div className="h-dvh w-full bg-[#f8fafc] overflow-hidden flex flex-col items-center relative selection:bg-cyan/30">
      <BackgroundAmbience />

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-4 py-4 sm:py-8 relative z-10">
        {/* Header */}
        <div className="shrink-0 mb-4 md:mb-6">
          <GameHeader
            current={currentIndex + 1}
            total={MOCK_QUESTIONS.length}
            deckTitle="Architecture 101"
          />
        </div>

        {/* Game Area */}
        <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden py-2">
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
        <div className="shrink-0 mt-2 md:mt-4">
          <GameControls
            onAction={handleNextAction}
            disabled={!selectedId}
            label={isLastQuestion ? 'Selesai' : 'Next Question'}
          />
        </div>
      </div>
    </div>
  )
}
