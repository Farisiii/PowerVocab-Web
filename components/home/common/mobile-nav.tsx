'use client'

import { useState } from 'react'
import { Menu, Plus, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Sidebar } from './sidebar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface MobileNavProps {
  title: string
  userImage?: string | null
  primaryAction?: () => void
}

export function MobileNav({ title, userImage, primaryAction }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Sticky Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-xl supports-backdrop-filter:bg-[#f8fafc]/80 border-b border-slate-200">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* LEFT: Menu & Title */}
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-xl hover:bg-slate-100 transition-all active:scale-90"
                >
                  <Menu size={20} className="text-navy" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 border-none w-72">
                <VisuallyHidden>
                  <SheetTitle>{title} Navigation</SheetTitle>
                </VisuallyHidden>
                <Sidebar isMobile onClose={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <h1 className="text-lg sm:text-xl font-black text-navy uppercase tracking-tight truncate max-w-40">
              {title}
            </h1>
          </div>

          {/* RIGHT: Profile Thumbnail dengan Desain Gradient */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-cyan to-sky p-0.5 shadow-sm ring-2 ring-white"
          >
            <div className="w-full h-full bg-white rounded-[10px] overflow-hidden flex items-center justify-center relative border border-cyan/5">
              {userImage ? (
                <Image
                  src={userImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <User size={18} className="text-navy" />
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* FAB (Floating Action Button) - Muncul hanya jika ada primaryAction & layar < XL */}
      <AnimatePresence>
        {primaryAction && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="xl:hidden fixed bottom-8 right-6 z-50"
          >
            <Button
              onClick={primaryAction}
              size="icon"
              className="w-16 h-16 bg-navy text-white rounded-2xl shadow-[0_15px_30px_rgba(15,23,42,0.3)] hover:bg-blue border-2 border-white/10"
            >
              <Plus size={32} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
