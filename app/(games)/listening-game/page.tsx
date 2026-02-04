'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GameHeader } from '@/components/games/common/game-header'
import { ListenAndTypeCard } from '@/components/games/listeninggame/card'
import { GameControls } from '@/components/games/common/game-controls'
import { FinishModal } from '@/components/games/common/game-finish-modal'
import { ExitConfirmModal } from '@/components/games/common/game-exitConfirm-modal'

const MOCK_SENTENCES = [
  { id: '1', text: 'The quick brown fox jumps over the lazy dog' },
  { id: '2', text: 'Innovation drives progress in modern technology' },
  { id: '3', text: 'Practice makes perfect in language learning' },
  { id: '4', text: 'Communication is the key to understanding' },
  { id: '5', text: 'Architecture reflects the culture of civilization' },
]

export default function ListenAndTypePage() {
  const router = useRouter()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [userAnswers, setUserAnswers] = useState<
    { id: string; input: string }[]
  >([])
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const currentSentence = MOCK_SENTENCES[currentIndex]
  const isLastQuestion = currentIndex === MOCK_SENTENCES.length - 1

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
    const updatedAnswers = [
      ...userAnswers,
      { id: currentSentence.id, input: userInput },
    ]
    setUserAnswers(updatedAnswers)

    if (isLastQuestion) {
      finishGame(updatedAnswers)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setUserInput('')
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    router.push('/games')
  }

  const finishGame = (finalAnswers: { id: string; input: string }[]) => {
    const correctCount = finalAnswers.filter((ans, index) => {
      const original = MOCK_SENTENCES[index].text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, '')

      const input = ans.input
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, '')

      return input === original
    }).length

    setFinalScore(correctCount)
    setIsModalOpen(true)
  }

  return (
    <div className="h-dvh w-full bg-linear-to-br from-cyan via-[#eaf4fb] to-white overflow-hidden flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-4 py-8 relative z-10">
        <div className="shrink-0 mb-6">
          <GameHeader
            current={currentIndex + 1}
            total={MOCK_SENTENCES.length}
            deckTitle="Listening Practice"
            onBackClick={handleBackClick}
          />
        </div>

        <div className="flex-1 flex items-center justify-center min-h-0 py-2">
          <ListenAndTypeCard
            correctText={currentSentence.text}
            userInput={userInput}
            onInputChange={setUserInput}
            playbackRate={playbackRate}
            onPlaybackRateChange={setPlaybackRate}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>

        <div className="shrink-0 mt-4 z-100">
          <GameControls
            onAction={handleNextAction}
            disabled={!userInput.trim()}
            label={isLastQuestion ? 'Selesai' : 'Next Question'}
          />
        </div>
      </div>

      <ExitConfirmModal
        isOpen={isExitModalOpen}
        onClose={handleExitCancel}
        onConfirm={handleExitConfirm}
        title="Listening Game"
        description="Progress kamu di sesi ini bakal hilang kalau keluar sekarang"
        imageSrc="/listening.webp"
        confirmText="Lanjut Main"
        cancelText="Keluar Aja"
      />

      <FinishModal
        showSkeleton={true}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        score={finalScore}
        totalQuestions={MOCK_SENTENCES.length}
        onRestart={() => {
          setCurrentIndex(0)
          setUserInput('')
          setUserAnswers([])
          setIsModalOpen(false)
        }}
        onExit={handleModalClose}
      />
    </div>
  )
}
