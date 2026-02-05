'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface FlashcardFinishModalProps {
  isOpen: boolean
  onClose: () => void
  memorizedCount: number
  notMemorizedCount: number
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

export function FlashcardFinishModal({
  isOpen,
  onClose,
  memorizedCount,
  notMemorizedCount,
  onRestart,
  onExit,
  title = 'Hasil Belajar',
  restartText = 'Ulangi Lagi',
  exitText = 'Keluar',
  showSkeleton = false,
}: FlashcardFinishModalProps) {
  const [isCalculating, setIsCalculating] = useState(showSkeleton)
  const totalCards = memorizedCount + notMemorizedCount

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
    if (notMemorizedCount === 0) return 'Sempurna! Semua Terkuasai'
    if (memorizedCount > notMemorizedCount) return 'Hebat! Progres Bagus'
    return 'Terus Latihan Ya!'
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
                alt="Success"
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
                  className="animate-pulse mt-6"
                >
                  <div className="h-8 w-3/4 mx-auto bg-slate-100 rounded-full mb-6" />
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="h-28 bg-slate-50 rounded-3xl" />
                    <div className="h-28 bg-slate-50 rounded-3xl" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-12 sm:h-14 bg-slate-50 rounded-2xl" />
                    <div className="h-12 sm:h-14 bg-slate-100 rounded-2xl" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="actual-content"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Title & Stats Meta */}
                  <motion.div
                    variants={itemVariants}
                    className="text-center space-y-1 mb-6"
                  >
                    <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
                      {getMessage()}
                    </h2>
                    <p className="text-slate-400 font-medium text-sm">
                      Total {totalCards} kartu telah diselesaikan
                    </p>
                  </motion.div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Stat: Not Memorized */}
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-red-200 border border-red-500 p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm"
                    >
                      <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest mb-1">
                        Belum Hafal
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-red-500">
                          {notMemorizedCount}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-red-500">
                          PCS
                        </span>
                      </div>
                    </motion.div>

                    {/* Stat: Memorized */}
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-[#f0f4f8] border border-navy p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm"
                    >
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                        Sudah Hafal
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-navy">
                          {memorizedCount}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-400">
                          PCS
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 gap-3 mt-6"
                  >
                    <Button
                      variant="ghost"
                      onClick={onExit}
                      className="h-12 sm:h-14 rounded-2xl text-slate-400 hover:text-navy hover:bg-slate-100 font-bold transition-all"
                    >
                      {exitText}
                    </Button>

                    <Button
                      onClick={onRestart}
                      className="h-12 sm:h-14 rounded-2xl btn-modern "
                    >
                      {restartText}
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
