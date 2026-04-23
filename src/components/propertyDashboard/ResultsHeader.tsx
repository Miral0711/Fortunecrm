import { ChevronDown, LayoutGrid, List, TrendingUp } from 'lucide-react'

interface ResultsHeaderProps {
  totalResults: number
  startResult: number
  endResult: number
  perPage: string
  onPerPageChange: (value: string) => void
  order: string
  onOrderChange: (value: string) => void
  perPageOptions: string[]
  orderOptions: string[]
  view: 'list' | 'grid'
  onViewChange: (view: 'list' | 'grid') => void
}

function TinySelect({
  value,
  onChange,
  options,
  className,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
  className: string
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full appearance-none rounded-lg border border-gray-200 bg-white py-0 pl-2.5 pr-7 text-[11px] text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
    </div>
  )
}

export default function ResultsHeader({
  totalResults,
  startResult,
  endResult,
  perPage,
  onPerPageChange,
  order,
  onOrderChange,
  perPageOptions,
  orderOptions,
  view,
  onViewChange,
}: ResultsHeaderProps) {
  return (
    <div className="sticky top-0 z-20 shrink-0 border-b border-gray-100 bg-white/95 px-3 py-2.5 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-gray-800">{totalResults.toLocaleString()} results</span>
          <span className="text-[11px] text-gray-500">Showing {startResult}-{endResult}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <TinySelect
            value={perPage}
            onChange={onPerPageChange}
            options={perPageOptions}
            className="w-14"
          />
          <TinySelect
            value={order}
            onChange={onOrderChange}
            options={orderOptions}
            className="w-40"
          />

          <div className="flex items-center overflow-hidden rounded-md border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => onViewChange('list')}
              className={`p-1 transition-colors ${
                view === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <List className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => onViewChange('grid')}
              className={`p-1 transition-colors ${
                view === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-50'
              }`}
            >
              <LayoutGrid className="h-3 w-3" />
            </button>
            <button type="button" className="border-l border-gray-100 p-1 text-gray-400 transition-colors hover:bg-gray-50">
              <TrendingUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
