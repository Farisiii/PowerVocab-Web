'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSpeech } from '../../../hooks/use-speech'
import { CardHeader } from './card-header'
import { AudioControls } from './audio-controls'
import { InputSection } from './input-section'
import { FooterStats } from './footer-stats'

interface TypeInputCardProps {
  userInput: string
  onInputChange: (value: string) => void
  correctText: string
  playbackRate: number
  onPlaybackRateChange: (rate: number) => void
}

export function TypeInputCard({
  userInput,
  onInputChange,
  correctText,
  playbackRate,
  onPlaybackRateChange,
}: TypeInputCardProps) {
  const { isPlaying, togglePlay } = useSpeech(correctText, playbackRate)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () =>
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl px-4 sm:px-6"
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className={cn(
            'relative overflow-hidden',
            'rounded-4xl md:rounded-[2.5rem] lg:rounded-[3rem]',
            'p-5 sm:p-8 md:p-10 lg:p-14',
            'border-4 border-white/50',
          )}
        >
          <div className="absolute inset-0 bg-linear-to-br from-white via-sky/5 to-cyan/10" />
          <div className="absolute inset-0 bg-linear-to-br from-transparent via-blue/5 to-sky/10" />

          <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(28,77,141,0.03)_100%)]" />

          <div className="relative z-10 mb-6 md:mb-10 lg:mb-14">
            <CardHeader />

            <AudioControls
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              playbackRate={playbackRate}
              onPlaybackRateChange={onPlaybackRateChange}
              isDesktop={isDesktop}
            />
          </div>

          <InputSection userInput={userInput} onInputChange={onInputChange} />

          <FooterStats userInput={userInput} />

          <div className="absolute inset-0 rounded-4xl md:rounded-[2.5rem] lg:rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.1)] pointer-events-none" />
        </motion.div>
      </div>
    </motion.div>
  )
}
