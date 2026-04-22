import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'
import { Info } from 'lucide-react'

type BannerVariant = 'info' | 'warning' | 'success' | 'orange'

interface Props {
  title?: string
  message: string
  variant?: BannerVariant
  icon?: LucideIcon
  className?: string
}

const variantClasses: Record<BannerVariant, { wrap: string; icon: string }> = {
  info:    { wrap: 'bg-blue-50 border-blue-100 text-blue-700',   icon: 'text-blue-500' },
  warning: { wrap: 'bg-yellow-50 border-yellow-100 text-yellow-700', icon: 'text-yellow-500' },
  success: { wrap: 'bg-green-50 border-green-100 text-green-700', icon: 'text-green-500' },
  orange:  { wrap: 'bg-orange-50 border-orange-100 text-orange-700', icon: 'text-orange-500' },
}

export default function InfoBanner({ title, message, variant = 'info', icon: Icon = Info, className }: Props) {
  const cls = variantClasses[variant]
  return (
    <div className={clsx('flex items-start gap-2.5 px-4 py-3 rounded-xl border text-xs', cls.wrap, className)}>
      <Icon className={clsx('w-3.5 h-3.5 shrink-0 mt-0.5', cls.icon)} />
      <div>
        {title && <p className="font-medium mb-0.5">{title}</p>}
        <p className="leading-relaxed">{message}</p>
      </div>
    </div>
  )
}
