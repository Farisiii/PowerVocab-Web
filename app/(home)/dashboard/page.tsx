'use client'

import { motion, Variants } from 'framer-motion'
import { Sidebar } from '@/components/home/sidebar'
import { MobileNav } from '@/components/home/dashboard/mobile-nav'
import { LearningActivity } from '@/components/home/dashboard/learning-activity'
import { StatsCards } from '@/components/home/dashboard/stats-cards'
import { LastSessionCard } from '@/components/home/dashboard/last-session-card'
import { VocabGrowthChart } from '@/components/home/dashboard/vocab-growth-chart'

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
  return (
    <div className="flex min-h-screen bg-[#f8fafc] items-start selection:bg-cyan/30">
      {/* Sidebar desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 w-full md:pl-64 lg:pl-72 relative min-w-0"
      >
        {/* Mobile Header */}
        <MobileNav title="Dashboard" />

        <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-6 md:py-14 pb-32 md:pb-14">
          {/* HEADER */}
          <motion.header
            variants={itemVariants}
            className="hidden md:block mb-14"
          >
            <h1 className="text-5xl lg:text-6xl font-black text-navy tracking-tighter uppercase leading-[0.9]">
              Dashboard
            </h1>
            <p className="text-xs md:text-sm font-bold text-sky tracking-[0.4em] uppercase opacity-70 mt-3 ml-1">
              Instant Insights
            </p>
          </motion.header>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-10">
            {/* Left: Activity */}
            <div className="xl:col-span-8 order-1">
              <motion.div variants={itemVariants}>
                <LearningActivity />
              </motion.div>
            </div>

            {/* Right: Stats + Session */}
            <div className="xl:col-span-4 flex flex-col gap-6 xl:gap-10 order-2">
              <motion.div variants={itemVariants}>
                <StatsCards />
              </motion.div>

              <motion.div variants={itemVariants}>
                <LastSessionCard />
              </motion.div>
            </div>

            {/* Bottom: Chart */}
            <div className="xl:col-span-12 order-3">
              <motion.div variants={itemVariants}>
                <VocabGrowthChart />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}
