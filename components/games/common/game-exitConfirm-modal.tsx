'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'

interface ExitConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  imageSrc: string
  confirmText?: string
  cancelText?: string
}

export function ExitConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Mau keluar?',
  description = 'Progress kamu di sesi ini bakal hilang',
  imageSrc,
  confirmText = 'Lanjut Main',
  cancelText = 'Keluar',
}: ExitConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[90vw] sm:max-w-lg p-0 border-none bg-white rounded-4xl sm:rounded-[3rem] overflow-hidden shadow-[0_25px_80px_-20px_rgba(0,0,0,0.4)]"
        onPointerDownOutside={onClose}
        onEscapeKeyDown={onClose}
      >
        <DialogTitle asChild>
          <VisuallyHidden>Exit Confirmation</VisuallyHidden>
        </DialogTitle>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative w-full h-60 sm:h-75 overflow-hidden bg-linear-to-br from-navy/5 via-blue/5 to-sky/5">
                <Image
                  src={imageSrc}
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-white" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/80 to-transparent" />
              </div>

              <div className="relative px-8 sm:px-12 pt-6 pb-10 sm:pb-12 bg-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="text-center mb-8 sm:mb-10"
                >
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy mb-4 tracking-tight leading-[0.95]">
                    {title}
                  </h2>
                  <p className="text-base sm:text-lg text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                    {description}
                  </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="grid grid-cols-2 gap-3 sm:gap-4"
                >
                  <Button
                    variant="ghost"
                    onClick={onConfirm}
                    className="h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 font-bold text-sm sm:text-base transition-all duration-200"
                  >
                    {cancelText}
                  </Button>

                  <Button
                    onClick={onClose}
                    className="relative h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl bg-navy hover:bg-blue text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-navy/25 hover:shadow-2xl hover:shadow-navy/30 overflow-hidden group"
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                    <span className="relative z-10">{confirmText}</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
