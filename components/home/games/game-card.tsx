'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface GameCardProps {
  title: string
  description: string
  image: string
  onPlay: () => void
}

export function GameCard({ title, description, image, onPlay }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="
        group relative
        bg-white
        rounded-[2.5rem]
        overflow-hidden
        border border-white/60
        shadow-glass
        transition-all duration-500
        md:hover:shadow-soft-lg
        md:hover:border-sky/40
        flex flex-col h-full
      "
    >
      <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-sky/20 blur-3xl rounded-full" />
      </div>

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-navy/20 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1">
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-black text-navy uppercase tracking-tighter transition-colors duration-300 md:group-hover:text-blue">
            {title}
          </h3>

          <div className="w-8 h-1 bg-sky rounded-full mt-2 transition-all duration-500 md:group-hover:w-16 md:group-hover:bg-blue" />
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1 transition-colors md:group-hover:text-slate-600">
          {description}
        </p>

        {/* Button */}
        <Button
          onClick={onPlay}
          className="
            btn-modern
            w-full
            group/btn
            relative
            overflow-hidden
            active:scale-95
            transition-all
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            PLAY NOW
            <ArrowRight
              size={18}
              className="transition-transform duration-300 md:group-hover/btn:translate-x-1"
            />
          </span>
          <span className="absolute inset-0 -translate-x-full md:group-hover/btn:translate-x-0 transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
        </Button>
      </div>
    </motion.div>
  )
}
