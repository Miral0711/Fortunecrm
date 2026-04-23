import { Calendar, Camera, Eye, Heart, MapPin, Pencil, Star } from 'lucide-react'
import type { DashboardListItem } from './types'

interface ListingCardProps {
  item: DashboardListItem
  selected: boolean
  onSelect: () => void
  typeDotClass: string
  tagStyles: Record<string, string>
}

export default function ListingCard({
  item,
  selected,
  onSelect,
  typeDotClass,
  tagStyles,
}: ListingCardProps) {
  return (
    <article
      onClick={onSelect}
      className={`group relative flex cursor-pointer overflow-hidden rounded-lg border bg-white transition-all duration-150 hover:-translate-y-px hover:shadow-md ${
        selected
          ? 'border-orange-400 ring-1 ring-orange-300/50 shadow-sm shadow-orange-100'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {selected && <div className="absolute bottom-0 left-0 top-0 w-0.5 rounded-l-xl bg-orange-500" />}

      <div
        className={`relative w-[92px] shrink-0 overflow-hidden bg-gradient-to-br ${
          item.imgGrad ?? 'from-slate-300 to-slate-400'
        }`}
      >
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : null}
        <div className="absolute left-1 top-1 flex gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="flex h-4.5 w-4.5 items-center justify-center rounded-md bg-white/90 shadow-sm transition-colors hover:bg-white"
          >
            <Star className="h-2.5 w-2.5 text-gray-500" />
          </button>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="flex h-4.5 w-4.5 items-center justify-center rounded-md bg-white/90 shadow-sm transition-colors hover:bg-white"
          >
            <Heart className="h-2.5 w-2.5 text-gray-500" />
          </button>
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="flex h-4.5 w-4.5 items-center justify-center rounded-md bg-white/90 shadow-sm transition-colors hover:bg-white"
          >
            <Camera className="h-2.5 w-2.5 text-gray-500" />
          </button>
        </div>

        {!item.image && (
          <div className="absolute inset-0 flex items-center justify-center opacity-25">
            <svg viewBox="0 0 80 60" className="h-10 w-14 fill-white">
              <polygon points="40,5 75,30 65,30 65,55 15,55 15,30 5,30" />
            </svg>
          </div>
        )}

        <div className="absolute bottom-1.5 left-1.5">
          <div className={`h-1.5 w-1.5 rounded-full ${typeDotClass}`} />
        </div>
      </div>

      <div className="min-w-0 flex-1 px-2.5 py-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-tight text-gray-800">{item.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-500">
              <MapPin className="h-2.5 w-2.5 shrink-0" />
              {item.suburb}, {item.state}
            </p>
          </div>
          <p className="shrink-0 whitespace-nowrap text-[13px] font-bold text-gray-900">{item.priceLabel}</p>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10px] text-gray-600">
          <span className="font-medium text-gray-700">Status: {item.buildStatus}</span>
          <span className="text-gray-300">|</span>
          <span>Yield: {item.rentalYield}</span>
          <span className="text-gray-300">|</span>
          <span>Lots: {item.availableLots}</span>
          <span className="text-gray-300">|</span>
          <span className="truncate">Type: {item.type}</span>
        </div>

        {item.tags.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${tagStyles[tag] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-1.5 flex items-center justify-between border-t border-gray-100 pt-1.5">
          <div className="flex items-center gap-2 text-[9px] text-gray-500">
            <span className="flex items-center gap-0.5">
              <Calendar className="h-2.5 w-2.5" />
              {item.date}
            </span>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-0.5 text-orange-500 transition-colors hover:text-orange-600"
            >
              <MapPin className="h-2.5 w-2.5" />
              Distance
            </button>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-0.5 text-[9px] font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              <Pencil className="h-2 w-2" />
              Edit
            </button>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 rounded-md bg-orange-500 px-2 py-0.5 text-[9px] font-medium text-white transition-colors hover:bg-orange-600"
            >
              <Eye className="h-2 w-2" />
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
