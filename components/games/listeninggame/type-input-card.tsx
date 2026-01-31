'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface TypeInputCardProps {
  userInput: string
  onInputChange: (value: string) => void
  correctText: string
  playbackRate: number
  onPlaybackRateChange: (rate: number) => void
}

const SPEED_OPTIONS = [
  { value: 0.75, label: '0.75x' },
  { value: 1.0, label: '1x' },
  { value: 1.25, label: '1.25x' },
]

export function TypeInputCard({
  userInput,
  onInputChange,
  correctText,
  playbackRate,
  onPlaybackRateChange,
}: TypeInputCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Responsive check
  useEffect(() => {
    const checkDesktop = () =>
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Stop audio on unmount or text change
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [correctText])

  // Handle Playback Speed Change while playing
  useEffect(() => {
    if (isPlaying && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      speak(correctText, playbackRate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playbackRate])

  const speak = (text: string, rate: number) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = rate
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)
    window.speechSynthesis.speak(utterance)
  }

  const handlePlayAudio = () => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()

    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    speak(correctText, playbackRate)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="w-full relative"
    >
      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className={cn(
          'glass-card relative overflow-visible',
          'rounded-2xl sm:rounded-3xl lg:rounded-[2rem] xl:rounded-[2.5rem]',
          'p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12',
        )}
      >
        {/* Audio Controls Box - Top Right Corner with Cutout Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, type: 'spring', bounce: 0.3 }}
          className={cn(
            // Positioning - responsive untuk semua device
            'absolute z-20',
            '-top-2.5 right-3',
            'sm:-top-3 sm:right-4',
            'md:-top-4 md:right-6',
            'lg:-top-5 lg:right-8',
            'xl:-top-6 xl:right-10',
            // Background gradient - menggunakan color palette
            'bg-gradient-to-br from-navy via-blue to-sky',
            // Border radius
            'rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-3xl',
            // Shadow & Border
            'shadow-[0_10px_40px_rgba(15,40,84,0.25)]',
            'border-2 border-white/35',
            // Padding
            'p-2.5 sm:p-3 md:p-4 lg:p-4 xl:p-5',
            // Layout
            'flex items-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5',
          )}
        >
          {/* Play Button */}
          <div className="relative">
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-full h-full rounded-full bg-cyan/50 absolute"
                />
              </div>
            )}

            <motion.div
              whileHover={isDesktop ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                onClick={handlePlayAudio}
                className={cn(
                  'rounded-full transition-all duration-300',
                  // Size responsive
                  'w-10 h-10',
                  'sm:w-11 sm:h-11',
                  'md:w-12 md:h-12',
                  'lg:w-13 lg:h-13',
                  'xl:w-14 xl:h-14',
                  // Colors - menggunakan color palette
                  'bg-white text-navy',
                  'border-2 border-white/40',
                  'shadow-lg',
                  // Hover states
                  'hover:bg-white hover:text-blue hover:shadow-xl hover:border-white/60 hover:scale-105',
                  // Playing state
                  isPlaying &&
                    'bg-cyan text-navy shadow-[0_0_24px_rgba(189,232,245,0.7)] ring-3 ring-white/50 border-white/60',
                )}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 fill-current" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 ml-0.5 fill-current" />
                )}
              </Button>
            </motion.div>
          </div>

          {/* Speed Controls */}
          <div className="flex flex-row gap-0.5 sm:gap-1 bg-white/20 backdrop-blur-sm p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-white/25">
            {SPEED_OPTIONS.map((option) => {
              const isActive = playbackRate === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => onPlaybackRateChange(option.value)}
                  className={cn(
                    'relative rounded-md sm:rounded-lg transition-all cursor-pointer overflow-hidden',
                    // Padding responsive
                    'px-2 py-1',
                    'sm:px-2.5 sm:py-1.5',
                    'md:px-3 md:py-2',
                    'lg:px-4 lg:py-2',
                    // Text size
                    'text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs',
                    'font-bold uppercase tracking-wide',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="speed-active-bg"
                      className="absolute inset-0 bg-white rounded-md sm:rounded-lg shadow-lg"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-10 transition-colors duration-200 whitespace-nowrap',
                      isActive
                        ? 'text-navy font-black'
                        : 'text-white/95 hover:text-white',
                    )}
                  >
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Decorative Elements - responsive size */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-gradient-to-bl from-sky/12 to-transparent rounded-bl-full pointer-events-none" />

        {/* Content Area */}
        <div
          className={cn(
            'relative z-10 flex flex-col justify-between',
            // Spacing responsive
            'space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 xl:space-y-10',
            // Min height responsive
            'min-h-[280px] sm:min-h-[320px] md:min-h-[360px] lg:min-h-[400px] xl:min-h-[420px]',
          )}
        >
          {/* Label */}
          <label
            className={cn('block', 'pt-6 sm:pt-7 md:pt-9 lg:pt-10 xl:pt-12')}
          >
            <span
              className={cn(
                'font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-navy/45',
                'text-[9px] sm:text-[10px] md:text-xs lg:text-sm',
              )}
            >
              Type what you hear
            </span>
          </label>

          {/* Input Field */}
          <div className="relative group flex-1 flex items-center">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Start typing here..."
              className={cn(
                'w-full h-full',
                // Text size responsive
                'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl',
                // Border radius
                'rounded-xl sm:rounded-xl md:rounded-2xl lg:rounded-2xl xl:rounded-3xl',
                // Background & border - menggunakan color palette
                'bg-white/75 border-2 border-white/50',
                // Padding responsive
                'px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7',
                'py-4 sm:py-5 md:py-6 lg:py-8 xl:py-9',
                // Typography
                'font-bold text-navy placeholder:text-navy/30',
                // Focus states - menggunakan color palette
                'focus-visible:ring-4 focus-visible:ring-sky/25 focus-visible:border-blue focus-visible:bg-white',
                'transition-all duration-300 shadow-sm',
              )}
            />
            {userInput.length > 0 && (
              <div className="absolute right-3 sm:right-4 md:right-5 lg:right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-cyan shadow-[0_0_16px_rgba(189,232,245,0.9)] animate-pulse"
                />
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="flex justify-between items-center">
            <span
              className={cn(
                'font-bold text-navy/45 uppercase tracking-wider',
                'text-[9px] sm:text-[10px] md:text-xs lg:text-sm',
              )}
            >
              {userInput.length} Characters
            </span>
            {userInput.length > 0 && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  'font-black text-blue uppercase tracking-wider',
                  'text-[9px] sm:text-[10px] md:text-xs lg:text-sm',
                )}
              >
                Keep Going
              </motion.span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
