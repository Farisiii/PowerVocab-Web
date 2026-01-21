'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function AuthDivider() {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px w-full bg-navy/10" />
      <span className="text-[11px] font-black text-navy/30 uppercase tracking-[0.3em] shrink-0">
        Or Use
      </span>
      <div className="h-px w-full bg-navy/10" />
    </div>
  )
}

export function GoogleButton() {
  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <Button
        variant="outline"
        className="h-15 w-full text-base rounded-full border-navy/10 bg-white/40 active:bg-white/80 font-bold transition-all flex items-center justify-center gap-3 cursor-pointer"
      >
        <Image src="/google.svg" alt="Google" width={20} height={20} />
        Continue with Google
      </Button>
    </motion.div>
  )
}
