'use client'

import { TypeInputCard } from './type-input-card'

interface ListenAndTypeCardProps {
  correctText: string
  userInput: string
  onInputChange: (value: string) => void
  playbackRate: number
  onPlaybackRateChange: (rate: number) => void
}

export function ListenAndTypeCard({
  correctText,
  userInput,
  onInputChange,
  playbackRate,
  onPlaybackRateChange,
}: ListenAndTypeCardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Single Unified Card with Cutout Design */}
      <TypeInputCard
        userInput={userInput}
        onInputChange={onInputChange}
        correctText={correctText}
        playbackRate={playbackRate}
        onPlaybackRateChange={onPlaybackRateChange}
      />
    </div>
  )
}
