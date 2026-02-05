'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDeleting: boolean
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 25 },
  },
}

export function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteAccountModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && !isDeleting && onClose()}
    >
      <DialogContent
        className="w-[92vw] max-w-lg p-0 border-none bg-white rounded-4xl overflow-hidden shadow-soft-lg outline-none"
        onPointerDownOutside={isDeleting ? (e) => e.preventDefault() : onClose}
        onEscapeKeyDown={isDeleting ? (e) => e.preventDefault() : onClose}
      >
        <DialogTitle asChild>
          <VisuallyHidden>Hapus Akun</VisuallyHidden>
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
                src="/delete-account.webp"
                alt="Hapus Akun"
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
          <div className="px-6 sm:px-8 pb-8 pt-0 -mt-8 relative z-10 bg-white text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Judul & Deskripsi */}
              <motion.div variants={itemVariants} className="space-y-3">
                <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
                  Hapus <span className="text-red-600">Akun?</span>
                </h2>
                <p className="text-slate-500 font-medium text-sm sm:text-base max-w-[280px] mx-auto leading-relaxed">
                  Semua progress dan kosa kata kamu akan hilang secara permanen.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-3 sm:gap-4"
              >
                <Button
                  variant="ghost"
                  onClick={onClose}
                  disabled={isDeleting}
                  className="h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 font-bold text-sm sm:text-base transition-all duration-200 uppercase tracking-wider"
                >
                  Batal
                </Button>

                <Button
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="relative h-14 sm:h-16 rounded-[1.25rem] sm:rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/30 overflow-hidden group"
                >
                  {isDeleting ? (
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  ) : (
                    <>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                      <span className="relative z-10">YA, HAPUS</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
