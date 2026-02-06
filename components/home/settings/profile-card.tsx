'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Camera, Crown, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UpgradeModal } from '@/components/home/settings/upgrade-modal'

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
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)

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
    <>
      <div
        className={`group relative w-full rounded-[3rem] overflow-hidden flex flex-col items-center text-center pb-10 transition-all duration-500 border-4 ${
          isPremium
            ? 'border-white/40 shadow-[0_20px_60px_-15px_rgba(15,40,84,0.3)]'
            : 'border-white/60 shadow-xl'
        }`}
      >
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply animate-pulse-slow" />
          <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] bg-cyan-100/40 rounded-full blur-[80px] mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0f2854_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute inset-0 backdrop-blur-[2px] bg-white/30" />

        {/* CONTENT */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="relative w-full h-56 overflow-hidden">
            <div
              className={`absolute inset-0 ${
                isPremium
                  ? 'bg-linear-to-b from-blue-400 via-blue-200 to-white'
                  : 'bg-linear-to-b from-slate-300 via-slate-100 to-white'
              }`}
            />
            {isPremium && (
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.8),transparent_70%)]" />
            )}
            <div className="absolute bottom-0 w-full leading-0 drop-shadow-sm z-10 text-navy">
              <svg
                className="w-full h-auto relative block scale-105"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
              >
                <path
                  fill="currentColor"
                  fillOpacity="1"
                  d="M0,128L13.3,138.7C26.7,149,53,171,80,176C106.7,181,133,171,160,186.7C186.7,203,213,245,240,229.3C266.7,213,293,139,320,117.3C346.7,96,373,128,400,128C426.7,128,453,96,480,112C506.7,128,533,192,560,197.3C586.7,203,613,149,640,117.3C666.7,85,693,75,720,96C746.7,117,773,171,800,186.7C826.7,203,853,181,880,176C906.7,171,933,181,960,197.3C986.7,213,1013,235,1040,213.3C1066.7,192,1093,128,1120,128C1146.7,128,1173,192,1200,208C1226.7,224,1253,192,1280,186.7C1306.7,181,1333,203,1360,192C1386.7,181,1413,139,1427,117.3L1440,96L1440,320L0,320Z"
                ></path>
              </svg>
            </div>
          </div>

          {/* AVATAR */}
          <div className="relative -mt-28 mb-4 flex justify-center w-full z-20">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="relative group/avatar">
              <div
                className={`absolute -inset-1 rounded-full blur-md transition-all duration-500 ${
                  isPremium ? 'bg-white/40' : 'bg-black/5'
                }`}
              />
              <div
                onClick={handleAvatarClick}
                className={`relative w-36 h-36 md:w-40 md:h-40 rounded-full border-[6px] border-white shadow-2xl cursor-pointer overflow-hidden transition-transform duration-300 group-hover/avatar:scale-[1.02] active:scale-95 bg-white`}
              >
                <Image
                  src={preview || '/avatar_placeholder.webp'}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 144px, 160px"
                />
                <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px] opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera
                    className="text-white drop-shadow-md"
                    size={28}
                    strokeWidth={2}
                  />
                </div>
              </div>
              <Button
                type="button"
                onClick={handleAvatarClick}
                size="icon"
                className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white text-navy hover:bg-blue-50 hover:text-blue-600 shadow-lg border-2 border-navy/10 transition-all duration-300 hover:scale-110"
              >
                <Camera size={18} strokeWidth={2.5} />
              </Button>
            </div>
          </div>

          {/* INFO & BUTTON */}
          <div className="px-6 w-full flex flex-col items-center gap-1">
            <h2 className="text-3xl font-black text-navy tracking-tight mb-2 drop-shadow-sm">
              {name || 'Your Name'}
            </h2>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/5 text-navy/70 text-sm font-bold tracking-wide mb-6 border border-navy/10">
              <Mail size={14} strokeWidth={2.5} />
              <span className="truncate max-w-50">
                {email || 'email@example.com'}
              </span>
            </div>

            {/* BUTTONS AREA */}
            {isPremium ? (
              <div className="relative group/badge cursor-default">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-25 group-hover/badge:opacity-50 transition duration-500" />
                <div className="relative h-12 w-48 border-2 border-transparent bg-navy flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 rounded-full transition-transform hover:-translate-y-0.5">
                  <Crown
                    size={18}
                    className="text-yellow-400 animate-pulse"
                    fill="currentColor"
                  />
                  <span className="text-xs font-black text-white tracking-[0.2em] uppercase">
                    Premium Member
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="group/plan relative h-12 w-48 bg-white border-2 border-slate-100 rounded-full shadow-sm hover:shadow-lg hover:shadow-blue/20 hover:border-blue hover:bg-linear-to-br from-navy via-blue to-sky transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 group-hover/plan:-translate-y-full">
                  <User
                    size={16}
                    strokeWidth={2.5}
                    className="text-slate-400"
                  />
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-slate-500">
                    Free Plan
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover/plan:translate-y-0">
                  <span className="text-xs font-black tracking-[0.2em] uppercase text-white">
                    Upgrade Now
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </>
  )
}
