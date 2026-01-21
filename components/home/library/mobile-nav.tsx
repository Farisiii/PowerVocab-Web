'use client'

import { Menu, Plus } from 'lucide-react'
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

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* TOP MOBILE HEADER */}
      <header className="md:hidden flex justify-between items-center px-6 py-4 bg-[#f8fafc]/80 backdrop-blur-xl sticky top-0 z-40 border-b border-cyan/5">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 bg-white shadow-sm border-cyan/5"
              >
                <Menu size={20} className="text-navy" />
              </Button>
            </SheetTrigger>

            {/* SIDEBAR SHEET */}
            <SheetContent side="left" className="p-0 border-none w-72">
              {/* ACCESSIBILITY REQUIRED BY RADIX */}
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>

              {/* PASS onClose SO X BUTTON & MENU CAN CLOSE */}
              <Sidebar isMobile onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <h1 className="text-base font-black text-navy uppercase tracking-tighter">
            Library
          </h1>
        </div>

        {/* USER AVATAR */}
        <div className="w-9 h-9 rounded-lg bg-linear-to-br from-blue to-sky flex items-center justify-center text-[10px] font-black text-white shadow-md">
          {MOCK_USER.name.substring(0, 2).toUpperCase()}
        </div>
      </header>

      {/* FLOATING ACTION BUTTON (ADD DECK) */}
      <Button
        size="icon"
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-navy text-white rounded-2xl shadow-soft-lg z-50 hover:bg-blue border-2 border-white/10"
      >
        <Plus size={28} />
      </Button>
    </>
  )
}
