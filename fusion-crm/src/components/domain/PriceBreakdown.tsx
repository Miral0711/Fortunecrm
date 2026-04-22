interface LineItem {
  label: string
  value: number
  prefix?: string
}

interface Props {
  items: LineItem[]
  total: number
  totalLabel?: string
  currency?: string
}

function fmt(n: number, currency = '$') {
  return `${currency}${n.toLocaleString()}`
}

export default function PriceBreakdown({ items, total, totalLabel = 'Total Package Price', currency = '$' }: Props) {
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-800">{item.label}</p>
          <p className="text-sm font-semibold text-gray-800">
            {item.prefix}{fmt(item.value, currency)}
          </p>
        </div>
      ))}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-800">{totalLabel}</p>
          <p className="text-xl font-bold text-orange-600">{fmt(total, currency)}</p>
        </div>
      </div>
    </div>
  )
}
