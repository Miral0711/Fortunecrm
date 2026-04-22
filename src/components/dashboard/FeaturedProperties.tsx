import { ArrowUpRight, MapPin } from 'lucide-react'
import StatusBadge from '../ui/StatusBadge'
import type { BadgeVariant } from '../../types'

export interface FeaturedProperty {
  id: string
  name: string
  location: string
  price: string
  status: BadgeVariant
  statusLabel: string
  type: string
}

const TYPE_COLORS: Record<string, string> = {
  Residential: 'bg-blue-50 text-blue-600',
  Townhouse:   'bg-purple-50 text-purple-600',
  Land:        'bg-green-50 text-green-600',
  Apartment:   'bg-orange-50 text-orange-600',
}

const DEFAULT_PROPERTIES: FeaturedProperty[] = [
  { id: '1', name: 'Horizon Estate — Stage 3', location: 'Werribee, VIC',   price: '$420k–$580k', status: 'orange',  statusLabel: 'Featured', type: 'Residential' },
  { id: '2', name: 'Parkview Residences',       location: 'Penrith, NSW',    price: '$510k–$720k', status: 'success', statusLabel: 'Active',   type: 'Townhouse' },
  { id: '3', name: 'Coastal Sands — Lot 7',     location: 'Gold Coast, QLD', price: '$380k–$450k', status: 'orange',  statusLabel: 'Featured', type: 'Land' },
  { id: '4', name: 'Greenfield Heights',         location: 'Baldivis, WA',    price: '$290k–$360k', status: 'success', statusLabel: 'Active',   type: 'Residential' },
  { id: '5', name: 'Metro Quarter — Tower B',    location: 'Adelaide, SA',    price: '$650k–$890k', status: 'info',    statusLabel: 'Pending',  type: 'Apartment' },
  { id: '6', name: 'Riverview Park Estate',      location: 'Ipswich, QLD',    price: '$310k–$420k', status: 'success', statusLabel: 'Active',   type: 'Land' },
]

interface Props {
  properties?: FeaturedProperty[]
  title?: string
  subtitle?: string
  onViewAll?: () => void
}

export default function FeaturedProperties({
  properties = DEFAULT_PROPERTIES,
  title = 'Featured Properties',
  subtitle = 'Active & featured listings',
  onViewAll,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs text-orange-500 font-medium flex items-center gap-1 hover:gap-2 transition-all"
        >
          View All <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="divide-y divide-gray-50 max-h-[272px] overflow-y-auto">
        {properties.map(p => (
          <div key={p.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50/60 transition-colors">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${TYPE_COLORS[p.type] ?? 'bg-gray-100 text-gray-600'}`}>
              {p.type}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 truncate">{p.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                <p className="text-[10px] text-gray-400 truncate">{p.location}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-700 shrink-0 hidden sm:block">{p.price}</span>
            <StatusBadge variant={p.status}>{p.statusLabel}</StatusBadge>
          </div>
        ))}
      </div>
    </div>
  )
}
