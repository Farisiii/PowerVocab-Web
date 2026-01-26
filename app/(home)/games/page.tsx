'use client'

import { motion, Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/home/common/sidebar'
import { MobileNav } from '@/components/home/common/mobile-nav'
import { GameCard } from '@/components/home/games/game-card'
import { useScrollbarGutterStable } from '@/components/utils/useScrollbarGutter'

const GAMES = [
  {
    title: 'Flashcard',
    description:
      'Master new words through spaced repetition and visual memory cues.',
    image: '/flashcard.webp',
    slug: 'flashcard',
  },
  {
    title: 'Fill in the Blanks',
    description:
      'AI-generated contextual sentences to complete for deeper understanding.',
    image: '/fillblank.webp',
    slug: 'fill-in-the-blanks',
  },
  {
    title: 'Multiple Choice',
    description:
      'Test your speed with quick translation and definition challenges.',
    image: '/multiplechoice.webp',
    slug: 'multiple-choice',
  },
  {
    title: 'Listening Game',
    description:
      'Sharpen your pronunciation and auditory skills with native audio.',
    image: '/listening.webp',
    slug: 'listening-game',
  },
]

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

export default function GamesPage() {
  useScrollbarGutterStable()
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-[#f8fafc] items-start selection:bg-cyan/30">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <MobileNav title="Games" />

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:pl-72 relative min-w-0"
        >
          <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-6 md:py-12 pb-12 md:pb-12">
            <motion.header
              variants={itemVariants}
              className="hidden lg:block mb-14"
            >
              <h1 className="flex justify-center text-5xl lg:text-6xl font-black text-navy tracking-tighter uppercase leading-[0.9]">
                Arcade Mode
              </h1>
              <p className="flex justify-center text-xs md:text-sm font-bold text-sky tracking-[0.4em] uppercase opacity-70 mt-3 ml-1">
                Interactive Vocabulary Arcade
              </p>
            </motion.header>

            <motion.section variants={itemVariants} className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 md:gap-4 mb-8">
                <div className="w-1.5 md:w-3 h-6 md:h-10 bg-blue rounded-full shadow-lg shadow-blue/20" />
                <h3 className="font-black text-navy uppercase tracking-[0.2em] text-xs md:text-lg">
                  Select Game Challenge
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 md:gap-8">
                {GAMES.map((game) => (
                  <GameCard
                    key={game.slug}
                    title={game.title}
                    description={game.description}
                    image={game.image}
                    onPlay={() => router.push(`/${game.slug}`)}
                  />
                ))}
              </div>
            </motion.section>
          </div>
        </motion.main>
      </div>
    </div>
  )
}
