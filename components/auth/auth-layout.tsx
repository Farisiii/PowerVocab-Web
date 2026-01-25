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
    <main className="min-h-screen lg:h-screen w-full flex justify-center relative overflow-hidden overflow-x-hidden bg-linear-to-br from-white via-[#eaf4fb] to-cyan selection:bg-blue/20">
      {/* Background Decor */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          className="absolute -top-[15%] -right-[5%] w-120 h-120 bg-sky-400/30 blur-[120px] rounded-full opacity-60"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 xl:gap-24 max-w-7xl w-full relative px-4 sm:px-6 md:px-12">
        {/* Left Side: Desktop Info */}
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

            <motion.div
              variants={leftItemVariants}
              className="space-y-4 xl:space-y-6"
            >
              <span className="bg-blue/10 text-blue px-4 py-2 rounded-full text-xs xl:text-sm font-bold uppercase tracking-widest inline-block backdrop-blur-sm border border-blue/5">
                {badge}
              </span>
              <p className="text-lg xl:text-2xl text-navy/60 leading-relaxed max-w-lg font-medium">
                {description}
              </p>
            </motion.div>

            <motion.div
              variants={leftItemVariants}
              className="flex gap-12 xl:gap-16 pt-8 xl:pt-10 border-t-2 border-navy/5"
            >
              {stats.map((s, i) => (
                <div key={i} className="group cursor-default">
                  <p className="text-3xl xl:text-5xl font-black text-navy group-hover:text-blue transition-colors duration-300">
                    {s.value}
                  </p>
                  <p className="text-[10px] xl:text-xs opacity-50 font-bold uppercase tracking-widest mt-1 xl:mt-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full h-full lg:overflow-y-auto no-scrollbar z-20 relative flex flex-col">
          {/* Mobile Header */}
          <div className="lg:hidden w-full relative z-30 pt-8 sm:pt-12 pb-4 px-6">
            <div className="flex flex-col items-center justify-center gap-5 text-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-linear-to-tr from-cyan/40 via-blue/30 to-purple/20 rounded-full blur-2xl opacity-60" />
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-[20px] sm:rounded-3xl overflow-hidden bg-linear-to-br from-white/80 via-white/20 to-white/5 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-white/40 flex items-center justify-center transition-all duration-300">
                  <div className="absolute inset-0 bg-linear-to-br from-white/90 via-transparent to-transparent opacity-70 z-10 pointer-events-none mix-blend-overlay" />
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] z-10 pointer-events-none rounded-[20px] sm:rounded-3xl" />
                  <div className="relative z-20 h-full w-full p-3 sm:p-4 drop-shadow-md">
                    <Image
                      src="/logo.webp"
                      alt="Logo"
                      fill
                      priority
                      loading="eager"
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center leading-none gap-2">
                <span className="text-xl sm:text-2xl font-black text-navy tracking-tight uppercase">
                  PowerVocab
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-navy/40">
                  {mobileSubtitle}
                </span>
              </div>
            </div>
          </div>

          {/* Form Wrapper */}
          <div className="flex flex-col items-center justify-center grow py-8 lg:py-12">
            <div className="max-w-[90%] sm:max-w-md mx-auto lg:max-w-lg w-full relative">
              <div className="hidden lg:block absolute inset-0 bg-white/40 blur-[80px] -z-10 opacity-50" />

              {/* VERSI MOBILE */}
              <div className="block lg:hidden">{children}</div>

              {/* VERSI DESKTOP */}
              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15,
                }}
                className="hidden lg:block"
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
