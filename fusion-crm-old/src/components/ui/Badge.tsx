import clsx from 'clsx'
import type { BadgeVariant } from '../../types'

// Re-export StatusBadge as Badge for unified usage
interface Props {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-50 text-green-700 ring-green-200',
  warning: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
  danger:  'bg-red-50 text-red-700 ring-red-200',
  info:    'bg-blue-50 text-blue-700 ring-blue-200',
  neutral: 'bg-gray-100 text-gray-600 ring-gray-200',
  orange:  'bg-orange-50 text-orange-700 ring-orange-200',
}

export default function Badge({ variant = 'neutral', children, className }: Props) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ring-1',
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  )
}
