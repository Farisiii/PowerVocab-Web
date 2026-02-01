'use client'

import { motion } from 'framer-motion'

export function CardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-4 md:mb-0"
    >
      <h3
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-navy tracking-tight"
        style={{
          textShadow:
            '0 2px 10px rgba(28,77,141,0.1), 0 0 30px rgba(28,77,141,0.05)',
        }}
      >
        Listening Game
      </h3>
      <p className="text-xs md:text-sm text-navy/50 font-semibold tracking-wide uppercase mt-1">
        Type what you hear
      </p>
    </motion.div>
  )
}
