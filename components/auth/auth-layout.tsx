'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'
import Image from 'next/image'

interface AuthLayoutProps {
  title: ReactNode
  badge: string
  description: string
  stats: { value: string; label: string }[]
  mobileSubtitle: string
  children: ReactNode
}

const leftContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const leftItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
}

export function AuthLayout({
  title,
  badge,
  description,
  stats,
  mobileSubtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen lg:h-screen w-full flex justify-center relative overflow-hidden bg-linear-to-br from-white via-[#eaf4fb] to-cyan selection:bg-blue/20">
      <div className="grid lg:grid-cols-2 gap-8 xl:gap-24 max-w-7xl w-full relative px-4 sm:px-6 md:px-12">
        {/* LEFT SIDE (Desktop Only) */}
        <div className="hidden lg:flex flex-col justify-center h-full sticky top-0 z-10 py-12">
          <motion.div
            variants={leftContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6 xl:space-y-8"
          >
            <motion.h1
              variants={leftItemVariants}
              className="text-6xl xl:text-8xl 2xl:text-9xl text-gradient leading-[0.9] font-black"
            >
              {title}
            </motion.h1>

            <motion.div variants={leftItemVariants}>
              <span className="bg-blue/10 text-blue px-4 py-2 rounded-full text-xs xl:text-sm font-bold uppercase tracking-widest inline-block backdrop-blur-sm border border-blue/5">
                {badge}
              </span>

              <p className="text-lg xl:text-2xl text-navy/60 leading-relaxed max-w-lg font-medium mt-4">
                {description}
              </p>
            </motion.div>

            <motion.div
              variants={leftItemVariants}
              className="flex gap-12 xl:gap-16 pt-8 xl:pt-10 border-t-2 border-navy/5"
            >
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="text-3xl xl:text-5xl font-black text-navy">
                    {s.value}
                  </p>
                  <p className="text-[10px] xl:text-xs opacity-50 font-bold uppercase tracking-widest mt-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT SIDE (Scrollable on Desktop) */}
        <div className="w-full h-full lg:overflow-y-auto no-scrollbar z-20 relative flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden w-full relative z-30 pt-8 sm:pt-12 pb-4 px-6">
            <div className="flex flex-col items-center justify-center gap-5 text-center">
              <div className="relative h-20 w-20 sm:h-22 sm:w-22 md:h-24 md:w-24">
                <Image
                  src="/logo.webp"
                  alt="Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col items-center leading-none gap-2">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-navy tracking-tight uppercase">
                  PowerVocab
                </span>
                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.3em] uppercase text-navy/40">
                  {mobileSubtitle}
                </span>
              </div>
            </div>
          </div>

          {/* FORM WRAPPER */}
          <div className="flex flex-col items-center justify-start lg:justify-center grow py-8 lg:py-12">
            <div className="max-w-[90%] md:max-w-[85%] w-full lg:max-w-lg relative">
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15,
                }}
              >
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
