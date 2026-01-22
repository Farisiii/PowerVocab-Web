'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, BookOpen, Settings, LogOut, Zap, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Sidebar({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean
  onClose?: () => void
}) {
  const pathname = usePathname()

  const MENU_ITEMS = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Library', href: '/library' },
    { icon: Zap, label: 'Flashcards', href: '/flashcards' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <aside
      className={`
        flex flex-col bg-white h-full
        ${
          isMobile
            ? 'w-full' // Di mobile, lebar mengikuti kontainer Sheet
            : 'hidden md:flex w-64 lg:w-72 fixed left-0 top-0 border-r border-cyan/10' // Di desktop, baru pakai fixed
        }
        overflow-y-auto no-scrollbar z-50
      `}
    >
      {/* HEADER */}
      <div className="p-6 lg:p-8 shrink-0 flex justify-between items-center border-b border-cyan/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue to-sky flex items-center justify-center shadow-md">
            <Image src="/logo.webp" alt="PowerVocab" width={24} height={24} />
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg lg:text-xl font-black text-navy uppercase tracking-tighter leading-none">
              PowerVocab
            </h1>
            <span className="text-[8px] font-bold text-sky tracking-[0.3em] uppercase mt-1">
              Lexicon Hub
            </span>
          </div>
        </div>

        {/* CLOSE BUTTON MOBILE (X) */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-navy/40 hover:text-navy active:scale-90 transition-transform"
          >
            <X size={24} />
          </Button>
        )}
      </div>

      {/* MENU */}
      <nav className="px-4 lg:px-6 pt-6 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="block"
            >
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-4 h-12 lg:h-14 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-navy text-white shadow-lg shadow-navy/20'
                    : 'text-navy/40 hover:text-navy hover:bg-navy/5'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-cyan' : ''} />
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest">
                  {item.label}
                </span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="px-4 lg:px-6 mt-2 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 text-red-400 hover:text-red-600 hover:bg-red-50 h-12 rounded-2xl"
        >
          <LogOut size={18} />
          <span className="text-[10px] lg:text-xs font-black uppercase tracking-widest">
            Logout
          </span>
        </Button>
      </div>
    </aside>
  )
}
