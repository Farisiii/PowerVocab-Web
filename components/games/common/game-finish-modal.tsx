'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface FinishModalProps {
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

export function FinishModal({
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
}: FinishModalProps) {
  const [isCalculating, setIsCalculating] = useState(showSkeleton)
  const percentage = Math.round((score / totalQuestions) * 100)

  useEffect(() => {
    if (isOpen && showSkeleton) {
      setIsCalculating(true)
      const timer = setTimeout(() => {
        setIsCalculating(false)
      }, 5000)
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
        className="
          w-[92vw]
          max-w-sm sm:max-w-md md:max-w-lg
          max-h-[85vh]
          p-0
          border-none
          bg-white
          rounded-3xl sm:rounded-[2.5rem]
          overflow-hidden
          shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]
        "
        onPointerDownOutside={onClose}
        onEscapeKeyDown={onClose}
      >
        <DialogTitle asChild>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col max-h-[85vh]"
            >
              {/* Image Header */}
              <div className="relative w-full h-60 sm:h-75 overflow-hidden bg-linear-to-br from-navy/5 via-blue/5 to-sky/5 -mb-2.5 md:-mb-1.5">
                <Image
                  src="/finishgame.webp"
                  alt="Background"
                  fill
                  className="object-cover outline-none"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-white" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="px-6 sm:px-8 pt-4 pb-6 sm:pb-8 bg-white overflow-y-auto -mt-1">
                {isCalculating ? (
                  <div className="text-center space-y-4">
                    <div className="h-16 w-40 mx-auto bg-slate-100 rounded-xl animate-pulse" />
                    <div className="h-6 w-28 mx-auto bg-slate-100 rounded-full animate-pulse" />
                    <div className="h-3 w-full bg-slate-100 rounded-full animate-pulse" />
                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <div className="h-12 bg-slate-100 rounded-xl animate-pulse" />
                      <div className="h-12 bg-slate-100 rounded-xl animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Score */}
                    <div className="text-center space-y-3">
                      <div className="text-5xl sm:text-6xl font-black text-navy leading-none">
                        {percentage}%
                      </div>

                      <h2 className="text-base sm:text-lg font-semibold text-slate-600">
                        {getMessage()}
                      </h2>

                      <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 border text-sm">
                        <span className="font-bold text-navy">{score}</span>
                        <span className="text-slate-400">/</span>
                        <span className="font-bold text-navy">
                          {totalQuestions}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-5">
                      <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full bg-linear-to-r from-navy via-blue to-sky"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <Button
                        variant="ghost"
                        onClick={onExit}
                        className="h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 font-bold text-sm sm:text-base transition-all duration-200"
                      >
                        {exitText}
                      </Button>

                      <Button
                        onClick={onRestart}
                        className="relative h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl bg-navy hover:bg-blue text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-navy/25 hover:shadow-2xl hover:shadow-navy/30 overflow-hidden group"
                      >
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                        <span className="relative z-10">{restartText}</span>
                      </Button>
                    </div>
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
