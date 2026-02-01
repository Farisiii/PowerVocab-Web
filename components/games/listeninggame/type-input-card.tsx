'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface TypeInputCardProps {
  userInput: string
  onInputChange: (value: string) => void
  correctText: string
  playbackRate: number
  onPlaybackRateChange: (rate: number) => void
}

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.5x' },
  { value: 1.0, label: '1.0x' },
  { value: 2.0, label: '2.0x' },
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

  useEffect(() => {
    const checkDesktop = () =>
      setIsDesktop(window.matchMedia('(min-width: 1024px)').matches)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [correctText])

  useEffect(() => {
    if (isPlaying && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      speak(correctText, playbackRate)
    }
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl px-4 sm:px-6"
    >
      {/* Main Card Container */}
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

          <div className="absolute inset-0">
            <div className="absolute -top-12 -left-12 w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60 bg-sky/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-28 h-28 sm:w-40 sm:h-40 lg:w-52 lg:h-52 bg-blue/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 left-1/4 w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 bg-cyan/25 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-linear-to-br from-sky/10 to-blue/10 rounded-full blur-3xl" />
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 md:mb-0"
            >
              <h3
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-navy tracking-tight"
                style={{
                  textShadow:
                    '0 2px 10px rgba(28,77,141,0.1), 0 0 30px rgba(28,77,141,0.05)',
                }}
              >
                Listening Game
              </h3>
              <p className="text-xs md:text-sm text-navy/50 font-semibold tracking-wide uppercase mt-1">
                Type what you hear
              </p>
            </motion.div>

            {/* Audio Controls */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:absolute md:top-0 md:right-0"
            >
              {/* Play/Pause Button */}
              <motion.div
                whileHover={isDesktop ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                className=""
              >
                <Button
                  size="icon"
                  onClick={handlePlayAudio}
                  className={cn(
                    'rounded-xl sm:rounded-2xl transition-all duration-300 relative overflow-hidden',
                    'w-full sm:w-14 sm:h-14 md:w-16 md:h-16',
                    'h-14 sm:h-auto',
                    'shadow-[0_8px_30px_rgba(28,77,141,0.2)]',
                    isPlaying
                      ? 'bg-linear-to-br from-cyan via-sky to-blue text-navy'
                      : 'bg-linear-to-br from-navy via-blue to-sky text-white',
                  )}
                  style={{
                    boxShadow: isPlaying
                      ? '0 8px 30px rgba(6,182,212,0.3), 0 0 50px rgba(56,189,248,0.2)'
                      : '0 8px 30px rgba(28,77,141,0.2)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center gap-2 sm:gap-0"
                      >
                        <Pause className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 fill-current" />
                        <span className="sm:hidden font-bold">Pause Audio</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center gap-2 sm:gap-0"
                      >
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 fill-current" />
                        <span className="sm:hidden font-bold">Play Audio</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {isPlaying && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.3,
                        }}
                      />
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Speed Controls */}
              <div className="flex gap-1 bg-white/50 backdrop-blur-sm p-1.5 rounded-xl border-2 border-white/60 shadow-lg">
                {SPEED_OPTIONS.map((option) => {
                  const isActive = playbackRate === option.value
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => onPlaybackRateChange(option.value)}
                      whileHover={isDesktop ? { scale: 1.05 } : {}}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        'relative rounded-lg transition-all cursor-pointer',
                        'px-3 py-2 sm:px-4 sm:py-2.5',
                        'text-xs sm:text-sm font-bold',
                        'flex-1 sm:flex-none sm:min-w-14 md:min-w-16',
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="speed-active"
                          className="absolute inset-0 bg-linear-to-br from-navy to-blue rounded-lg shadow-[0_4px_20px_rgba(28,77,141,0.3)]"
                          transition={{
                            type: 'spring',
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span
                        className={cn(
                          'relative z-10 transition-colors duration-200',
                          isActive
                            ? 'text-white'
                            : 'text-navy/60 hover:text-navy',
                        )}
                      >
                        {option.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Input Field Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-linear-to-r from-blue/30 via-sky/30 to-cyan/30 rounded-2xl md:rounded-3xl blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-linear-to-r from-blue/20 via-sky/20 to-cyan/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

              <Textarea
                value={userInput}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Start typing here..."
                className={cn(
                  'relative w-full resize-none',
                  'text-sm sm:text-base md:text-lg',
                  'rounded-xl sm:rounded-2xl md:rounded-3xl',
                  'bg-white/80 border-2 border-white/60',
                  'px-4 sm:px-6 md:px-8 lg:px-10',
                  'py-4 sm:py-5 md:py-6 lg:py-7',
                  'font-medium text-navy placeholder:text-navy/30',
                  'focus-visible:ring-4 focus-visible:ring-sky/30 focus-visible:border-blue/60 focus-visible:bg-white',
                  'transition-all duration-300',
                  'shadow-[inset_0_2px_8px_rgba(15,40,84,0.03),0_4px_20px_rgba(28,77,141,0.08)]',
                  'hover:border-white/80 hover:shadow-[inset_0_2px_8px_rgba(15,40,84,0.05),0_8px_30px_rgba(28,77,141,0.12)]',
                  'h-80 sm:h-55 md:h-130 lg:h-40',
                  'leading-relaxed',
                  'overflow-y-auto',
                )}
                style={{
                  textShadow: '0 1px 2px rgba(28,77,141,0.03)',
                }}
              />
            </div>
          </motion.div>

          {/* Footer Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mt-4 sm:mt-6 md:mt-8 min-h-10 sm:min-h-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-linear-to-br from-navy to-blue shadow-[0_0_10px_rgba(28,77,141,0.3)]" />
              <span className="text-xs sm:text-sm md:text-base font-bold text-navy/50 items-center">
                {userInput.length} characters
              </span>
            </div>
            <div className="relative sm:absolute sm:right-0">
              <AnimatePresence>
                {userInput.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue/10 to-sky/10 border-2 border-blue/20 backdrop-blur-sm shadow-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-linear-to-br from-blue to-sky shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                    />
                    <span className="text-xs sm:text-sm md:text-base font-bold text-blue">
                      Keep typing!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <div className="absolute inset-0 rounded-4xl md:rounded-[2.5rem] lg:rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.1)] pointer-events-none" />
        </motion.div>
      </div>
    </motion.div>
  )
}
