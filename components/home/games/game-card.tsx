'use client'

import { useState, useEffect } from 'react'
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
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <motion.div
      whileHover={isDesktop ? { y: -10 } : {}}
      className="group relative bg-white rounded-4xl overflow-hidden shadow-glass border border-white transition-all duration-500 md:hover:shadow-soft-lg flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 md:group-hover:scale-110"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-black text-navy uppercase tracking-tighter md:group-hover:text-blue transition-colors">
            {title}
          </h3>
          <div className="w-8 h-1 bg-sky rounded-full mt-1 md:group-hover:w-16 transition-all duration-500" />
        </div>

        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
          {description}
        </p>

        <Button
          onClick={onPlay}
          className="btn-modern w-full group/btn relative overflow-hidden active:scale-95 transition-transform"
        >
          <span className="relative z-10 flex items-center gap-2">
            PLAY NOW{' '}
            <ArrowRight
              size={18}
              className="md:group-hover/btn:translate-x-1 transition-transform"
            />
          </span>
        </Button>
      </div>
    </motion.div>
  )
}
