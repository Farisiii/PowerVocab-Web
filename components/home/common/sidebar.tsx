'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutGrid, BookOpen, Settings, LogOut, Gamepad2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

export function Sidebar({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean
  onClose?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  const MENU_ITEMS = [
    { icon: BookOpen, label: 'Library', href: '/library' },
    { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
    { icon: Gamepad2, label: 'Games', href: '/games' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <aside
      className={`flex flex-col bg-white h-full ${isMobile ? 'w-full' : 'hidden md:flex w-64 lg:w-72 fixed left-0 top-0 border-r border-cyan/10'} overflow-y-auto no-scrollbar z-12`}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 lg:p-8 shrink-0 flex justify-between items-center border-b border-cyan/5"
      >
        <div className="flex items-center gap-3">
          <div className="lg:hidden w-10 h-10 rounded-xl bg-linear-to-br from-blue to-sky flex items-center justify-center shadow-md">
            <Image src="/logo.webp" alt="PowerVocab" width={24} height={24} />
          </div>
          <div className="hidden lg:flex w-12 h-12 rounded-xl bg-linear-to-br from-blue to-sky items-center justify-center shadow-md">
            <Image src="/logo.webp" alt="PowerVocab" width={32} height={32} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg lg:text-2xl font-black text-navy uppercase tracking-tighter leading-none">
              PowerVocab
            </h1>
            <span className="text-[8px] lg:text-[10px] font-bold text-sky tracking-[0.3em] uppercase mt-1">
              Lexicon Hub
            </span>
          </div>
        </div>
      </motion.div>

      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 lg:px-6 pt-6 space-y-2"
      >
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="block"
            >
              <motion.div variants={itemVariants}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-4 h-12 lg:h-14 rounded-2xl transition-all duration-300 ${isActive ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'text-navy/40 hover:text-navy hover:bg-navy/5'}`}
                >
                  <item.icon
                    size={18}
                    className={isActive ? 'text-cyan' : ''}
                  />
                  <span className="text-[12px] lg:text-xs font-black uppercase tracking-widest">
                    {item.label}
                  </span>
                </Button>
              </motion.div>
            </Link>
          )
        })}
      </motion.nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-4 lg:px-6 mt-2 space-y-2"
      >
        <Button
          variant="ghost"
          className="w-full justify-start gap-4 text-red-400 hover:text-red-600 hover:bg-red-50 h-12 rounded-2xl"
          onClick={() => router.push('/sign-in')}
        >
          <LogOut size={18} />
          <span className="text-[12px] lg:text-xs font-black uppercase tracking-widest">
            Logout
          </span>
        </Button>
      </motion.div>
    </aside>
  )
}
