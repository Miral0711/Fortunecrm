import { ChevronDown, DollarSign, Home, MapPin, Search, SlidersHorizontal, X } from 'lucide-react'
import Toggle from '../ui/Toggle'
import RangeSlider from './RangeSlider'

interface FilterBarProps {
  location: string
  onLocationChange: (value: string) => void
  search: string
  onSearchChange: (value: string) => void
  radiusEnabled: boolean
  onRadiusEnabledChange: () => void
  radius: number
  onRadiusChange: (value: number) => void
  priceEnabled: boolean
  onPriceEnabledChange: () => void
  priceMin: number
  priceMax: number
  onPriceMaxChange: (value: number) => void
  activeTags: string[]
  onRemoveTag: (tag: string) => void
  onClear: () => void
  searchPlaceholder: string
  locationOptions: string[]
}

const labelClassName =
  'flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-gray-400'

export default function FilterBar({
  location,
  onLocationChange,
  search,
  onSearchChange,
  radiusEnabled,
  onRadiusEnabledChange,
  radius,
  onRadiusChange,
  priceEnabled,
  onPriceEnabledChange,
  priceMin,
  priceMax,
  onPriceMaxChange,
  activeTags,
  onRemoveTag,
  onClear,
  searchPlaceholder,
  locationOptions,
}: FilterBarProps) {
  return (
    <section className="shrink-0 rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="space-y-2.5 px-3 py-2.5 md:px-4 md:py-3">
        <div className="grid grid-cols-1 items-end gap-2 xl:grid-cols-12">
          <div className="flex flex-col gap-1 xl:col-span-2">
            <label className={labelClassName}>
              <Home className="h-2.5 w-2.5" />
              Location
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
                className="h-9 w-full appearance-none rounded-lg border border-gray-200 bg-white py-0 pl-3 pr-8 text-xs text-gray-700 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30"
              >
                <option value="">Select location...</option>
                {locationOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col gap-1 xl:col-span-7">
            <label className={labelClassName}>
              <Search className="h-2.5 w-2.5" />
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="h-9 w-full rounded-lg border border-gray-200 bg-white py-0 pl-8 pr-3 text-xs text-gray-700 placeholder:text-gray-400 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-end justify-start gap-2 xl:col-span-3 xl:justify-end">
            <button
              type="button"
              className="flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-3 w-3 text-gray-500" />
              Advanced
            </button>
            <button
              type="button"
              onClick={onClear}
              className="flex h-9 items-center gap-1.5 rounded-lg bg-orange-500 px-3 text-xs font-medium text-white transition-colors hover:bg-orange-600"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 border-t border-gray-100 pt-2 xl:grid-cols-12">
          <div className="space-y-1 xl:col-span-3">
            <label className={labelClassName}>
              <MapPin className="h-2.5 w-2.5" />
              Radius
            </label>
            <Toggle enabled={radiusEnabled} onChange={onRadiusEnabledChange} label={`${radius} km`} />
            {radiusEnabled && (
              <RangeSlider
                min={1}
                max={100}
                value={radius}
                onChange={onRadiusChange}
                ariaLabel="Radius slider"
                compact
                hideBounds
              />
            )}
          </div>

          <div className="space-y-1 xl:col-span-5">
            <label className={labelClassName}>
              <DollarSign className="h-2.5 w-2.5" />
              Price Range
            </label>
            <Toggle
              enabled={priceEnabled}
              onChange={onPriceEnabledChange}
              label={`$${priceMin.toLocaleString()} - $${priceMax.toLocaleString()}`}
            />
            {priceEnabled && (
              <RangeSlider
                min={100000}
                max={10000000}
                step={10000}
                value={priceMax}
                onChange={onPriceMaxChange}
                ariaLabel="Price slider"
                compact
                hideBounds
              />
            )}
          </div>

          <div className="flex flex-wrap items-start justify-start gap-1 xl:col-span-4 xl:justify-end">
            {activeTags.length === 0 && <span className="text-[10px] text-gray-400">No active filters</span>}
            {activeTags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-medium text-orange-600 ring-1 ring-orange-200"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="text-orange-500 transition-colors hover:text-orange-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
