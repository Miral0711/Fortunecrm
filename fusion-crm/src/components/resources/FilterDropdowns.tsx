import { ChevronDown } from 'lucide-react'
import type { ResourceType } from '../../data/resourcesData'

export type DurationFilter = 'all' | 'short' | 'medium' | 'long'
export type SortOption = 'newest' | 'views' | 'alpha'

interface Props {
  typeFilter: ResourceType | 'all'
  durationFilter: DurationFilter
  sortBy: SortOption
  onTypeChange: (v: ResourceType | 'all') => void
  onDurationChange: (v: DurationFilter) => void
  onSortChange: (v: SortOption) => void
  onClear: () => void
  hasActiveFilters: boolean
}

function Select<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value as T)}
        className="appearance-none pl-2.5 pr-7 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 cursor-pointer transition"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
    </div>
  )
}

export default function FilterDropdowns({
  typeFilter, durationFilter, sortBy,
  onTypeChange, onDurationChange, onSortChange,
  onClear, hasActiveFilters,
}: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Select<ResourceType | 'all'>
        value={typeFilter}
        onChange={onTypeChange}
        options={[
          { value: 'all',          label: 'All Types' },
          { value: 'video',        label: 'Video' },
          { value: 'document',     label: 'Document' },
          { value: 'form',         label: 'Form' },
          { value: 'ebook',        label: 'Ebook' },
          { value: 'presentation', label: 'Slides' },
        ]}
      />
      <Select<DurationFilter>
        value={durationFilter}
        onChange={onDurationChange}
        options={[
          { value: 'all',    label: 'Any Length' },
          { value: 'short',  label: '< 5 min' },
          { value: 'medium', label: '5–15 min' },
          { value: 'long',   label: '15+ min' },
        ]}
      />
      <Select<SortOption>
        value={sortBy}
        onChange={onSortChange}
        options={[
          { value: 'newest', label: 'Newest' },
          { value: 'views',  label: 'Most Viewed' },
          { value: 'alpha',  label: 'A–Z' },
        ]}
      />
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="text-xs text-gray-400 hover:text-orange-500 transition-colors px-1"
        >
          Clear
        </button>
      )}
    </div>
  )
}
