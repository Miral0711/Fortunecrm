import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Sparkles, Search as SearchIcon } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import PageWrapper from '../components/layout/PageWrapper'
import CategorySidebar from '../components/resources/CategorySidebar'
import { CATEGORIES, RESOURCES as ALL_RESOURCES } from '../data/resourcesData'
import ResourceCard from '../components/resources/ResourceCard'
import ResourceSearchBar from '../components/resources/ResourceSearchBar'
import FilterDropdowns from '../components/resources/FilterDropdowns'
import ResourceCardSkeleton from '../components/resources/ResourceCardSkeleton'
import VideoModal from '../components/resources/VideoModal'
import { getRecommended } from '../data/resourcesData'
import type { Resource, ResourceType, UserRole } from '../data/resourcesData'
import type { DurationFilter, SortOption } from '../components/resources/FilterDropdowns'

const MOCK_USER_ROLE: UserRole = 'Agent'
const MOCK_RECENT_IDS = ['10', '3', '7']

function matchesDuration(min: number | undefined, filter: DurationFilter): boolean {
  if (filter === 'all' || min === undefined) return true
  if (filter === 'short')  return min < 5
  if (filter === 'medium') return min >= 5 && min <= 15
  return min > 15
}

export default function ResourcesPage() {
  // ── Filter / search state ──────────────────────────────────────────────────
  const [activeCategory,    setActiveCategory]    = useState('all')
  const [activeSubcategory, setActiveSubcategory] = useState('')
  const [rawSearch,         setRawSearch]         = useState('')
  const [search,            setSearch]            = useState('')
  const [typeFilter,        setTypeFilter]        = useState<ResourceType | 'all'>('all')
  const [durationFilter,    setDurationFilter]    = useState<DurationFilter>('all')
  const [sortBy,            setSortBy]            = useState<SortOption>('newest')
  const [loading,           setLoading]           = useState(true)

  // ── Modal state ────────────────────────────────────────────────────────────
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const openModal  = useCallback((r: Resource) => setSelectedResource(r), [])
  const closeModal = useCallback(() => setSelectedResource(null), [])

  // ── Debounce search ────────────────────────────────────────────────────────
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setSearch(rawSearch), 250)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [rawSearch])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  // ── Derived data ───────────────────────────────────────────────────────────
  const recommended = useMemo(() => getRecommended(MOCK_USER_ROLE, MOCK_RECENT_IDS), [])

  const filtered = useMemo(() => {
    let list = ALL_RESOURCES
    if (activeCategory !== 'all')  list = list.filter(r => r.category === activeCategory)
    if (activeSubcategory)         list = list.filter(r => r.subcategory === activeSubcategory)
    if (typeFilter !== 'all')      list = list.filter(r => r.type === typeFilter)
    list = list.filter(r => matchesDuration(r.durationMin, durationFilter))
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.description.toLowerCase().includes(q)
      )
    }
    if (sortBy === 'newest')     list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    else if (sortBy === 'views') list = [...list].sort((a, b) => b.views - a.views)
    else                         list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [activeCategory, activeSubcategory, typeFilter, durationFilter, search, sortBy])

  const hasActiveFilters = typeFilter !== 'all' || durationFilter !== 'all' || sortBy !== 'newest' || search.trim() !== ''
  const showRecommended  = activeCategory === 'all' && !search.trim() && !hasActiveFilters

  function clearFilters() {
    setTypeFilter('all'); setDurationFilter('all'); setSortBy('newest')
    setRawSearch(''); setSearch('')
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <PageWrapper>
        <PageHeader
          title="Learning Hub"
          subtitle="Training videos, guides, and documentation for Fusion CRM"
          breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Resources' }]}
        />

        {/* Search + Filters */}
        <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
          <ResourceSearchBar value={rawSearch} onChange={setRawSearch} />
          <div className="h-4 w-px bg-gray-200 hidden sm:block" />
          <FilterDropdowns
            typeFilter={typeFilter}
            durationFilter={durationFilter}
            sortBy={sortBy}
            onTypeChange={setTypeFilter}
            onDurationChange={setDurationFilter}
            onSortChange={setSortBy}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Main layout */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-5">
          <CategorySidebar
            categories={CATEGORIES}
            activeCategory={activeCategory}
            activeSubcategory={activeSubcategory}
            onCategoryChange={setActiveCategory}
            onSubcategoryChange={setActiveSubcategory}
            countFor={catId => catId === 'all' ? ALL_RESOURCES.length : ALL_RESOURCES.filter(r => r.category === catId).length}
            countForSub={subId => ALL_RESOURCES.filter(r => r.subcategory === subId).length}
            mode="compact"
          />

          <div className="space-y-6">

            {/* Recommended */}
            {showRecommended && !loading && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs font-semibold text-gray-700">Recommended for you</span>
                  <span className="text-xs text-gray-400">· {MOCK_USER_ROLE}</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 -mx-0.5 px-0.5">
                  {recommended.map(r => (
                    <div key={r.id} className="w-56 flex-shrink-0">
                      <ResourceCard resource={r} featured onWatch={openModal} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* All Resources */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">
                    {search.trim() ? `Results for "${search}"` : 'All Resources'}
                  </span>
                  {!loading && (
                    <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md tabular-nums">
                      {filtered.length}
                    </span>
                  )}
                </div>
                {hasActiveFilters && !loading && (
                  <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-orange-500 transition-colors">
                    Clear filters
                  </button>
                )}
              </div>

              {loading && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {Array.from({ length: 6 }).map((_, i) => <ResourceCardSkeleton key={i} />)}
                </div>
              )}

              {!loading && filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                    <SearchIcon className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">No resources found</p>
                  <p className="text-xs text-gray-400 mb-4">Try a different search or adjust your filters.</p>
                  <button
                    onClick={clearFilters}
                    className="px-3.5 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {!loading && filtered.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {filtered.map(r => (
                    <ResourceCard key={r.id} resource={r} onWatch={openModal} />
                  ))}
                </div>
              )}
            </section>

          </div>
        </div>
      </PageWrapper>

      {/* Video modal — rendered outside the scroll container */}
      <VideoModal resource={selectedResource} onClose={closeModal} />
    </>
  )
}
