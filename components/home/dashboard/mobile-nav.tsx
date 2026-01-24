'use client'

import { Menu, Bell, User } from 'lucide-react'
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

export function MobileNav({ title = 'Dashboard' }: { title?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="md:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-xl hover:bg-slate-100"
              >
                <Menu size={20} className="text-navy" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="p-0 border-none w-70">
              <VisuallyHidden>
                <SheetTitle>Navigation</SheetTitle>
              </VisuallyHidden>
              <Sidebar isMobile onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <h1 className="text-lg sm:text-xl font-black text-navy uppercase tracking-tight truncate max-w-40">
            {title}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 rounded-xl text-slate-400"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-cyan to-sky p-0.5">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <User size={18} className="text-navy" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
