import { Sidebar } from '@/components/home/sidebar'
import { MobileNav } from '@/components/home/library/mobile-nav'
import { ProgressCard } from '@/components/home/library/progress-card'
import { DeckCard } from '@/components/home/library/deck-card'
import { MOCK_DECKS } from '@/lib/data'
import { Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LibraryPage() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc] items-start selection:bg-cyan/30 overflow-x-hidden">
      {/* Sidebar tetap di kiri (Desktop) */}
      <Sidebar />

      <main className="flex-1 w-full md:pl-64 lg:pl-72 relative">
        {/* Navigasi Mobile (Hamburger & Title) */}
        <MobileNav />

        <div className="px-5 sm:px-8 md:px-10 lg:px-16 py-6 md:py-12 pb-32 md:pb-12">
          {/* HEADER DESKTOP */}
          <header className="hidden md:flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-6xl font-black text-navy tracking-tighter leading-none">
                Library
              </h1>
              <p className="text-[10px] font-bold text-sky tracking-[0.4em] uppercase opacity-60">
                Advanced Vocabulary Hub
              </p>
            </div>

            <div className="relative w-full max-w-sm group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue transition-colors"
                size={18}
              />
              <Input
                placeholder="Search decks..."
                className="pl-12 h-14 rounded-2xl border-none bg-white shadow-sm ring-2 ring-blue/30 focus-visible:ring-2 focus-visible:ring-blue transition-all"
              />
            </div>
          </header>

          {/* SEARCH MOBILE (Hanya muncul di HP) */}
          <div className="md:hidden mb-8">
            <div className="relative w-full">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={16}
              />
              <Input
                placeholder="Search decks..."
                className="pl-11 h-12 rounded-xl border-none bg-white shadow-sm ring-1 ring-slate-100"
              />
            </div>
          </div>

          {/* SECTION: CONTINUE LEARNING */}
          <section className="mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-6 bg-blue rounded-full shadow-lg" />
              <h3 className="font-black text-navy uppercase tracking-[0.3em] text-[10px]">
                Continue Learning
              </h3>
            </div>
            <ProgressCard />
          </section>

          {/* SECTION: YOUR DECKS */}
          <section>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-black text-navy uppercase tracking-tighter">
                Your Decks
              </h2>
              {/* Button Create (Desktop & Tablet) */}
              <Button className="hidden sm:flex items-center gap-3 bg-navy text-white px-8! h-12 rounded-2xl font-black text-[10px] tracking-widest shadow-xl hover:bg-blue transition-all active:scale-95">
                <Plus size={16} /> CREATE NEW
              </Button>
            </div>

            {/* GRID DECKS: Perbaikan responsivitas grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {MOCK_DECKS.map((deck) => (
                <DeckCard key={deck.id} {...deck} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-16 md:mt-24">
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-xl hover:bg-white active:scale-90"
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                size="icon"
                className="w-10 h-10 rounded-xl font-black bg-navy text-white shadow-lg"
              >
                1
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-xl font-black text-navy/30 hover:text-navy"
              >
                2
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-xl font-black text-navy/30 hover:text-navy"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-xl hover:bg-white active:scale-90"
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </section>
        </div>

        {/* MOBILE BOTTOM BAR: Muncul di HP saja */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-center sm:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
          <Button className="w-full flex items-center justify-center gap-3 bg-navy text-white h-14 rounded-2xl font-black text-xs tracking-[0.2em] shadow-2xl active:scale-95 transition-all sm:hidden">
            <Plus size={20} /> CREATE NEW DECK
          </Button>
        </div>
      </main>
    </div>
  )
}
