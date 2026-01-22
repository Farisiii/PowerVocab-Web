'use client'

import { motion, Variants } from 'framer-motion'
import { Sidebar } from '@/components/home/sidebar'
import { MobileNav } from '@/components/home/library/mobile-nav'
import { ProgressCard } from '@/components/home/library/progress-card'
import { InfiniteDeckGrid } from '@/components/home/library/infinite-deck-grid'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
}

export default function LibraryPage() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] items-start overflow-x-hidden selection:bg-cyan/30">
      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 w-full md:pl-64 lg:pl-72 relative min-w-0 transition-all duration-300">
        <MobileNav />

        <div className="px-5 sm:px-8 md:px-10 lg:px-16 py-6 md:py-12 pb-32 md:pb-12">
          {/* 1. HERO HEADER (Desktop Only) */}
          <motion.header
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:block mb-12"
          >
            <h1 className="text-4xl lg:text-6xl font-black text-navy tracking-tighter uppercase leading-none">
              Library
            </h1>
            <p className="text-[10px] font-bold text-sky tracking-[0.4em] uppercase opacity-60 mt-2">
              Advanced Vocabulary Hub
            </p>
          </motion.header>

          {/* 2. SECTION: CONTINUE LEARNING */}
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mb-12 lg:mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-6 bg-blue rounded-full shadow-lg shadow-blue/20" />
              <h3 className="font-black text-navy uppercase tracking-[0.3em] text-xs md:text-md">
                Continue Learning
              </h3>
            </div>
            <ProgressCard />
          </motion.section>

          {/* 3. SECTION: YOUR DECKS & SMART SEARCH */}
          <section>
            {/* Header Kontrol: Responsif */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Baris Judul & Tombol (Desktop Side-by-Side, Mobile Stacked) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl lg:text-3xl font-black text-navy uppercase tracking-tighter">
                  Your Decks
                </h2>

                {/* Action Group: Search & Button Create */}
                <div className="flex flex-col lg:flex-row items-center gap-3 w-full sm:w-auto">
                  {/* SEARCH BAR: Berada di samping button pada Desktop, Di bawah judul pada Mobile */}
                  <div className="relative w-full sm:w-64 lg:w-80 group order-2 sm:order-1">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue transition-colors"
                      size={18}
                    />
                    <Input
                      placeholder="Search decks..."
                      className="pl-12 h-12 lg:h-14 rounded-2xl border-2 border-navy bg-white shadow-sm ring-1 ring-slate-100 focus-visible:ring-2 focus-visible:ring-blue transition-all w-full"
                    />
                  </div>

                  {/* BUTTON CREATE: Hidden di Mobile (karena sudah ada FAB), Muncul di SM ke atas */}
                  <Button className="hidden lg:flex items-center gap-3 bg-navy text-white px-8! h-12 lg:h-14 rounded-2xl font-black text-[10px] tracking-widest shadow-xl hover:bg-blue transition-all active:scale-95 order-1 sm:order-2 w-full sm:w-auto">
                    <Plus size={16} /> CREATE NEW
                  </Button>
                </div>
              </div>
            </div>

            {/* INFINITE GRID */}
            <InfiniteDeckGrid />
          </section>
        </div>
      </main>
    </div>
  )
}
