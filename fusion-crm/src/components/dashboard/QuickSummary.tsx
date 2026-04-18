import { Users, UserCheck, Activity, Mail } from 'lucide-react'

interface SummaryItem {
  label: string
  value: string
  icon: typeof Users
  iconBg: string
  iconColor: string
  sub?: string
}

const items: SummaryItem[] = [
  { label: 'Total Clients',      value: '2,841', icon: UserCheck, iconBg: 'bg-blue-50',   iconColor: 'text-blue-500',   sub: '+184 this month' },
  { label: 'Total Subscribers',  value: '8,204', icon: Mail,      iconBg: 'bg-indigo-50', iconColor: 'text-indigo-500', sub: '+312 this week' },
  { label: 'Active Users Today', value: '1,047', icon: Activity,  iconBg: 'bg-green-50',  iconColor: 'text-green-500',  sub: 'Online now' },
  { label: 'Total Accounts',     value: '14,382',icon: Users,     iconBg: 'bg-orange-50', iconColor: 'text-orange-500', sub: 'All roles combined' },
]

export default function QuickSummary() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">Quick Summary</h3>
        <p className="text-xs text-gray-400 mt-0.5">Platform-wide snapshot</p>
      </div>
      <div className="divide-y divide-gray-50">
        {items.map(item => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex items-center gap-3 px-4 py-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">{item.label}</p>
                {item.sub && <p className="text-[10px] text-gray-400">{item.sub}</p>}
              </div>
              <span className="text-sm font-bold text-gray-800 shrink-0">{item.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
