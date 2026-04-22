import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SlidersHorizontal, MapPin, X } from 'lucide-react'
import clsx from 'clsx'
import { listings, priceRanges, propertyTypes, locations } from '../data/listingsData'
import PropertyCard from '../../components/domain/PropertyCard'
import type { PropertyCardData } from '../../components/domain/PropertyCard'

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
                  property={{
                    id: listing.id,
                    title: listing.title,
                    project: listing.project,
                    location: listing.location,
                    price: listing.priceLabel,
                    status: listing.status,
                    type: listing.type,
                    bedrooms: listing.bedrooms,
                    bathrooms: listing.bathrooms,
                    garage: listing.garage,
                    landSize: listing.landSize,
                    image: listing.image,
                    featured: listing.featured,
                    saved: savedIds.has(listing.id),
                  } as PropertyCardData}
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
