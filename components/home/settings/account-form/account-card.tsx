'use client'

import { useState } from 'react'
import { Check, Loader2, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AccountFormFields from './account-form-fields'
import AccountDangerZone from './account-danger-zone'

export default function AccountCard({
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
  const [isDeleting, setIsDeleting] = useState(false)

  // State Error
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  // --- VALIDATION LOGIC YANG LEBIH PINTAR ---
  const validate = () => {
    const newErrors: { name?: string; email?: string } = {}
    let isValid = true

    // Validasi Nama
    if (!name.trim()) {
      newErrors.name = 'Full Name is required' // Pesan spesifik
      isValid = false
    } else if (name.length < 3) {
      newErrors.name = 'Name is too short (min 3 chars)' // Pesan spesifik
      isValid = false
    }

    // Validasi Email yang Lebih Informatif
    if (!email.trim()) {
      newErrors.email = 'Email address is required'
      isValid = false
    } else if (!email.includes('@')) {
      newErrors.email = 'Email must contain "@"'
      isValid = false
    } else {
      // Cek format umum
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        // Cek kasus spesifik biar user paham
        if (email.endsWith('@')) {
          newErrors.email = 'Missing domain name after "@"'
        } else if (!email.includes('.')) {
          newErrors.email = 'Email is missing a domain (e.g .com)'
        } else {
          newErrors.email = 'Invalid email format'
        }
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSave = () => {
    if (!validate()) return
    if (!hasChanges) return
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleDelete = () => {
    if (confirm('Yakin ingin menghapus akun? Data tidak dapat dikembalikan.')) {
      setIsDeleting(true)
      setTimeout(() => {
        setIsDeleting(false)
        alert('Akun telah dihapus.')
      }, 2000)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (errors.name) setErrors({ ...errors, name: undefined })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (errors.email) setErrors({ ...errors, email: undefined })
  }

  return (
    // Container utama
    <div className="relative rounded-[2.5rem] md:rounded-[3rem] h-full flex flex-col overflow-hidden border-4 border-white/50 shadow-xl p-6 md:p-12 transition-all duration-300">
      <div className="absolute inset-0 bg-white" />
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute -top-12 -left-12 w-48 h-48 lg:w-60 lg:h-60 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-40 h-40 lg:w-52 lg:h-52 bg-blue/15 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 left-1/4 w-44 h-44 lg:w-56 lg:h-56 bg-cyan/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 lg:w-72 lg:h-72 bg-linear-to-br from-sky/10 to-blue/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.8),transparent_50%)]"
          style={{ backgroundSize: '30px 30px' }}
        />
      </div>

      <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(28,77,141,0.03)_100%)]" />
      <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_2px_20px_rgba(28,77,141,0.1)]" />

      {/* --- CONTENT --- */}
      <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10 relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-950 via-blue-800 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20 rotate-3 transition-transform hover:rotate-6 hover:scale-110 shrink-0">
            <Settings2 size={28} strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-black text-blue-950 uppercase tracking-[0.15em] text-xl leading-none mb-1.5">
              Account Details
            </h3>
            <p className="text-sm text-blue-900/60 font-bold tracking-wide">
              Manage your public profile info
            </p>
          </div>
        </div>

        {/* --- 1. FORM FIELDS COMPONENT --- */}
        <AccountFormFields
          name={name}
          email={email}
          errors={errors}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
        />

        {/* --- 2. DANGER ZONE COMPONENT --- */}
        <AccountDangerZone
          isDeleting={isDeleting}
          handleDelete={handleDelete}
        />

        {/* SAVE BUTTON (FOOTER) */}
        <div className="mt-8 pt-6 sm:mt-10 sm:pt-8 border-t border-blue-900/5 relative flex flex-col sm:flex-row sm:justify-end">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900/20 to-transparent" />

          <Button
            onClick={handleSave}
            disabled={!hasChanges || isLoading}
            className={`group relative w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold tracking-wide overflow-hidden transition-all duration-300 border-none ring-0 focus:ring-0 ${
              hasChanges
                ? 'shadow-md hover:shadow-[0_10px_40px_rgba(15,40,84,0.2)] hover:-translate-y-0.5 active:translate-y-px cursor-pointer bg-transparent'
                : 'bg-slate-100 cursor-not-allowed text-slate-400 shadow-none'
            }`}
          >
            {hasChanges && (
              <>
                {/* Gradient Background */}
                <div className="absolute inset-0 btn-modern" />
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#ffffff,transparent_70%)] transition-opacity duration-500" />
              </>
            )}

            {/* Content Wrapper */}
            <div
              className={`relative z-10 flex items-center justify-center gap-2.5 sm:gap-3 h-full px-6 ${
                hasChanges ? 'text-white drop-shadow-sm' : 'text-slate-400'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="tracking-wider uppercase text-xs sm:text-sm">
                    Saving...
                  </span>
                </>
              ) : (
                <>
                  <Check
                    strokeWidth={3}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      hasChanges
                        ? 'group-hover:scale-110 transition-transform'
                        : ''
                    }`}
                  />
                  <span className="uppercase tracking-widest text-xs sm:text-sm">
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
