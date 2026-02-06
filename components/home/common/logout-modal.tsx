'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion, Variants } from 'framer-motion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Loader2, LogOut } from 'lucide-react'
import Image from 'next/image'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoggingOut: boolean
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

export function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
  isLoggingOut,
}: LogoutModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && !isLoggingOut && onClose()}
    >
      <DialogContent
        className="w-[92vw] max-w-lg p-0 border-none bg-white rounded-3xl overflow-hidden outline-none sm:rounded-4xl"
        onPointerDownOutside={
          isLoggingOut ? (e) => e.preventDefault() : onClose
        }
        onEscapeKeyDown={isLoggingOut ? (e) => e.preventDefault() : onClose}
      >
        <DialogTitle asChild>
          <VisuallyHidden>Konfirmasi Keluar</VisuallyHidden>
        </DialogTitle>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col bg-white"
        >
          {/* HEADER IMAGE SECTION */}
          <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-slate-50">
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-full h-full relative flex items-center justify-center"
            >
              <Image
                src="/logout.webp"
                alt="Keluar Akun"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white via-white/80 to-transparent" />
          </div>

          {/* CONTENT SECTION */}
          <div className="px-6 sm:px-8 pb-10 pt-0 -mt-8 relative z-10 bg-white">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center w-full space-y-6 sm:space-y-8"
            >
              {/* TEXT GROUP */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center space-y-4 w-full"
              >
                <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
                  Keluar <span className="text-red-500">Akun?</span>
                </h2>

                <p className="text-slate-500 font-medium text-sm sm:text-base max-w-64 leading-relaxed">
                  Sesi Anda saat ini akan berakhir dan Anda harus masuk kembali
                  untuk mengakses akun
                </p>
              </motion.div>

              {/* ACTION BUTTONS */}
              <motion.div
                variants={itemVariants}
                className="w-full max-w-full grid grid-cols-2 gap-3 sm:gap-4 px-0"
              >
                <Button
                  variant="ghost"
                  onClick={onClose}
                  disabled={isLoggingOut}
                  className="w-full min-w-0 h-14 sm:h-16 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 font-bold text-sm sm:text-base transition-all duration-200 uppercase tracking-wider"
                >
                  Batal
                </Button>

                <Button
                  onClick={onConfirm}
                  disabled={isLoggingOut}
                  className="relative w-full min-w-0 h-14 sm:h-16 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base transition-all duration-300 shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/30 overflow-hidden group cursor-pointer"
                >
                  {isLoggingOut ? (
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  ) : (
                    <>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                      <span className="relative z-10 flex items-center gap-2">
                        YA, KELUAR
                      </span>
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
