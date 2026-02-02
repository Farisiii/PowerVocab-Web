'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

const MenuToggle = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="w-6 h-6 flex flex-col justify-center items-center gap-1.25"
    >
      <motion.span
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: 45, y: 7 },
        }}
        className="w-5 h-[2.5px] bg-navy rounded-full origin-center block"
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.span
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        className="w-5 h-[2.5px] bg-navy rounded-full block"
        transition={{ duration: 0.2 }}
      />
      <motion.span
        variants={{
          closed: { rotate: 0, y: 0 },
          open: { rotate: -45, y: -8 },
        }}
        className="w-5 h-[2.5px] bg-navy rounded-full origin-center block"
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.div>
  )
}

interface MobileNavProps {
  title: string
  primaryAction?: () => void
}

export function MobileNav({ title, primaryAction }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-xl supports-backdrop-filter:bg-[#f8fafc]/80 border-b border-slate-200">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="grid grid-cols-3 items-center w-full">
            <div className="w-10 h-10" />
            <h1 className="text-xl sm:text-2xl font-black text-navy uppercase tracking-tight truncate w-full flex justify-center">
              {title}
            </h1>
            <div className="w-10 h-10" />
          </div>
        </div>
      </header>

      <motion.div
        className="lg:hidden fixed top-3 right-4 sm:right-6 z-60"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-xl md:hover:bg-slate-100 transition-all active:scale-90 relative"
        >
          <div className="relative z-10">
            <MenuToggle isOpen={open} />
          </div>
        </Button>
      </motion.div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 border-none w-72">
          <VisuallyHidden>
            <SheetTitle>{title} Navigation</SheetTitle>
          </VisuallyHidden>
          <Sidebar isMobile onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <AnimatePresence>
        {primaryAction && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="xl:hidden fixed bottom-8 right-6 z-10"
          >
            <Button
              onClick={primaryAction}
              className="w-16 h-16 bg-navy text-white rounded-2xl shadow-[0_15px_30px_rgba(15,23,42,0.3)] md:hover:bg-blue border-2 border-white/10 flex items-center justify-center p-0"
            >
              <Plus size={40} strokeWidth={2.5} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
