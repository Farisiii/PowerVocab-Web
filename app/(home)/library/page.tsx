'use client'

import { motion, Variants } from 'framer-motion'
import { Sidebar } from '@/components/home/common/sidebar'
import { MobileNav } from '@/components/home/common/mobile-nav'
import { ProgressCard } from '@/components/home/library/progress-card'
import { InfiniteDeckGrid } from '@/components/home/library/infinite-deck-grid'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useScrollbarGutterStable } from '@/components/utils/useScrollbarGutter'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 50, damping: 15 },
  },
}

export default function LibraryPage() {
  useScrollbarGutterStable()
  const handleAdd = () => console.log('Add new item')

  return (
    <div className="flex min-h-screen bg-[#f8fafc] items-start selection:bg-cyan/30">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <MobileNav title="Library" primaryAction={handleAdd} />
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:pl-72 relative min-w-0"
        >
          <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-6 md:py-14 pb-32 md:pb-14">
            <motion.header
              variants={itemVariants}
              className="hidden lg:block mb-14"
            >
              <h1 className="flex justify-center text-5xl lg:text-6xl font-black text-navy tracking-tighter uppercase leading-[0.9]">
                Library
              </h1>
              <p className="flex justify-center text-xs md:text-sm font-bold text-sky tracking-[0.4em] uppercase opacity-70 mt-3 ml-1">
                Advanced Vocabulary Hub
              </p>
            </motion.header>

            <motion.section
              variants={itemVariants}
              className="mb-10 md:mb-14 lg:mb-20"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-1.5 md:w-3 h-6 md:h-10 bg-blue rounded-full shadow-lg shadow-blue/20" />
                <h3 className="font-black text-navy uppercase tracking-[0.2em] text-xs md:text-lg">
                  Continue Learning
                </h3>
              </div>
              <ProgressCard />
            </motion.section>

            <section className="relative">
              <motion.div
                variants={itemVariants}
                className="contents lg:flex lg:flex-row lg:items-center justify-between gap-6"
              >
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-black text-navy uppercase tracking-tighter mb-5 lg:mb-10 whitespace-nowrap">
                  All Decks
                </h2>

                <div className="w-auto sticky top-16 z-30 bg-white/90 backdrop-blur-xl supports-backdrop-filter:bg-[#f8fafc]/80 -mx-5 px-5 py-3 mb-6 sm:-mx-8 md:-mx-12 border-b border-cyan/5 shadow-sm lg:static lg:bg-transparent lg:mx-0 lg:px-0 lg:py-0 lg:mb-10 lg:border-none lg:shadow-none transition-all duration-300">
                  <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 w-full lg:w-auto">
                    <div className="relative w-full lg:w-96 group order-2 sm:order-1">
                      <Search
                        className="absolute left-4 lg:left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue transition-colors"
                        size={18}
                      />
                      <Input
                        placeholder="Search decks..."
                        className="pl-11 md:pl-14 h-12 md:h-14 lg:h-16 text-sm md:text-base lg:text-lg rounded-xl md:rounded-2xl border-2 border-navy/10 bg-white shadow-sm ring-1 ring-slate-100 focus-visible:ring-2 focus-visible:ring-blue transition-all w-full placeholder:text-slate-300 font-medium"
                      />
                    </div>

                    <Button className="hidden lg:flex items-center gap-3 bg-navy text-white px-10 h-16 rounded-2xl font-black text-xs tracking-widest shadow-xl md:hover:bg-blue transition-all active:scale-95 order-1 sm:order-2 w-full lg:w-auto">
                      <Plus size={18} strokeWidth={3} /> CREATE NEW
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfiniteDeckGrid />
              </motion.div>
            </section>
          </div>
        </motion.main>
      </div>
    </div>
  )
}
