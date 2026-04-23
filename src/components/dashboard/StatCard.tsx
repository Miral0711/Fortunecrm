import { TrendingUp, TrendingDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  label: string
  value: string
  change?: string
  changeType?: 'up' | 'down'
  icon?: LucideIcon
  iconColor?: string
  iconBg?: string
  suffix?: React.ReactNode
}

export default function StatCard({ label, value, change, changeType, icon: Icon, iconColor = 'text-orange-500', iconBg = 'bg-orange-50', suffix }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-medium truncate">{label}</p>
          <p className="text-xl font-bold text-gray-800 mt-1 leading-none">{value}</p>
          {change && (
            <div className={clsx(
              'flex items-center gap-1 mt-1.5 text-[11px] font-medium',
              changeType === 'up' ? 'text-green-600' : 'text-red-500'
            )}>
              {changeType === 'up'
                ? <TrendingUp className="w-3 h-3" />
                : <TrendingDown className="w-3 h-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5', iconBg)}>
            <Icon className={clsx('w-4 h-4', iconColor)} />
          </div>
        )}
      </div>
      {suffix && <div className="mt-3">{suffix}</div>}
    </div>
  )
}
