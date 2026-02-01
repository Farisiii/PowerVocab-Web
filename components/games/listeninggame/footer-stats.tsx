'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface FooterStatsProps {
  userInput: string
}

export function FooterStats({ userInput }: FooterStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="relative z-10 flex flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mt-4 sm:mt-6 md:mt-8 min-h-10 sm:min-h-8"
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-linear-to-br from-navy to-blue shadow-[0_0_10px_rgba(28,77,141,0.3)]" />
        <span className="text-xs sm:text-sm md:text-base font-bold text-navy/50 items-center">
          {userInput.length} characters
        </span>
      </div>

      <div className="relative sm:absolute sm:right-0">
        <AnimatePresence>
          {userInput.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue/10 to-sky/10 border-2 border-blue/20 backdrop-blur-sm shadow-lg"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-linear-to-br from-blue to-sky shadow-[0_0_10px_rgba(56,189,248,0.5)]"
              />
              <span className="text-xs sm:text-sm md:text-base font-bold text-blue">
                Keep typing!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
