'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion, Variants, AnimatePresence } from 'framer-motion'
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
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
      }, 1500)
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
      <DialogContent className="w-[92vw] max-w-lg p-0 border-none bg-white rounded-4xl overflow-hidden shadow-soft-lg outline-none">
        <DialogTitle asChild>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col bg-white"
        >
          {/* HEADER IMAGE */}
          <div className="relative w-full h-52 sm:h-60 overflow-hidden">
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-full h-full relative"
            >
              <Image
                src="/finishgame.webp"
                alt="Finish"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-white via-white/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white via-white/90 to-transparent" />
          </div>

          {/* CONTENT SECTION */}
          <div className="px-6 sm:px-8 pb-8 pt-0 -mt-8 relative z-10 bg-white">
            <AnimatePresence mode="wait">
              {isCalculating ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="animate-pulse"
                >
                  {/* Skor & Pesan Skeleton */}
                  <div className="text-center space-y-4 mb-6">
                    <div className="h-14 sm:h-16 w-28 mx-auto bg-slate-100 rounded-xl" />
                    <div className="h-5 w-40 mx-auto bg-slate-100 rounded-full" />
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 border">
                      <div className="h-4 w-6 bg-slate-200 rounded" />
                      <div className="h-4 w-3 bg-slate-200 rounded" />
                      <div className="h-4 w-6 bg-slate-200 rounded" />
                    </div>
                  </div>

                  {/* Progress Bar Skeleton */}
                  <div className="mb-6">
                    <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-2/3 bg-slate-200 rounded-full" />
                    </div>
                  </div>

                  {/* Buttons Skeleton */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl bg-slate-100" />
                    <div className="h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl bg-slate-200" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="actual-content"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Skor & Pesan */}
                  <motion.div
                    variants={itemVariants}
                    className="text-center space-y-4 mb-6"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="text-5xl sm:text-6xl font-black text-navy"
                    >
                      {percentage}%
                    </motion.div>

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
                  </motion.div>

                  {/* Progress Bar */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full bg-linear-to-r from-navy via-blue to-cyan"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{
                          duration: 1.2,
                          ease: [0.65, 0, 0.35, 1],
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 gap-3 sm:gap-4"
                  >
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
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
