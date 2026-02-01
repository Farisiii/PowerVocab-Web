'use client'

import { motion } from 'framer-motion'
import { PlayButton } from './play-button'
import { SpeedControls } from './speed-controls'

interface Props {
  isPlaying: boolean
  onTogglePlay: () => void
  playbackRate: number
  onPlaybackRateChange: (rate: number) => void
  isDesktop: boolean
}

export function AudioControls({
  isPlaying,
  onTogglePlay,
  playbackRate,
  onPlaybackRateChange,
  isDesktop,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:absolute md:top-0 md:right-0"
    >
      <PlayButton
        isPlaying={isPlaying}
        onClick={onTogglePlay}
        isDesktop={isDesktop}
      />

      <SpeedControls
        playbackRate={playbackRate}
        onChange={onPlaybackRateChange}
        isDesktop={isDesktop}
      />
    </motion.div>
  )
}
