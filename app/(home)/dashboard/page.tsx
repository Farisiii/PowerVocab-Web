'use client'

import { motion, Variants } from 'framer-motion'
import { Sidebar } from '@/components/home/common/sidebar'
import { MobileNav } from '@/components/home/common/mobile-nav'
import { LearningActivity } from '@/components/home/dashboard/learning-activity'
import { StatsCards } from '@/components/home/dashboard/stats-cards'
import { LastSessionCard } from '@/components/home/dashboard/last-session-card'
import { VocabGrowthChart } from '@/components/home/dashboard/vocab-growth-chart'
import { useScrollbarGutterStable } from '@/components/utils/useScrollbarGutter'

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.5, ease: 'easeOut' },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  useScrollbarGutterStable()
  return (
    <div className="flex min-h-screen bg-[#f8fafc] items-start selection:bg-cyan/30">
      {/* Sidebar desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
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
              className="hidden lg:block mb-14"
            >
              <h1 className="flex justify-center text-5xl lg:text-6xl font-black text-navy tracking-tighter uppercase leading-[0.9]">
                Dashboard
              </h1>
              <p className="flex justify-center text-xs md:text-sm font-bold text-sky tracking-[0.4em] uppercase opacity-70 mt-3 ml-1">
                Instant Insights
              </p>
            </motion.header>

            {/* MAIN GRID */}
            <div className="grid grid-cols-12 gap-6 xl:gap-10">
              {/* Left: Activity */}
              <div className="col-span-12 xl:col-span-6 order-1">
                <motion.div variants={itemVariants}>
                  <LearningActivity />
                </motion.div>
              </div>

              {/* Right: Stats + Session */}
              <div className="col-span-12 xl:col-span-4 flex flex-col gap-6 xl:gap-10 order-2 xl:order-3">
                <motion.div variants={itemVariants}>
                  <StatsCards />
                </motion.div>
              </div>

              <div className="col-span-12 xl:col-span-6 order-3 xl:order-2">
                <motion.div variants={itemVariants}>
                  <LastSessionCard />
                </motion.div>
              </div>

              {/* Bottom: Chart */}
              <div className="col-span-12 xl:col-span-8 order-4">
                <motion.div variants={itemVariants}>
                  <VocabGrowthChart />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  )
}
