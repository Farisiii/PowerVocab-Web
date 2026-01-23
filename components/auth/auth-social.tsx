'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
}

export function AuthDivider() {
  return (
    /* Auth Divider */
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-4 py-2"
    >
      <div className="h-px w-full bg-navy/10" />
      <span className="text-[11px] font-black text-navy/30 uppercase tracking-[0.3em] shrink-0">
        Or Use
      </span>
      <div className="h-px w-full bg-navy/10" />
    </motion.div>
  )
}

export function GoogleButton() {
  return (
    /* Google Auth Button */
    <motion.div variants={itemVariants} whileTap={{ scale: 0.98 }}>
      <Button
        variant="outline"
        className="h-11 sm:h-12 md:h-14 w-full text-sm sm:text-base rounded-xl sm:rounded-2xl border-2 border-navy/5 bg-white/40 hover:bg-white hover:border-navy/10 font-bold text-navy/80 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm"
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={18}
          height={18}
          className="opacity-80 sm:w-5 sm:h-5"
        />
        Sign in with Google
      </Button>
    </motion.div>
  )
}
