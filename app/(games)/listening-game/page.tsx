'use client'

import { useState } from 'react'
import { GameHeader } from '@/components/games/common/game-header'
import { ListenAndTypeCard } from '@/components/games/listeninggame/card'
import { GameControls } from '@/components/games/common/game-controls'
import BackgroundAmbience from '@/components/common/background-ambience'

const MOCK_SENTENCES = [
  { id: '1', text: 'The quick brown fox jumps over the lazy dog' },
  { id: '2', text: 'Innovation drives progress in modern technology' },
  { id: '3', text: 'Practice makes perfect in language learning' },
  { id: '4', text: 'Communication is the key to understanding' },
  { id: '5', text: 'Architecture reflects the culture of civilization' },
]

export default function ListenAndTypePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [userAnswers, setUserAnswers] = useState<
    { id: string; input: string }[]
  >([])

  const currentSentence = MOCK_SENTENCES[currentIndex]
  const isLastQuestion = currentIndex === MOCK_SENTENCES.length - 1

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

  const finishGame = (finalAnswers: { id: string; input: string }[]) => {
    console.log('Game Finished! Data Jawaban:', finalAnswers)
    const correctCount = finalAnswers.filter((ans, index) => {
      const original = MOCK_SENTENCES[index].text.toLowerCase().trim()
      return ans.input.toLowerCase().trim() === original
    }).length

    alert(
      `Selesai! Anda menjawab ${correctCount} dari ${MOCK_SENTENCES.length} soal dengan benar.`,
    )
  }

  return (
    <div className="h-dvh w-full bg-linear-to-br from-white via-[#eaf4fb] to-cyan overflow-hidden flex flex-col items-center">
      <BackgroundAmbience />

      {/* Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-4 py-8">
        <div className="shrink-0 mb-6">
          <GameHeader
            current={currentIndex + 1}
            total={MOCK_SENTENCES.length}
            deckTitle="Listening Practice"
          />
        </div>

        <div className="flex-1 flex items-center justify-center min-h-0 py-2">
          <ListenAndTypeCard
            correctText={currentSentence.text}
            userInput={userInput}
            onInputChange={setUserInput}
            playbackRate={playbackRate}
            onPlaybackRateChange={setPlaybackRate}
          />
        </div>

        <div className="shrink-0 mt-4">
          <GameControls
            onAction={handleNextAction}
            disabled={!userInput.trim()}
            label={isLastQuestion ? 'Selesai' : 'Next Question'}
          />
        </div>
      </div>
    </div>
  )
}
