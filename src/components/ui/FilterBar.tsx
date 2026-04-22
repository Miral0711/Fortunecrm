import { Filter } from 'lucide-react'
import SearchInput from './SearchInput'

interface FilterOption {
  label: string
  value: string
}

interface Props {
  search?: string
  onSearch?: (v: string) => void
  filters?: FilterOption[]
  activeFilter?: string
  onFilter?: (v: string) => void
  actions?: React.ReactNode
}

export default function FilterBar({ search, onSearch, filters, activeFilter, onFilter, actions }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {onSearch !== undefined && (
        <SearchInput value={search} onChange={onSearch} className="w-56" />
      )}
      {filters && (
        <div className="flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => onFilter?.(f.value)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                activeFilter === f.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  )
}
