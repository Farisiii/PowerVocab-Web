'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  title: ReactNode
  badge: string
  description: string
  stats: { value: string; label: string }[]
  mobileSubtitle: string
  children: ReactNode
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
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
    <main className="min-h-screen lg:h-screen w-full flex justify-center relative overflow-x-hidden lg:overflow-hidden bg-linear-to-br from-white via-[#eaf4fb] to-cyan no-scrollbar overflow-hidden">
      {/* Background Orbs */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[15%] -right-[5%] w-120 h-120 bg-sky-400/40 blur-[120px] rounded-full opacity-80 will-change-transform"
        />

        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[10%] -left-[5%] w-100 h-100 bg-blue-500/30 blur-[120px] rounded-full opacity-80 will-change-transform"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl w-full relative px-6 md:px-12">
        {/* LEFT SIDE – Desktop */}
        <div className="hidden lg:flex flex-col justify-center h-full sticky top-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-8"
          >
            <div className="absolute inset-0 bg-white/20 blur-3xl -z-10 rounded-full opacity-50" />

            <motion.h1
              variants={itemVariants}
              className="text-7xl xl:text-8xl text-gradient"
            >
              {title}
            </motion.h1>

            <motion.div variants={itemVariants} className="space-y-4">
              <span className="bg-blue/10 text-blue px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest inline-block backdrop-blur-sm border border-blue/5">
                {badge}
              </span>

              <p className="text-lg xl:text-xl text-navy/60 leading-relaxed max-w-md font-medium">
                {description}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-12 pt-8 border-t-2 border-navy"
            >
              {stats.map((s, i) => (
                <div key={i} className="group">
                  <p className="text-3xl font-black text-navy group-hover:text-blue transition-colors">
                    {s.value}
                  </p>
                  <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT SIDE – Form */}
        <div className="w-full lg:h-full lg:overflow-y-auto no-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center justify-start lg:justify-center min-h-full py-12 lg:py-24"
          >
            <div className="max-w-md mx-auto lg:max-w-120 w-full relative">
              <div className="absolute inset-0 bg-white/40 blur-[100px] -z-10 opacity-50" />

              {/* Mobile Header */}
              <div className="lg:hidden text-center mb-10 space-y-2">
                <h1 className="text-5xl text-gradient px-2">PowerVocab</h1>
                <p className="text-[10px] font-bold opacity-30 tracking-[0.3em] uppercase">
                  {mobileSubtitle}
                </p>
              </div>

              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
