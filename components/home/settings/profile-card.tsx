'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Camera, Crown, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProfileCard({
  name,
  email,
  isPremium,
}: {
  name: string
  email: string
  isPremium: boolean
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`relative rounded-[3rem] overflow-hidden flex flex-col items-center text-center p-0 pb-8 transition-all duration-500 border-4 ${
        isPremium
          ? 'border-blue/30 shadow-soft-lg'
          : 'border-white/50 shadow-glass'
      }`}
    >
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
      <div className="relative z-10 w-full">
        {/* Banner */}
        <div
          className={`w-full h-48 relative overflow-hidden ${
            isPremium
              ? 'bg-linear-to-br from-navy via-blue to-sky'
              : 'bg-linear-to-br from-slate-200/80 to-slate-300/80'
          }`}
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#ffffff_1px,transparent_0)] bg-size-[20px_20px]" />
          {isPremium && (
            <div className="absolute inset-0 bg-linear-to-br from-sky/20 via-transparent to-cyan/20" />
          )}
          <div
            className={`absolute bottom-0 inset-x-0 h-24 bg-linear-to-t to-transparent ${
              isPremium ? 'from-white/80' : 'from-white/60'
            }`}
          />
        </div>

        {/* Avatar Section */}
        <div className="relative -mt-24 mb-4 flex justify-center">
          {/* Hidden Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Avatar Container */}
          <div className="relative">
            {/* Glow */}
            <div
              className={`absolute inset-0 rounded-full blur-xl scale-110 ${
                isPremium ? 'bg-cyan/40 animate-pulse-slow' : 'bg-slate-300/20'
              }`}
            />

            {/* Clickable Avatar */}
            <div
              onClick={handleAvatarClick}
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 p-1.5 rounded-full bg-white relative z-10 shadow-xl cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <div
                className={`w-full h-full rounded-full overflow-hidden relative border-4 ${isPremium ? 'border-blue/20' : 'border-slate-200'}`}
              >
                <Image
                  src={preview || '/avatar_placeholder.webp'}
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover"
                />

                {/* Hover Overlay (Desktop) */}
                <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Camera className="text-white" size={22} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Camera Button */}
            <Button
              type="button"
              onClick={handleAvatarClick}
              size="icon"
              className="absolute bottom-2 right-2 w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-glass bg-white hover:bg-white text-navy hover:text-blue hover:scale-110 border-2 border-white z-20 p-0 transition-all duration-300"
            >
              <Camera size={18} strokeWidth={2.5} />
            </Button>
          </div>
        </div>

        {/* Name */}
        <h2 className="text-3xl font-black text-navy tracking-tight mb-1 drop-shadow-sm px-4">
          {name || 'Your Name'}
        </h2>

        {/* Email */}
        <div className="flex items-center justify-center gap-2 mb-6 mx-auto w-fit px-5 py-2 rounded-full bg-blue/10 backdrop-blur-sm text-blue text-sm font-bold tracking-wide border border-blue/20">
          <Mail size={14} strokeWidth={2.5} />
          <span className="truncate max-w-50">
            {email || 'email@example.com'}
          </span>
        </div>

        {/* Plan */}
        {isPremium ? (
          <div className="relative overflow-hidden rounded-full group cursor-default inline-block">
            <div className="absolute top-0 -left-full w-[50%] h-full bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] animate-[shimmer_2.5s_infinite_linear]" />
            <div className="relative px-8 py-3 bg-linear-to-r from-blue via-sky to-cyan flex items-center gap-3 shadow-lg shadow-blue/30 rounded-full">
              <Crown size={16} className="text-white" fill="currentColor" />
              <span className="text-xs font-black text-white tracking-[0.25em] uppercase drop-shadow-md">
                Premium Member
              </span>
            </div>
          </div>
        ) : (
          <div className="px-8 py-3 bg-white/60 backdrop-blur-sm border-2 border-slate-200 rounded-full items-center gap-3 shadow-md inline-block">
            <div className="flex items-center gap-2">
              <User size={16} className="text-navy/50" strokeWidth={2.5} />
              <span className="text-xs font-black text-navy/60 tracking-[0.25em] uppercase">
                Free Plan
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
