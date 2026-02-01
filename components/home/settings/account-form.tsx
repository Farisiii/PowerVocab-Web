'use client'

import { useState } from 'react'
import { Check, Loader2, Mail, Settings2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AccountForm({
  name,
  email,
  setName,
  setEmail,
  hasChanges,
}: {
  name: string
  email: string
  setName: (v: string) => void
  setEmail: (v: string) => void
  hasChanges: boolean
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    if (!hasChanges) return
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="glass-card rounded-[3rem] h-full flex flex-col relative overflow-hidden border-[1.5px] border-white/50 shadow-[0_25px_50px_-12px_rgba(15,40,84,0.1)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 relative">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue via-sky to-cyan flex items-center justify-center text-white shadow-lg shadow-blue/20 rotate-3 transition-transform">
          <Settings2 size={28} strokeWidth={2} />
        </div>
        <div>
          <h3 className="font-black text-navy uppercase tracking-[0.15em] text-xl leading-none mb-1">
            Account Details
          </h3>
          <p className="text-sm text-navy/50 font-medium">
            Manage your public profile info
          </p>
        </div>
      </div>

      <div className="space-y-8 flex-1">
        {/* Name */}
        <div className="group/field space-y-3">
          <label className="block text-xs font-extrabold text-navy/40 uppercase tracking-[0.2em] ml-1 transition-colors duration-300 group-focus-within/field:text-blue">
            Full Name
          </label>

          <div className="relative overflow-hidden rounded-2xl bg-white/50 border border-slate-200/50 transition-all duration-300 group-focus-within/field:bg-white group-focus-within/field:border-blue/30 group-focus-within/field:shadow-[0_8px_30px_rgba(28,77,141,0.08)]">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30 transition-all duration-300 group-focus-within/field:text-blue group-focus-within/field:scale-110 z-10">
              <User size={20} strokeWidth={2.5} />
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-16 pl-14 pr-6 bg-transparent font-bold text-navy text-lg outline-none placeholder:text-navy/20 transition-all"
              placeholder="Enter your full name"
            />

            <div className="absolute bottom-0 left-0 w-full h-0.75 bg-linear-to-r from-blue via-cyan to-sky -translate-x-full group-focus-within/field:translate-x-0 transition-transform duration-500 ease-out origin-left" />
          </div>
        </div>

        {/* Email */}
        <div className="group/field space-y-3">
          <label className="block text-xs font-extrabold text-navy/40 uppercase tracking-[0.2em] ml-1 transition-colors duration-300 group-focus-within/field:text-blue">
            Email Address
          </label>

          <div className="relative overflow-hidden rounded-2xl bg-white/50 border border-slate-200/50 transition-all duration-300 group-focus-within/field:bg-white group-focus-within/field:border-blue/30 group-focus-within/field:shadow-[0_8px_30px_rgba(28,77,141,0.08)]">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/30 transition-all duration-300 group-focus-within/field:text-blue group-focus-within/field:scale-110 z-10">
              <Mail size={20} strokeWidth={2.5} />
            </div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-16 pl-14 pr-6 bg-transparent font-bold text-navy text-lg outline-none placeholder:text-navy/20 transition-all"
              placeholder="Enter your email"
            />

            <div className="absolute bottom-0 left-0 w-full h-0.75 bg-linear-to-r from-blue via-cyan to-sky -translate-x-full group-focus-within/field:translate-x-0 transition-transform duration-500 ease-out origin-left" />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-12 pt-8 border-t border-navy/5 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue/30 to-transparent" />

        <Button
          onClick={handleSave}
          disabled={!hasChanges || isLoading}
          className={`group relative w-full rounded-2xl h-16 text-lg tracking-wide overflow-hidden transition-all duration-300 p-0 border-none ${
            hasChanges
              ? 'shadow-[0_10px_30px_rgba(28,77,141,0.2)] hover:shadow-[0_15px_40px_rgba(28,77,141,0.3)] hover:-translate-y-1 active:translate-y-px cursor-pointer bg-transparent'
              : 'bg-slate-200/50 cursor-not-allowed text-slate-400 shadow-none'
          }`}
        >
          {hasChanges && (
            <>
              <div className="absolute inset-0 bg-linear-to-r from-navy via-blue to-sky transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#ffffff,transparent_70%)] transition-opacity duration-500" />
            </>
          )}

          <div
            className={`relative z-10 flex items-center justify-center gap-3 font-black h-full w-full ${
              hasChanges ? 'text-white' : 'text-slate-400'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin h-6 w-6" />
                <span className="tracking-widest uppercase text-sm">
                  Saving...
                </span>
              </div>
            ) : (
              <>
                <Check
                  size={24}
                  strokeWidth={3}
                  className={
                    hasChanges
                      ? 'group-hover:scale-110 transition-transform'
                      : ''
                  }
                />
                <span className="uppercase tracking-widest">
                  {hasChanges ? 'Save Changes' : 'No Changes'}
                </span>
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  )
}
