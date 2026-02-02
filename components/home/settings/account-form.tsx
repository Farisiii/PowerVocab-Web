'use client'

import { useState } from 'react'
import { Check, Loader2, Mail, Settings2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    <div className="relative rounded-[3rem] h-full flex flex-col overflow-hidden border-4 border-white/50 shadow-soft-lg p-6 md:p-12">
      {/* Glass Effect Layers */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0">
        <div className="absolute -top-12 -left-12 w-48 h-48 lg:w-60 lg:h-60 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-40 h-40 lg:w-52 lg:h-52 bg-blue/15 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 left-1/4 w-44 h-44 lg:w-56 lg:h-56 bg-cyan/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 lg:w-72 lg:h-72 bg-linear-to-br from-sky/10 to-blue/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.8),transparent_50%)]"
          style={{ backgroundSize: '30px 30px' }}
        />
      </div>
      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(28,77,141,0.03)_100%)]" />
      <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.1)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 relative">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue via-sky to-cyan flex items-center justify-center text-white shadow-lg shadow-blue/20 rotate-3 transition-transform hover:rotate-6 hover:scale-110">
            <Settings2 size={28} strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-black text-navy uppercase tracking-[0.15em] text-xl leading-none mb-1">
              Account Details
            </h3>
            <p className="text-sm text-navy/60 font-medium">
              Manage your public profile info
            </p>
          </div>
        </div>

        <div className="space-y-8 flex-1">
          {/* Name */}
          <div className="group/field space-y-3">
            <Label
              htmlFor="name"
              className="block text-xs font-extrabold text-navy/50 uppercase tracking-[0.2em] ml-1 transition-colors duration-300 group-focus-within/field:text-blue"
            >
              Full Name
            </Label>

            <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-slate-200 transition-all duration-300 group-focus-within/field:bg-white group-focus-within/field:border-blue/40 group-focus-within/field:shadow-glass">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/40 transition-all duration-300 group-focus-within/field:text-blue group-focus-within/field:scale-110 z-10 pointer-events-none">
                <User size={20} strokeWidth={2.5} />
              </div>

              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-16 pl-14 pr-6 bg-transparent font-bold text-navy text-lg border-none outline-none placeholder:text-navy/30 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your full name"
              />

              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue via-sky to-cyan -translate-x-full group-focus-within/field:translate-x-0 transition-transform duration-500 ease-out origin-left" />
            </div>
          </div>

          {/* Email */}
          <div className="group/field space-y-3">
            <Label
              htmlFor="email"
              className="block text-xs font-extrabold text-navy/50 uppercase tracking-[0.2em] ml-1 transition-colors duration-300 group-focus-within/field:text-blue"
            >
              Email Address
            </Label>

            <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-slate-200 transition-all duration-300 group-focus-within/field:bg-white group-focus-within/field:border-blue/40 group-focus-within/field:shadow-glass">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-navy/40 transition-all duration-300 group-focus-within/field:text-blue group-focus-within/field:scale-110 z-10 pointer-events-none">
                <Mail size={20} strokeWidth={2.5} />
              </div>

              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-16 pl-14 pr-6 bg-transparent font-bold text-navy text-lg border-none outline-none placeholder:text-navy/30 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your email"
              />

              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue via-sky to-cyan -translate-x-full group-focus-within/field:translate-x-0 transition-transform duration-500 ease-out origin-left" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-12 pt-8 border-t border-navy/10 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue/40 to-transparent" />

          <Button
            onClick={handleSave}
            disabled={!hasChanges || isLoading}
            className={`group relative w-full rounded-2xl h-16 text-lg tracking-wide overflow-hidden transition-all duration-300 p-0 border-none ${
              hasChanges
                ? 'shadow-soft-lg hover:shadow-[0_20px_50px_rgba(28,77,141,0.25)] hover:-translate-y-1 active:translate-y-px cursor-pointer bg-transparent'
                : 'bg-slate-100 cursor-not-allowed text-slate-400 shadow-none'
            }`}
          >
            {hasChanges && (
              <>
                <div className="absolute inset-0 bg-linear-to-r from-navy via-blue to-sky transition-all duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#ffffff,transparent_70%)] transition-opacity duration-500" />
                <div className="absolute inset-0 bg-linear-to-br from-sky/20 via-transparent to-cyan/20 opacity-40" />
              </>
            )}

            <div
              className={`relative z-10 flex items-center justify-center gap-3 font-black h-full w-full ${
                hasChanges
                  ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
                  : 'text-slate-400'
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
    </div>
  )
}
