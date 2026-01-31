'use client'

import { useState } from 'react'
import { FlashcardHeader } from '@/components/games/common/flashcard-header'
import { ListenAndTypeCard } from '@/components/games/listeninggame/card'
import { ListenAndTypeControls } from '@/components/games/listeninggame/controls'

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

  const currentSentence = MOCK_SENTENCES[currentIndex]

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
  }

  const handleCheck = () => {
    const userNormalized = normalizeText(userInput)
    const correctNormalized = normalizeText(currentSentence.text)
    const isCorrect = userNormalized === correctNormalized

    console.log('Result:', isCorrect ? 'CORRECT' : 'INCORRECT')

    if (isCorrect) {
    }
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
            total={MOCK_SENTENCES.length}
            deckTitle="Listening Practice"
          />
        </div>

        {/* Game Area */}
        <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden py-2 md:py-4">
          <div className="w-full h-full max-w-5xl flex items-center justify-center">
            <ListenAndTypeCard
              correctText={currentSentence.text}
              userInput={userInput}
              onInputChange={setUserInput}
              playbackRate={playbackRate}
              onPlaybackRateChange={setPlaybackRate}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="shrink-0 mt-2 md:mt-3">
          <ListenAndTypeControls
            onCheck={handleCheck}
            disabled={!userInput.trim()}
          />
        </div>
      </div>
    </div>
  )
}
