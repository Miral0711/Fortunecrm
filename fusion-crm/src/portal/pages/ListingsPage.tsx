import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SlidersHorizontal, Bed, Bath, Car, MapPin, Heart, X } from 'lucide-react'
import clsx from 'clsx'
import { listings, priceRanges, propertyTypes, locations } from '../data/listingsData'
import type { Listing } from '../data/listingsData'

const statusColors: Record<Listing['status'], string> = {
  Available: 'bg-green-50 text-green-700',
  'Under Offer': 'bg-orange-50 text-orange-600',
  Sold: 'bg-gray-100 text-gray-500',
}

export default function ListingsPage() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [priceIdx, setPriceIdx] = useState(0)
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [locationFilter, setLocationFilter] = useState('All Locations')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const range = priceRanges[priceIdx]
    return listings.filter(l => {
      if (l.price < range.min || l.price > range.max) return false
      if (typeFilter !== 'All Types' && l.type !== typeFilter) return false
      if (locationFilter !== 'All Locations' && l.state !== locationFilter) return false
      if (search && !l.title.toLowerCase().includes(search.toLowerCase()) &&
          !l.location.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [priceIdx, typeFilter, locationFilter, search])

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Property Listings</h1>
        <p className="text-sm text-gray-500 mt-0.5">{filtered.length} properties available</p>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full pl-4 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => setSidebarOpen(o => !o)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors',
            sidebarOpen
              ? 'bg-orange-50 border-orange-200 text-orange-600'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        {sidebarOpen && (
          <aside className="w-56 shrink-0 hidden md:block">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-6 sticky top-24">
              {/* Price */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Price Range</p>
                <div className="space-y-1">
                  {priceRanges.map((r, i) => (
                    <button
                      key={r.label}
                      onClick={() => setPriceIdx(i)}
                      className={clsx(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        priceIdx === i
                          ? 'bg-orange-50 text-orange-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Property Type</p>
                <div className="space-y-1">
                  {propertyTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className={clsx(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        typeFilter === t
                          ? 'bg-orange-50 text-orange-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">State</p>
                <div className="space-y-1">
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setLocationFilter(loc)}
                      className={clsx(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        locationFilter === loc
                          ? 'bg-orange-50 text-orange-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {(priceIdx !== 0 || typeFilter !== 'All Types' || locationFilter !== 'All Locations') && (
                <button
                  onClick={() => { setPriceIdx(0); setTypeFilter('All Types'); setLocationFilter('All Locations') }}
                  className="w-full text-xs text-orange-500 hover:text-orange-600 font-medium py-1"
                >
                  Clear filters
                </button>
              )}
            </div>
          </aside>
        )}

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-600">No properties found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(listing => (
                <PropertyCard
                  key={listing.id}
                  listing={listing}
                  saved={savedIds.has(listing.id)}
                  onSave={toggleSave}
                  onClick={() => navigate(`/portal/listings/${listing.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PropertyCard({
  listing, saved, onSave, onClick,
}: {
  listing: Listing
  saved: boolean
  onSave: (id: string, e: React.MouseEvent) => void
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-md hover:border-orange-100 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Status badge */}
        <span className={clsx('absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full', statusColors[listing.status])}>
          {listing.status}
        </span>
        {/* Save button */}
        <button
          onClick={e => onSave(listing.id, e)}
          className={clsx(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors',
            saved ? 'bg-orange-500 text-white' : 'bg-white/90 text-gray-500 hover:text-orange-500'
          )}
        >
          <Heart className={clsx('w-4 h-4', saved && 'fill-current')} />
        </button>
        {listing.featured && (
          <span className="absolute bottom-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-orange-500 text-white">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{listing.project}</p>
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1">{listing.title}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin className="w-3 h-3 shrink-0" />
          {listing.location}
        </div>

        <p className="text-lg font-bold text-gray-800 mb-3">{listing.priceLabel}</p>

        {/* Specs */}
        {listing.type !== 'Land' ? (
          <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-50 pt-3">
            <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{listing.bedrooms}</span>
            <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" />{listing.bathrooms}</span>
            <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" />{listing.garage}</span>
            <span className="ml-auto text-gray-400">{listing.landSize}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs text-gray-500 border-t border-gray-50 pt-3">
            <span className="font-medium text-gray-700">{listing.landSize}</span>
            <span className="text-gray-400">land area</span>
          </div>
        )}
      </div>
    </div>
  )
}
