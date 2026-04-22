import clsx from 'clsx'

interface Props {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}

export default function SectionCard({ title, subtitle, children, className }: Props) {
  return (
    <div className={clsx('bg-white rounded-2xl border border-gray-100 p-5', className)}>
      <h2 className="text-sm font-semibold text-gray-700 mb-4">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mb-4">{subtitle}</p>}
      {children}
    </div>
  )
}
