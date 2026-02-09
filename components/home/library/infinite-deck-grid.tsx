'use client'

import { useEffect, useState } from 'react'
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { DeckCard } from './deck-card'
import { DeleteDeckModal } from './delete-deck-modal'
import { Loader2 } from 'lucide-react'
import { MOCK_DECKS } from '@/lib/data'

const ITEMS_PER_PAGE = 6

interface InfiniteDeckGridProps {
  onEditDeck: (id: string) => void
}

const fetchDecks = async ({ pageParam = 1 }) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const start = (pageParam - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  const currentDecks = [...MOCK_DECKS]
  const items = currentDecks.slice(start, end)
  const hasNextPage = end < currentDecks.length
  return { items, nextPage: hasNextPage ? pageParam + 1 : undefined }
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    y: 30,
    transition: { duration: 0.3 },
  },
}

export function InfiniteDeckGrid({ onEditDeck }: InfiniteDeckGridProps) {
  const queryClient = useQueryClient()
  const { ref, inView } = useInView({ threshold: 0.1 })

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    id: string | null
    title: string
  }>({
    isOpen: false,
    id: null,
    title: '',
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['decks-infinite'],
      queryFn: fetchDecks,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return id
    },
    onSuccess: (deletedId) => {
      setDeleteModal((prev) => ({ ...prev, isOpen: false }))
      setTimeout(() => {
        queryClient.setQueryData(['decks-infinite'], (oldData: any) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              items: page.items.filter((item: any) => item.id !== deletedId),
            })),
          }
        })
      }, 350)
    },
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  const handleOpenDelete = (id: string, title: string) => {
    setDeleteModal({ isOpen: true, id, title })
  }

  const handleConfirmDelete = () => {
    if (deleteModal.id) {
      deleteMutation.mutate(deleteModal.id)
    }
  }

  if (status === 'pending') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-80 w-full bg-slate-50 border border-slate-100 rounded-3xl animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="relative min-h-[50vh]">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {data?.pages
              .flatMap((page) => page.items)
              .map((deck: any) => (
                <motion.div
                  key={deck.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full relative"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0] }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 rounded-3xl bg-cyan/20 pointer-events-none"
                  />

                  <DeckCard
                    title={deck.title}
                    words={deck.totalWords}
                    progress={deck.progress}
                    description={deck.description}
                    onDelete={() => handleOpenDelete(deck.id, deck.title)}
                    onEdit={() => onEditDeck(deck.id)}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {data?.pages[0]?.items.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            Deck kosong.
          </div>
        )}
      </div>

      <div
        ref={ref}
        className="pt-20 flex flex-col items-center justify-center w-full"
      >
        {isFetchingNextPage ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 text-navy/20 animate-spin" />
            <p className="text-[10px] font-black text-navy/40 uppercase tracking-widest">
              Loading...
            </p>
          </div>
        ) : (
          !hasNextPage &&
          data &&
          data.pages[0].items.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
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

      <DeleteDeckModal
        isOpen={deleteModal.isOpen}
        deckTitle={deleteModal.title}
        isDeleting={deleteMutation.isPending}
        onClose={() =>
          !deleteMutation.isPending &&
          setDeleteModal((prev) => ({ ...prev, isOpen: false }))
        }
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
