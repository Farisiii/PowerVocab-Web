'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useSpeech } from '../../../hooks/use-speech'
import { CardHeader } from './card-header'
import { AudioControls } from './audio-controls'
import { InputSection } from './input-section'

interface TypeInputCardProps {
  userInput: string
  onInputChange: (value: string) => void
  correctText: string
  playbackRate: number
  onPlaybackRateChange: (rate: number) => void
  onFocus?: () => void
  onBlur?: () => void
}

export function TypeInputCard({
  userInput,
  onInputChange,
  correctText,
  playbackRate,
  onPlaybackRateChange,
  onFocus,
  onBlur,
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
          <div className="absolute inset-0 bg-white" />

          <div className="absolute inset-0">
            <div className="absolute -top-12 -left-12 w-48 h-48 lg:w-60 lg:h-60 bg-sky/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-40 h-40 lg:w-52 lg:h-52 bg-blue/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 left-1/4 w-44 h-44 lg:w-56 lg:h-56 bg-cyan/25 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 lg:w-72 lg:h-72 bg-linear-to-br from-sky/10 to-blue/10 rounded-full blur-3xl" />
          </div>

          <div className="absolute inset-0 opacity-[0.02]">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.8),transparent_50%)]"
              style={{ backgroundSize: '30px 30px' }}
            />
          </div>

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

          <InputSection
            userInput={userInput}
            onInputChange={onInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          <div className="absolute inset-0 rounded-4xl md:rounded-[2.5rem] lg:rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.1)] pointer-events-none" />
        </motion.div>
      </div>
    </motion.div>
  )
}
