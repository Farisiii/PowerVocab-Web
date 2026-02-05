'use client'

import { ShieldAlert, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AccountDangerZoneProps {
  isDeleting: boolean
  handleDelete: () => void
}

export default function AccountDangerZone({
  isDeleting,
  handleDelete,
}: AccountDangerZoneProps) {
  return (
    <div className="mt-10 pt-4">
      <div className="relative group overflow-hidden rounded-3xl border border-red-200/60 bg-white/40 backdrop-blur-md transition-all duration-500 hover:border-red-300 hover:shadow-[0_8px_30px_-10px_rgba(239,68,68,0.2)]">
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />

        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ef4444_1px,transparent_1px)] bg-size-[16px_16px]" />

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-2xl animate-ping opacity-20" />
              <div className="relative w-14 h-14 rounded-2xl border-red-500 bg-red-600 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform duration-500">
                <ShieldAlert size={28} strokeWidth={2} />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-black text-red-950/80 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
                Danger Zone
              </h4>
              <p className="text-xs font-medium text-red-900/40 leading-relaxed max-w-62.5">
                This action is irreversible. All your data will be permanently
                removed.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={handleDelete}
            disabled={isDeleting}
            className="group/btn relative h-12 px-6 rounded-xl overflow-hidden bg-white border border-red-100 text-red-500 shadow-sm transition-all duration-300 hover:bg-red-600 hover:text-white w-full sm:w-auto cursor-pointer"
          >
            <span className="relative z-10 flex items-center font-bold text-xs tracking-[0.15em] uppercase">
              <Trash2 size={16} className="mr-2" />
              Hapus Akun
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
