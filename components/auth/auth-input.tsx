import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LucideIcon } from 'lucide-react'

interface AuthInputProps {
  label: string
  type: string
  placeholder: string
  icon: LucideIcon
}

export function AuthInput({
  label,
  type,
  placeholder,
  icon: Icon,
}: AuthInputProps) {
  return (
    <div className="space-y-3">
      <Label className="ml-1 font-bold text-xs uppercase tracking-[0.2em] text-navy/60">
        {label}
      </Label>
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          className="h-15 text-base rounded-2xl bg-white/60 border-none pl-12 pr-6 focus-visible:ring-2 focus-visible:ring-blue transition-all shadow-sm"
        />
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 opacity-30" />
      </div>
    </div>
  )
}
