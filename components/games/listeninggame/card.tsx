'use client'

import { TypeInputCard } from './type-input-card'

interface ListenAndTypeCardProps {
  correctText: string
  userInput: string
  onInputChange: (value: string) => void
  playbackRate: number
  onPlaybackRateChange: (rate: number) => void
}

export function ListenAndTypeCard(props: ListenAndTypeCardProps) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <TypeInputCard {...props} />
    </div>
  )
}
