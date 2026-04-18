import { DollarSign, ArrowUpRight } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

const sparkData = [
  { v: 8200 }, { v: 9100 }, { v: 7800 }, { v: 11200 },
  { v: 10400 }, { v: 13500 }, { v: 12800 }, { v: 15200 },
]

interface CommissionItem {
  label: string
  value: string
  pct: number
  color: string
}

const breakdown: CommissionItem[] = [
  { label: 'Sales Agents',      value: '$18,420', pct: 48, color: 'bg-orange-500' },
  { label: 'Referral Partners', value: '$11,340', pct: 30, color: 'bg-blue-400' },
  { label: 'Affiliates',        value: '$8,230',  pct: 22, color: 'bg-green-400' },
]

export default function CommissionInsight() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Commission Insight</h3>
          <p className="text-xs text-gray-400 mt-0.5">Earnings breakdown — April</p>
        </div>
        <button className="text-xs text-orange-500 font-medium flex items-center gap-1 hover:gap-2 transition-all">
          Details <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="px-4 pt-3 pb-1">
        {/* Total + sparkline */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="w-6 h-6 rounded-md bg-orange-50 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Total Commission</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">$37,990</span>
            <span className="ml-2 text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full font-medium">+14%</span>
          </div>
          <div className="w-28 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2} fill="url(#commGrad)" dot={false} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Commission']} contentStyle={{ fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="space-y-2 pb-3">
          {breakdown.map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-semibold text-gray-800">{item.value}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
