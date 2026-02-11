'use client'

import { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { Sidebar } from '@/components/home/common/sidebar'
import { MobileNav } from '@/components/home/common/mobile-nav'
import { ProgressCard } from '@/components/home/library/progress-card'
import { InfiniteDeckGrid } from '@/components/home/library/infinite-deck-grid'
import { DeckModal } from '@/components/home/library/deck-modal/deck-modal'
import { Search, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useScrollbarGutterStable } from '@/components/utils/useScrollbarGutter'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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

export default function LibraryPage() {
  useScrollbarGutterStable()

  const router = useRouter()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null)

  const queryClient = useQueryClient()

  const handleSaveDeck = (savedDeck: any) => {
    queryClient.setQueryData(['decks-infinite'], (oldData: any) => {
      if (!oldData) {
        return {
          pages: [
            {
              items: [savedDeck],
              nextPage: undefined,
            },
          ],
          pageParams: [1],
        }
      }
      const isEditing = oldData.pages.some((page: any) =>
        page.items.find((item: any) => item.id === savedDeck.id),
      )

      if (isEditing) {
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            items: page.items.map((item: any) =>
              item.id === savedDeck.id ? savedDeck : item,
            ),
          })),
        }
      } else {
        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) =>
            index === 0 ? { ...page, items: [savedDeck, ...page.items] } : page,
          ),
        }
      }
    })

    setIsCreateModalOpen(false)
    setSelectedDeckId(null)
  }

  useEffect(() => {
    if (isCreateModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCreateModalOpen])

  const handleEditClick = (id: string) => {
    setSelectedDeckId(id)
    setIsCreateModalOpen(true)
  }

  const handleAddDesktop = () => {
    setSelectedDeckId(null)
    setIsCreateModalOpen(true)
  }

  const handleAddMobile = () => {
    router.push('/library/create/deck')
  }

  return (
    <div className="flex min-h-screen bg-linear-to-br from-white via-[#eaf4fb] to-cyan items-start selection:bg-cyan/30 relative">
      <div className="hidden lg:block z-20">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        <MobileNav title="Library" primaryAction={handleAddMobile} />

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
                  Library
                </h1>

                <div className="flex items-center gap-2 mt-4 ml-1">
                  <div className="h-1 w-12 bg-linear-to-r from-blue to-cyan rounded-full" />
                  <p className="text-sm font-bold text-navy/60 tracking-[0.3em] uppercase">
                    Advanced Vocabulary Hub
                  </p>
                </div>
              </div>
            </motion.header>

            {/* Continue Learning */}
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

            {/* All Decks */}
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

                    <Button
                      onClick={handleAddDesktop}
                      className="hidden xl:flex items-center gap-3 bg-navy text-white px-10 h-16 rounded-2xl font-black text-xs tracking-widest shadow-xl md:hover:bg-blue transition-all active:scale-95 order-1 sm:order-2 w-full lg:w-auto cursor-pointer"
                    >
                      <Plus size={18} strokeWidth={3} /> CREATE NEW
                    </Button>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <InfiniteDeckGrid onEditDeck={handleEditClick} />
              </motion.div>
            </section>
          </div>
        </motion.main>
      </div>

      <DeckModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveDeck}
        editDeckId={selectedDeckId}
      />
    </div>
  )
}
