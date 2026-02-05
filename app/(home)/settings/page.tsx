'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Sidebar } from '@/components/home/common/sidebar'
import { MobileNav } from '@/components/home/common/mobile-nav'
import { useScrollbarGutterStable } from '@/components/utils/useScrollbarGutter'
import ProfileCard from '@/components/home/settings/profile-card'
import StatsCard from '@/components/home/settings/stats-card'
import AccountForm from '@/components/home/settings/account-form/account-card'

const INITIAL_DATA = {
  name: 'Alex Morgan',
  email: 'alex.morgan@powervocab.com',
}

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

export default function SettingsPage() {
  useScrollbarGutterStable()

  const isPremium = true

  const [name, setName] = useState(INITIAL_DATA.name)
  const [email, setEmail] = useState(INITIAL_DATA.email)

  const hasChanges = name !== INITIAL_DATA.name || email !== INITIAL_DATA.email

  return (
    <div className="flex min-h-screen bg-linear-to-br from-white via-[#eaf4fb] to-cyan items-start selection:bg-cyan/30 relative">
      <div className="hidden lg:block z-20">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0 relative z-10">
        <MobileNav title="Settings" />

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
                  Settings
                </h1>
                <div className="flex items-center gap-2 mt-4 ml-1">
                  <div className="h-1 w-12 bg-linear-to-r from-blue to-cyan rounded-full" />
                  <p className="text-sm font-bold text-navy/60 tracking-[0.3em] uppercase">
                    Personalize Your Experience
                  </p>
                </div>
              </div>
            </motion.header>

            {/* GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative">
              {/* LEFT */}
              <motion.div
                variants={itemVariants}
                className="xl:col-span-5 flex flex-col gap-6"
              >
                <ProfileCard name={name} email={email} isPremium={isPremium} />
                <StatsCard isPremium={isPremium} />
              </motion.div>

              {/* RIGHT */}
              <motion.div
                variants={itemVariants}
                className="xl:col-span-7 h-full"
              >
                <AccountForm
                  name={name}
                  email={email}
                  setName={setName}
                  setEmail={setEmail}
                  hasChanges={hasChanges}
                />
              </motion.div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  )
}
