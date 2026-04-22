import clsx from 'clsx'
import { MapPin, Bed, Bath, Car, Heart } from 'lucide-react'
import type { BadgeVariant } from '../../types'

export interface PropertyCardData {
  id: string
  title: string
  project?: string
  location: string
  price: string
  status: string
  statusVariant?: BadgeVariant
  type: string
  bedrooms?: number
  bathrooms?: number
  garage?: number
  landSize?: string
  image?: string
  featured?: boolean
  saved?: boolean
}

interface Props {
  property: PropertyCardData
  onSave?: (id: string, e: React.MouseEvent) => void
  onClick?: () => void
  className?: string
}

const statusColors: Record<string, string> = {
  Available:     'bg-green-50 text-green-700',
  'Under Offer': 'bg-orange-50 text-orange-600',
  Sold:          'bg-gray-100 text-gray-500',
}

export default function PropertyCard({ property: p, onSave, onClick, className }: Props) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer group',
        'hover:shadow-md hover:border-orange-100 transition-all duration-200',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-orange-300" />
          </div>
        )}
        <span className={clsx(
          'absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full',
          statusColors[p.status] ?? 'bg-gray-100 text-gray-500'
        )}>
          {p.status}
        </span>
        {onSave && (
          <button
            onClick={e => onSave(p.id, e)}
            className={clsx(
              'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors',
              p.saved ? 'bg-orange-500 text-white' : 'bg-white/90 text-gray-500 hover:text-orange-500'
            )}
          >
            <Heart className={clsx('w-4 h-4', p.saved && 'fill-current')} />
          </button>
        )}
        {p.featured && (
          <span className="absolute bottom-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-orange-500 text-white">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {p.project && <p className="text-xs text-gray-400 mb-1">{p.project}</p>}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1">{p.title}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin className="w-3 h-3 shrink-0" />
          {p.location}
        </div>
        <p className="text-lg font-bold text-gray-800 mb-3">{p.price}</p>

        {p.type !== 'Land' && (p.bedrooms !== undefined) ? (
          <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-50 pt-3">
            {p.bedrooms !== undefined && (
              <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{p.bedrooms}</span>
            )}
            {p.bathrooms !== undefined && (
              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{p.bathrooms}</span>
            )}
            {p.garage !== undefined && (
              <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" />{p.garage}</span>
            )}
            {p.landSize && <span className="ml-auto text-gray-400">{p.landSize}</span>}
          </div>
        ) : p.landSize ? (
          <div className="flex items-center gap-1 text-xs text-gray-500 border-t border-gray-50 pt-3">
            <span className="font-medium text-gray-700">{p.landSize}</span>
            <span className="text-gray-400">land area</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
