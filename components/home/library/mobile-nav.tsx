'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Plus, User } from 'lucide-react'
import { MOCK_USER } from '@/lib/data'
import { Sidebar } from '../sidebar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { useState } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Image from 'next/image'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="md:hidden flex justify-between items-center px-6 py-4 bg-[#f8fafc]/80 backdrop-blur-xl sticky top-0 z-40 border-b border-cyan/5">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 bg-white shadow-sm border-cyan/5 active:scale-90 transition-all"
              >
                <Menu size={20} className="text-navy" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none w-72">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <Sidebar isMobile onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-black text-navy uppercase tracking-tighter">
            Library
          </h1>
        </div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg ring-2 ring-white border border-cyan/10"
        >
          {MOCK_USER.image ? (
            <Image
              src={MOCK_USER.image}
              alt={MOCK_USER.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200">
              <User size={20} />
            </div>
          )}
        </motion.div>
      </header>

      {/* FLOATING ACTION BUTTON */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="lg:hidden fixed bottom-8 right-6 z-50"
      >
        <Button
          size="icon"
          className="w-16 h-16 bg-navy text-white rounded-2xl shadow-[0_15px_30px_rgba(15,23,42,0.3)] hover:bg-blue border-2 border-white/10 flex items-center justify-center"
        >
          <Plus size={32} />
        </Button>
      </motion.div>
    </>
  )
}
