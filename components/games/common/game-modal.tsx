'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  score: number
  totalQuestions: number
  onRestart: () => void
  onExit: () => void
  title?: string
  restartText?: string
  exitText?: string
  showSkeleton?: boolean
}

export function GameModal({
  isOpen,
  onClose,
  score,
  totalQuestions,
  onRestart,
  onExit,
  title = 'Hasil Akhir',
  restartText = 'Main Lagi',
  exitText = 'Keluar',
  showSkeleton = false,
}: GameModalProps) {
  const [isCalculating, setIsCalculating] = useState(showSkeleton)
  const percentage = Math.round((score / totalQuestions) * 100)

  useEffect(() => {
    if (isOpen && showSkeleton) {
      setIsCalculating(true)
      const timer = setTimeout(() => {
        setIsCalculating(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, showSkeleton])

  const getMessage = () => {
    if (percentage >= 80) return 'Keren banget!'
    if (percentage >= 60) return 'Lumayan nih!'
    if (percentage >= 40) return 'Masih bisa lebih baik!'
    return 'Ayo semangat!'
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[90vw] w-full sm:max-w-md md:max-w-lg p-0 border-none bg-white rounded-4xl sm:rounded-[3rem] overflow-hidden shadow-[0_25px_80px_-20px_rgba(0,0,0,0.4)]"
        onPointerDownOutside={onClose}
        onEscapeKeyDown={onClose}
      >
        <DialogTitle asChild>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col"
            >
              <div className="relative w-full h-60 sm:h-75 overflow-hidden bg-linear-to-br from-navy/5 via-blue/5 to-sky/5 -mb-1">
                <Image
                  src="/finishgame.webp"
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 md:h-32 bg-linear-to-t from-white via-white/60 to-transparent" />
              </div>

              {/* Content Section */}
              <div className="relative px-8 sm:px-12 pt-6 pb-10 sm:pb-12 bg-white -mt-1">
                {isCalculating ? (
                  <div className="text-center mb-8 sm:mb-10">
                    <div className="mb-3">
                      <div className="inline-block w-48 sm:w-64 md:w-72 h-20 sm:h-24 md:h-28 bg-linear-to-r from-slate-100 via-slate-50 to-slate-100 rounded-2xl animate-pulse" />
                    </div>
                    <div className="mb-4 flex justify-center">
                      <div className="w-36 sm:w-40 md:w-44 h-7 sm:h-8 md:h-9 bg-linear-to-r from-slate-100 via-slate-50 to-slate-100 rounded-full animate-pulse" />
                    </div>
                    <div className="flex justify-center">
                      <div className="w-44 sm:w-48 md:w-52 h-8 sm:h-9 md:h-10 bg-linear-to-r from-slate-100 via-slate-50 to-slate-100 rounded-full animate-pulse" />
                    </div>
                    <div className="mt-8 sm:mt-10 mb-8 sm:mb-10">
                      <div className="h-3 sm:h-3.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-linear-to-r from-slate-200 via-slate-300 to-slate-200 rounded-full"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="h-14 sm:h-16 bg-slate-100 rounded-[1.25rem] sm:rounded-2xl animate-pulse" />
                      <div className="h-14 sm:h-16 bg-slate-100 rounded-[1.25rem] sm:rounded-2xl animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="text-center mb-8 sm:mb-10"
                    >
                      <div className="mb-3">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.1,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="text-6xl sm:text-7xl md:text-8xl font-black text-navy tracking-tighter leading-none"
                        >
                          {percentage}%
                        </motion.div>
                      </div>
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="text-lg sm:text-xl md:text-2xl font-bold text-slate-600 mb-4"
                      >
                        {getMessage()}
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25, duration: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100"
                      >
                        <span className="text-sm md:text-base font-bold text-navy">
                          {score}
                        </span>
                        <span className="text-sm md:text-base text-slate-400">
                          dari
                        </span>
                        <span className="text-sm md:text-base font-bold text-navy">
                          {totalQuestions}
                        </span>
                        <span className="text-sm md:text-base text-slate-400">
                          benar
                        </span>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                      className="mb-8 sm:mb-10"
                    >
                      <div className="relative h-3 sm:h-3.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full bg-linear-to-r from-navy via-blue to-sky shadow-lg shadow-blue/30"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{
                            delay: 0.4,
                            duration: 1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                              delay: 0.5,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.3 }}
                      className="grid grid-cols-2 gap-3 sm:gap-4"
                    >
                      <Button
                        variant="ghost"
                        onClick={onExit}
                        className="h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 font-semibold text-sm sm:text-base transition-all duration-200"
                      >
                        {exitText}
                      </Button>

                      <Button
                        onClick={onRestart}
                        className="relative h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl bg-navy hover:bg-blue text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-navy/25 hover:shadow-2xl hover:shadow-navy/30 hover:scale-[1.02] overflow-hidden group"
                      >
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                        <span className="relative z-10">{restartText}</span>
                      </Button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
