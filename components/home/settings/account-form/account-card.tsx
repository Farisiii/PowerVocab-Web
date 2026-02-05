'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Check, Loader2, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AccountFormFields from './account-form-fields'
import AccountDangerZone from './account-danger-zone'
import { DeleteAccountModal } from '../delete-account-modal'

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
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {}
    let isValid = true

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi'
      isValid = false
    } else if (name.length < 3) {
      newErrors.name = 'Nama terlalu pendek (min 3 karakter)'
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi'
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        newErrors.email = 'Format email tidak valid'
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

  const handleDeleteTrigger = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      setShowDeleteModal(false)
      router.push('./sign-in')
    }, 2000)
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
    <>
      <div className="relative rounded-[2.5rem] md:rounded-[3rem] h-full flex flex-col overflow-hidden border-4 border-white/50 shadow-xl p-6 md:p-12 transition-all duration-300 bg-white">
        {/* BACKGROUND EFFECTS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 lg:w-60 lg:h-60 bg-sky-100/50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -translate-y-1/2 -right-16 w-40 h-40 lg:w-52 lg:h-52 bg-blue-100/50 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 left-1/4 w-44 h-44 lg:w-56 lg:h-56 bg-cyan-100/40 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,77,141,0.03),transparent_70%)]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10 relative">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-navy via-blue-700 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-blue-900/20 rotate-3 transition-transform hover:rotate-6 hover:scale-110 shrink-0">
              <Settings2 size={28} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-black text-navy uppercase tracking-[0.15em] text-xl leading-none mb-1.5">
                Pengaturan Akun
              </h3>
              <p className="text-sm text-slate-500 font-bold tracking-wide">
                Kelola informasi profil publik Anda
              </p>
            </div>
          </div>

          {/* FORM FIELDS COMPONENT */}
          <AccountFormFields
            name={name}
            email={email}
            errors={errors}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
          />

          {/* DANGER ZONE COMPONENT */}
          <AccountDangerZone
            isDeleting={isDeleting}
            handleDelete={handleDeleteTrigger}
          />

          {/* SAVE BUTTON */}
          <div className="mt-8 pt-6 sm:mt-10 sm:pt-8 border-t border-slate-100 relative flex flex-col sm:flex-row sm:justify-end">
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isLoading}
              className={`group relative w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold tracking-wide overflow-hidden transition-all duration-300 border-none ring-0 focus:ring-0 ${
                hasChanges
                  ? 'shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-px cursor-pointer'
                  : 'bg-slate-100 cursor-not-allowed text-slate-400 shadow-none'
              }`}
            >
              {hasChanges && (
                <>
                  <div className="absolute inset-0 bg-linear-to-r from-navy via-blue-600 to-sky-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                </>
              )}
              <div
                className={`relative z-10 flex items-center justify-center gap-2.5 sm:gap-3 h-full px-6 ${
                  hasChanges ? 'text-white' : 'text-slate-400'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="tracking-wider uppercase text-xs sm:text-sm">
                      Menyimpan...
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
                      {hasChanges ? 'Simpan Perubahan' : 'Tidak ada perubahan'}
                    </span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}
