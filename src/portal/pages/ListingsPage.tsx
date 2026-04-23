import { useState, useMemo } from 'react'
import {
  Search, SlidersHorizontal, LayoutGrid, List,
  ChevronDown, MapPin, Bed, Bath, Car, Ruler,
  Heart, ExternalLink,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { listings } from '../data/listingsData'
import SearchInput from '../../components/ui/SearchInput'
import PageWrapper from '../../components/layout/PageWrapper'

export default function ListingsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [project, setProject] = useState('All Projects')
  const [propertyType, setPropertyType] = useState('All Types')
  const [savedOnly, setSavedOnly] = useState(false)

  const filtered = useMemo(() => {
    return listings.filter(l => {
      if (search && !l.title.toLowerCase().includes(search.toLowerCase()) && !l.location.toLowerCase().includes(search.toLowerCase())) return false
      if (project !== 'All Projects' && l.project !== project) return false
      if (propertyType !== 'All Types' && l.type !== propertyType) return false
      return true
    })
  }, [search, project, propertyType])

  const projects = ['All Projects', ...new Set(listings.map(l => l.project))]
  const types = ['All Types', ...new Set(listings.map(l => l.type))]

  return (
    <PageWrapper className="bg-white rounded-2xl border border-gray-100 p-4 md:p-5">
      {/* Page header removed */}

      {/* Search bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by project, location or keyword..."
            className="w-full [&>input]:h-11 [&>input]:rounded-xl [&>input]:py-0 [&>input]:pl-9 [&>svg]:left-3"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Project select */}
          <div className="relative min-w-[160px]">
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full h-11 appearance-none pl-3 pr-8 py-0 text-sm bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer shadow-sm"
            >
              {projects.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Type select */}
          <div className="relative min-w-[140px]">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full h-11 appearance-none pl-3 pr-8 py-0 text-sm bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 cursor-pointer shadow-sm"
            >
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button className="w-11 h-11 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-all shadow-sm">
            <SlidersHorizontal className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span> properties
        </p>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={clsx(
              'p-1.5 rounded-md transition-all',
              viewMode === 'grid' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={clsx(
              'p-1.5 rounded-md transition-all',
              viewMode === 'list' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={clsx(
        'grid gap-4 auto-rows-fr',
        viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
      )}>
        {filtered.map(item => (
          <PropertyCard
            key={item.id}
            item={item}
            viewMode={viewMode}
            onClick={() => navigate(`/portal/listings/${item.id}`)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500">No properties found matching your criteria.</p>
          <button
            onClick={() => { setSearch(''); setProject('All Projects'); setPropertyType('All Types') }}
            className="mt-4 text-sm text-orange-500 font-medium hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </PageWrapper>
  )
}

function PropertyCard({ item, viewMode, onClick }: { item: any; viewMode: 'grid' | 'list'; onClick: () => void }) {
  const [saved, setSaved] = useState(false)

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="group bg-white rounded-2xl border border-gray-100 p-3 hover:shadow-lg hover:border-orange-100 transition-all cursor-pointer flex gap-5"
      >
        <div className="w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider mb-1">{item.project}</p>
                <h3 className="font-semibold text-gray-800 text-base">{item.title}</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{item.priceLabel}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
              <MapPin className="w-3 h-3" /> {item.location}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {item.bedrooms}</div>
              <div className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {item.bathrooms}</div>
              {item.type !== 'Land' && <div className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {item.garage}</div>}
              <div className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /> {item.landSize}</div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                saved ? 'bg-orange-50 text-orange-500' : 'text-gray-300 hover:bg-gray-50 hover:text-orange-400'
              )}
            >
              <Heart className={clsx('w-4 h-4', saved && 'fill-current')} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="group h-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-orange-100 transition-all cursor-pointer flex flex-col"
    >
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex gap-2">
          {item.featured && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">FEATURED</span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded-lg border border-gray-100 shadow-sm">{item.status.toUpperCase()}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved) }}
          className={clsx(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/90 backdrop-blur-sm shadow-sm',
            saved ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
          )}
        >
          <Heart className={clsx('w-4 h-4', saved && 'fill-current')} />
        </button>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider mb-1">{item.project}</p>
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">{item.title}</h3>
        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1 mb-3">
          <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{item.location}</span>
        </div>
        
        <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-4 pb-4 border-b border-gray-50">
          <div className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {item.bedrooms}</div>
          <div className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {item.bathrooms}</div>
          {item.type !== 'Land' && <div className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {item.garage}</div>}
          <div className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /> {item.landSize}</div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <p className="text-base font-bold text-gray-800">{item.priceLabel}</p>
          <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  )
}
