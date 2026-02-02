'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Home, X } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  score: number
  totalQuestions: number
  onRestart: () => void
  onExit: () => void
  title?: string
}

export function GameModal({
  isOpen,
  onClose,
  score,
  totalQuestions,
  onRestart,
  onExit,
  title = 'Final Results',
}: GameModalProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-115 p-0 border-none bg-white rounded-4xl md:rounded-[3rem] overflow-hidden shadow-2xl">
        {/* Accessibility */}
        <DialogTitle asChild>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>

        <DialogPrimitive.Close className="absolute right-6 top-6 z-50 rounded-full p-2 bg-slate-100/50 text-slate-400 backdrop-blur-sm hover:bg-slate-100 hover:text-navy">
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="pt-16 pb-10 flex flex-col items-center">
                <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
                  {title}
                </div>

                <div className="text-7xl md:text-8xl font-black text-navy tracking-tighter">
                  {percentage}%
                </div>
              </div>

              <div className="px-8 md:px-14 pb-12">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Your Progress
                  </span>
                  <span className="text-sm font-black text-navy">
                    {score} / {totalQuestions}
                  </span>
                </div>

                <Progress value={percentage} className="h-2.5 bg-slate-100" />

                <div className="mt-12 flex flex-col gap-3">
                  <Button
                    onClick={onRestart}
                    className="h-14 md:h-16 rounded-2xl bg-navy hover:bg-blue text-white font-bold"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={onExit}
                    className="h-14 md:h-16 rounded-2xl text-slate-400 hover:text-navy hover:bg-slate-50 font-bold"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Games
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
