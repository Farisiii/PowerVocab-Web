'use client'

import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { DeckCard } from './deck-card'
import { Loader2 } from 'lucide-react'
import { MOCK_DECKS } from '@/lib/data'

/* Fetch Logic */
const fetchDecks = async ({ pageParam = 1 }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const ITEMS_PER_PAGE = 3
  const start = (pageParam - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const items = MOCK_DECKS.slice(start, end)
  const hasNextPage = end < MOCK_DECKS.length
  return { items, nextPage: hasNextPage ? pageParam + 1 : undefined }
}

/* Variants */
const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

export function InfiniteDeckGrid() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['decks-infinite'],
      queryFn: fetchDecks,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  /* Loading State */
  if (status === 'pending') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-65 w-full bg-slate-50 border border-slate-100 rounded-3xl animate-pulse"
          />
        ))}
      </div>
    )
  }

  /* Empty State */
  if (status === 'success' && data.pages[0].items.length === 0) {
    return <div className="text-center py-20 opacity-50">No decks found.</div>
  }

  return (
    <>
      {/* Deck Grid List */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {data?.pages.map((page) =>
            page.items.map((deck: any) => (
              <motion.div
                key={deck.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <DeckCard
                  title={deck.title}
                  words={deck.totalWords}
                  progress={deck.progress}
                  description={deck.description}
                />
              </motion.div>
            )),
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pagination Observer */}
      <div
        ref={ref}
        className="pt-20 flex flex-col items-center justify-center w-full"
      >
        {isFetchingNextPage ? (
          /* Loading Indicator */
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-navy/20 animate-spin" />
            <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest">
              Loading...
            </p>
          </div>
        ) : (
          /* End State */
          !hasNextPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-8 bg-navy" />
              <span className="text-[9px] font-black text-navy uppercase tracking-[0.3em]">
                End of Collection
              </span>
              <div className="h-px w-8 bg-navy" />
            </motion.div>
          )
        )}
      </div>
    </>
  )
}
