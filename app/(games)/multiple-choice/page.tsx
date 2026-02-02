'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GameHeader } from '@/components/games/common/game-header'
import { GameModal } from '@/components/games/common/game-modal'
import { GameControls } from '@/components/games/common/game-controls'
import { MultipleChoiceCard } from '@/components/games/multiplechoice/card'
import BackgroundAmbience from '@/components/common/background-ambience'

const MOCK_QUESTIONS = [
  {
    id: '1',
    description:
      'Sesuatu yang sangat baru dan kreatif, membawa ide atau metode yang belum pernah ada sebelumnya...',
    options: [
      { id: '1', text: 'Innovative' },
      { id: '2', text: 'Traditional' },
      { id: '3', text: 'Obsolete' },
      { id: '4', text: 'Mundane' },
    ],
    correctId: '1',
  },
  {
    id: '2',
    description:
      'Sangat berlebihan dan mencolok, dirancang untuk menarik perhatian...',
    options: [
      { id: '1', text: 'Modest' },
      { id: '2', text: 'Ostentatious' },
      { id: '3', text: 'Subtle' },
      { id: '4', text: 'Reserved' },
    ],
    correctId: '2',
  },
  {
    id: '3',
    description:
      'Tidak dapat diprediksi dan tidak konsisten dalam perilaku atau pola...',
    options: [
      { id: '1', text: 'Steady' },
      { id: '2', text: 'Reliable' },
      { id: '3', text: 'Erratic' },
      { id: '4', text: 'Consistent' },
    ],
    correctId: '3',
  },
]

export default function MatchDefinitionPage() {
  const router = useRouter()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<
    { questionId: string; selectedId: string }[]
  >([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const currentQuestion = MOCK_QUESTIONS[currentIndex]
  const isLastQuestion = currentIndex === MOCK_QUESTIONS.length - 1

  const handleNextAction = () => {
    if (!selectedId) return

    const updatedAnswers = [
      ...answers,
      { questionId: currentQuestion.id, selectedId },
    ]

    setAnswers(updatedAnswers)

    if (isLastQuestion) {
      finishGame(updatedAnswers)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setSelectedId(null)
    }
  }

  const finishGame = async (
    finalAnswers: { questionId: string; selectedId: string }[],
  ) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const score = finalAnswers.filter((ans, index) => {
        return ans.selectedId === MOCK_QUESTIONS[index].correctId
      }).length

      setFinalScore(score)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Gagal menghitung skor:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    router.push('/games')
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
            deckTitle="Vocabulary Mastery"
          />
        </div>

        {/* Game Area */}
        <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden py-2">
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
        <div className="shrink-0 mt-2 md:mt-4">
          <GameControls
            onAction={handleNextAction}
            disabled={!selectedId || isLoading}
            label={
              isLoading
                ? 'Sabar ya...'
                : isLastQuestion
                  ? 'Selesai'
                  : 'Next Question'
            }
          />
        </div>
      </div>

      {/* Result Modal */}
      <GameModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        score={finalScore}
        totalQuestions={MOCK_QUESTIONS.length}
        onRestart={() => {
          setCurrentIndex(0)
          setSelectedId(null)
          setAnswers([])
          setIsModalOpen(false)
        }}
        onExit={handleModalClose}
      />
    </div>
  )
}
