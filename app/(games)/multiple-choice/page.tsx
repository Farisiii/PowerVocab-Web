'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GameHeader } from '@/components/games/common/game-header'
import { FinishModal } from '@/components/games/common/game-finish-modal'
import { GameControls } from '@/components/games/common/game-controls'
import { MultipleChoiceCard } from '@/components/games/multiplechoice/card'
import { ExitConfirmModal } from '@/components/games/common/game-exitConfirm-modal'

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
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)

  const currentQuestion = MOCK_QUESTIONS[currentIndex]
  const isLastQuestion = currentIndex === MOCK_QUESTIONS.length - 1

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

  const finishGame = (
    finalAnswers: { questionId: string; selectedId: string }[],
  ) => {
    const score = finalAnswers.filter((ans, index) => {
      return ans.selectedId === MOCK_QUESTIONS[index].correctId
    }).length

    setFinalScore(score)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    router.push('/games')
  }

  return (
    <div className="h-dvh w-full bg-linear-to-br from-cyan via-[#eaf4fb] to-white overflow-hidden flex flex-col items-center relative selection:bg-cyan/30">
      <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-4 py-4 sm:py-8 relative z-10">
        {/* Header */}
        <div className="shrink-0 mb-4 md:mb-6">
          <GameHeader
            current={currentIndex + 1}
            total={MOCK_QUESTIONS.length}
            deckTitle="Vocabulary Mastery"
            onBackClick={handleBackClick}
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
            disabled={!selectedId}
            label={isLastQuestion ? 'Selesai' : 'Next Question'}
          />
        </div>
      </div>

      {/* Exit Confirm Modal */}
      <ExitConfirmModal
        isOpen={isExitModalOpen}
        onClose={handleExitCancel}
        onConfirm={handleExitConfirm}
        title="Fill Blank Game"
        description="Progress kamu di sesi ini bakal hilang kalau keluar sekarang"
        imageSrc="/multiplechoice.webp"
        confirmText="Lanjut Main"
        cancelText="Keluar Aja"
      />

      {/* Result Modal */}
      <FinishModal
        showSkeleton={true}
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
        title="Hasil Akhir"
        restartText="Main Lagi"
        exitText="Keluar"
      />
    </div>
  )
}
