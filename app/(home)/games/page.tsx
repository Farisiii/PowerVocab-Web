'use client'

import { motion, Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/home/common/sidebar'
import { MobileNav } from '@/components/home/common/mobile-nav'
import { GameCard } from '@/components/home/games/game-card'
import { useScrollbarGutterStable } from '@/components/utils/useScrollbarGutter'
import BackgroundAmbience from '@/components/home/common/background-ambience'

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

export default function GamesPage() {
  useScrollbarGutterStable()
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-[#f8fafc] items-start selection:bg-cyan/30 relative">
      <BackgroundAmbience />

      <div className="hidden lg:block z-20">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        <MobileNav title="Games" />

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
                  Arcade Mode
                </h1>

                <div className="flex items-center gap-2 mt-4 ml-1">
                  <div className="h-1 w-12 bg-linear-to-r from-blue to-cyan rounded-full" />
                  <p className="text-sm font-bold text-navy/60 tracking-[0.3em] uppercase">
                    Interactive Vocabulary Arcade
                  </p>
                </div>
              </div>
            </motion.header>

            <motion.section variants={itemVariants} className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 md:gap-4 mb-8">
                <div className="w-1.5 md:w-3 h-6 md:h-10 bg-blue rounded-full shadow-lg shadow-blue/20" />
                <h3 className="font-black text-navy uppercase tracking-[0.2em] text-sm md:text-lg">
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
