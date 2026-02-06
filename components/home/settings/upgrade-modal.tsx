'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { motion, Variants } from 'framer-motion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { BrainCircuit, Users, Gamepad2, Check } from 'lucide-react'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md p-0 border-none bg-white rounded-3xl sm:rounded-4xl overflow-hidden outline-none shadow-soft-lg">
        <DialogTitle asChild>
          <VisuallyHidden>Upgrade ke Premium</VisuallyHidden>
        </DialogTitle>

        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-blue/5 via-cyan/5 to-transparent pointer-events-none" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col relative z-10 px-5 py-6 sm:px-8 sm:py-8 max-h-[85vh] overflow-y-auto no-scrollbar"
          >
            {/* HEADER */}
            <motion.div variants={itemVariants} className="text-center mb-2">
              <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight leading-tight mb-2">
                Unlock{' '}
                <span className="bg-clip-text text-transparent bg-linear-to-br from-navy via-blue to-sky">
                  Premium
                </span>
              </h2>
            </motion.div>

            {/* PRICE SECTION */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center py-2 sm:py-4 mb-6"
            >
              <span className="text-slate-400 font-black text-[10px] sm:text-[11px] uppercase tracking-[0.15em] mb-2">
                HANYA
              </span>

              <div className="flex justify-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-bold text-slate-400 self-start mt-2 sm:mt-3">
                  Rp
                </span>
                <span className="text-6xl sm:text-7xl font-black tracking-tighter text-blue leading-none">
                  99.000
                </span>
                <span className="text-navy font-black text-[10px] sm:text-[11px] uppercase tracking-widest self-end mb-2 sm:mb-3">
                  / BULAN
                </span>
              </div>
            </motion.div>

            {/* FEATURES LIST */}
            <motion.div variants={itemVariants} className="space-y-3 mb-8 px-1">
              <FeatureItem
                icon={<Gamepad2 size={16} strokeWidth={2.5} />}
                title="Akses Game Arena"
                desc="Mainkan seluruh mode tanpa batas"
              />
              <FeatureItem
                icon={<BrainCircuit size={16} strokeWidth={2.5} />}
                title="AI Smart Deck"
                desc="Kurikulum personal berbasis AI"
              />
              <FeatureItem
                icon={<Users size={16} strokeWidth={2.5} />}
                title="Mode Guru & Murid"
                desc="Kolaborasi kelas virtual penuh"
              />
            </motion.div>

            {/* ACTION */}
            <motion.div variants={itemVariants} className="space-y-3 mt-auto">
              <Button className="relative w-full h-12 sm:h-14 rounded-2xl bg-navy hover:bg-blue text-white font-black uppercase tracking-widest text-xs sm:text-sm shadow-xl shadow-navy/20 hover:shadow-2xl hover:shadow-blue/30 transition-all duration-300 overflow-hidden group/btn cursor-pointer">
                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">Beli Sekarang</span>
              </Button>

              <button
                onClick={onClose}
                className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-navy uppercase tracking-widest transition-colors cursor-pointer"
              >
                Mungkin Nanti
              </button>
            </motion.div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100/50">
      <div className="shrink-0 w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue shadow-sm">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold text-navy text-sm leading-none mb-1">
          {title}
        </h3>
        <p className="text-[11px] text-slate-500 font-medium leading-tight">
          {desc}
        </p>
      </div>
      <div className="ml-auto">
        <Check size={14} className="text-green-500" strokeWidth={3} />
      </div>
    </div>
  )
}
