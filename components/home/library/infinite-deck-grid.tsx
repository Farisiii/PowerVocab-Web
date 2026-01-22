'use client'

import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { DeckCard } from './deck-card'
import { Loader2 } from 'lucide-react'

const fetchDecks = async ({ pageParam = 1 }) => {
  const res = await fetch(`/api/decks?page=${pageParam}`)
  if (!res.ok) throw new Error('Network error')
  return res.json()
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
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
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

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

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {data?.pages.map((page) =>
            page.items.map((deck: any) => (
              <motion.div
                key={deck.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <DeckCard {...deck} />
              </motion.div>
            )),
          )}
        </AnimatePresence>
      </div>

      <div
        ref={ref}
        className="py-20 flex flex-col items-center justify-center w-full"
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-navy/20 animate-spin" />
            <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest">
              Loading...
            </p>
          </div>
        ) : (
          !hasNextPage && (
            <div className="flex items-center gap-4 opacity-10">
              <div className="h-px w-8 bg-navy" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                End of Collection
              </span>
              <div className="h-px w-8 bg-navy" />
            </div>
          )
        )}
      </div>
    </>
  )
}
