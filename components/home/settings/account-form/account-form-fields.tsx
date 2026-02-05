import { AlertCircle, Mail, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AccountFormFieldsProps {
  name: string
  email: string
  errors: { name?: string; email?: string }
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AccountFormFields({
  name,
  email,
  errors,
  handleNameChange,
  handleEmailChange,
}: AccountFormFieldsProps) {
  return (
    <div className="space-y-8 flex-1">
      {/* Name Input */}
      <div className="group/field space-y-3">
        <div className="flex justify-between items-baseline">
          <Label
            htmlFor="name"
            className={`block text-xs font-extrabold uppercase tracking-[0.25em] ml-1 transition-colors duration-300 ${
              errors.name
                ? 'text-red-500'
                : 'text-blue-900/40 group-focus-within/field:text-blue-800'
            }`}
          >
            Full Name
          </Label>
          {errors.name && (
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
              <AlertCircle size={10} /> {errors.name}
            </span>
          )}
        </div>

        <div
          className={`relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md border-2 transition-all duration-300 ${
            errors.name
              ? 'border-red-200 bg-red-50/50'
              : 'border-slate-200 group-focus-within/field:bg-white group-focus-within/field:border-blue-900/30 group-focus-within/field:shadow-xl'
          }`}
        >
          <div
            className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none z-10 ${
              errors.name
                ? 'text-red-400'
                : 'text-blue-900/30 group-focus-within/field:text-blue-800 group-focus-within/field:scale-110'
            }`}
          >
            <User size={20} strokeWidth={2.5} />
          </div>

          <Input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full h-16 pl-14 pr-6 bg-transparent font-bold text-blue-950 text-lg border-none outline-none placeholder:text-blue-900/20 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter your full name"
          />

          {!errors.name && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue-950 via-blue-600 to-sky-400 -translate-x-full group-focus-within/field:translate-x-0 transition-transform duration-500 ease-out origin-left" />
          )}
          {errors.name && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-400" />
          )}
        </div>
      </div>

      {/* Email Input */}
      <div className="group/field space-y-3">
        <div className="flex justify-between items-baseline">
          <Label
            htmlFor="email"
            className={`block text-xs font-extrabold uppercase tracking-[0.25em] ml-1 transition-colors duration-300 ${
              errors.email
                ? 'text-red-500'
                : 'text-blue-900/40 group-focus-within/field:text-blue-800'
            }`}
          >
            Email Address
          </Label>
          {errors.email && (
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
              <AlertCircle size={10} /> {errors.email}
            </span>
          )}
        </div>

        <div
          className={`relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md border-2 transition-all duration-300 ${
            errors.email
              ? 'border-red-200 bg-red-50/50'
              : 'border-slate-200 group-focus-within/field:bg-white group-focus-within/field:border-blue-900/30 group-focus-within/field:shadow-xl'
          }`}
        >
          <div
            className={`absolute left-5 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none z-10 ${
              errors.email
                ? 'text-red-400'
                : 'text-blue-900/30 group-focus-within/field:text-blue-800 group-focus-within/field:scale-110'
            }`}
          >
            <Mail size={20} strokeWidth={2.5} />
          </div>

          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full h-16 pl-14 pr-6 bg-transparent font-bold text-blue-950 text-lg border-none outline-none placeholder:text-blue-900/20 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Enter your email"
          />

          {!errors.email && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue-950 via-blue-600 to-sky-400 -translate-x-full group-focus-within/field:translate-x-0 transition-transform duration-500 ease-out origin-left" />
          )}
          {errors.email && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-400" />
          )}
        </div>
      </div>
    </div>
  )
}
