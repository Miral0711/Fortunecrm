import clsx from 'clsx'

export type CardVariant = 'default' | 'bordered' | 'highlighted'

interface Props {
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
  variant?: CardVariant
  className?: string
  noPadding?: boolean
}

const variantClasses: Record<CardVariant, string> = {
  default:     'bg-white border border-gray-100 shadow-sm',
  bordered:    'bg-white border-2 border-gray-200',
  highlighted: 'bg-white border border-orange-200 shadow-sm ring-1 ring-orange-100',
}

export default function Card({
  title,
  subtitle,
  actions,
  children,
  variant = 'default',
  className,
  noPadding,
}: Props) {
  const hasHeader = title || subtitle || actions

  return (
    <div className={clsx('rounded-xl overflow-hidden', variantClasses[variant], className)}>
      {hasHeader && (
        <div className="flex items-start justify-between px-4 py-3 border-b border-gray-100">
          <div>
            {title && <h3 className="text-sm font-semibold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0 ml-4">{actions}</div>}
        </div>
      )}
      <div className={clsx(!noPadding && 'p-4')}>{children}</div>
    </div>
  )
}
