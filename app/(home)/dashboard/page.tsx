'use client'

import { motion, Variants } from 'framer-motion'
import { Sidebar } from '@/components/home/common/sidebar'
import { MobileNav } from '@/components/home/common/mobile-nav'
import { LearningActivity } from '@/components/home/dashboard/learning-activity'
import { StatsCards } from '@/components/home/dashboard/stats-cards'
import { VocabGrowthChart } from '@/components/home/dashboard/vocab-growth-chart'
import { useScrollbarGutterStable } from '@/components/utils/useScrollbarGutter'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
}

export default function DashboardPage() {
  useScrollbarGutterStable()

  return (
    <div className="flex min-h-screen bg-linear-to-br from-white via-[#eaf4fb] to-cyan items-start selection:bg-cyan/30 relative">
      {/* Sidebar desktop */}
      <div className="hidden lg:block z-20">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        <MobileNav title="Dashboard" />

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:pl-72 relative min-w-0"
        >
          <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-6 md:py-12 pb-12 md:pb-12">
            {/* HEADER */}
            <motion.header
              variants={itemVariants}
              className="hidden lg:flex justify-between items-end mb-14 relative"
            >
              <div>
                <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-linear-to-br from-navy via-blue to-sky tracking-tighter uppercase leading-[0.9] drop-shadow-sm">
                  Dashboard
                </h1>

                <div className="flex items-center gap-2 mt-4 ml-1">
                  <div className="h-1 w-12 bg-linear-to-r from-blue to-cyan rounded-full" />
                  <p className="text-sm font-bold text-navy/60 tracking-[0.3em] uppercase">
                    Instant Insights
                  </p>
                </div>
              </div>
            </motion.header>

            {/* MAIN GRID */}
            <div className="grid grid-cols-12 gap-6 xl:gap-10">
              {/* Left: Activity */}
              <motion.div
                variants={itemVariants}
                className="col-span-12 xl:col-span-8 order-1"
              >
                <LearningActivity />
              </motion.div>

              {/* Right: Stats */}
              <motion.div
                variants={itemVariants}
                className="col-span-12 xl:col-span-4 flex flex-col gap-6 xl:gap-10 order-2 xl:order-3"
              >
                <StatsCards />
              </motion.div>

              {/* Bottom: Chart */}
              <motion.div
                variants={itemVariants}
                className="col-span-12 order-4"
              >
                <VocabGrowthChart />
              </motion.div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  )
}
