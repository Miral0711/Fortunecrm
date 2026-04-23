import { useMemo, useState } from 'react'
import {
  FilterBar,
  ListingCard,
  MapPanel,
  PageContainer,
  PaginationBar,
  ResultsHeader,
  SplitLayout,
} from '../../components/propertyDashboard'
import type { DashboardListItem, DashboardMapItem } from '../../components/propertyDashboard'

interface Project {
  id: string
  name: string
  suburb: string
  state: string
  priceMin: number
  priceMax: number
  type: 'House and Land' | 'Duplex' | 'Apartment' | 'Land' | 'Town House'
  buildStatus: string
  rentalYield: string
  availableLots: number
  tags: string[]
  date: string
  image: string
  imgGrad: string
}

const PROJECTS: Project[] = [
  { id: '1', name: 'Harlow Estate', suburb: 'Tarneit', state: 'VIC', priceMin: 878028, priceMax: 878028, type: 'House and Land', buildStatus: 'O.T.P.', rentalYield: '3.43%', availableLots: 1, tags: ['HIGH CAPITAL GROWTH', 'SMSF'], date: '17 Apr 2026', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', imgGrad: 'from-slate-300 to-slate-400' },
  { id: '2', name: 'Hamlet Estate', suburb: 'Diggers Rest', state: 'VIC', priceMin: 871477, priceMax: 871477, type: 'House and Land', buildStatus: 'O.T.P.', rentalYield: '3.58%', availableLots: 1, tags: ['HIGH CAPITAL GROWTH', 'SMSF'], date: '17 Apr 2026', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', imgGrad: 'from-stone-300 to-stone-400' },
  { id: '3', name: 'Kinship', suburb: 'Clyde North', state: 'VIC', priceMin: 692000, priceMax: 750000, type: 'House and Land', buildStatus: 'O.T.P.', rentalYield: '3.21%', availableLots: 4, tags: ['HIGH CAPITAL GROWTH'], date: '16 Apr 2026', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', imgGrad: 'from-amber-200 to-amber-300' },
  { id: '4', name: 'Horizon Estate', suburb: 'Werribee', state: 'VIC', priceMin: 520000, priceMax: 680000, type: 'House and Land', buildStatus: 'Ready', rentalYield: '3.75%', availableLots: 12, tags: ['SMSF'], date: '15 Apr 2026', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', imgGrad: 'from-sky-200 to-sky-300' },
  { id: '5', name: 'Parkview', suburb: 'Penrith', state: 'NSW', priceMin: 710000, priceMax: 890000, type: 'Duplex', buildStatus: 'O.T.P.', rentalYield: '4.10%', availableLots: 6, tags: ['HIGH CAPITAL GROWTH'], date: '14 Apr 2026', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', imgGrad: 'from-teal-200 to-teal-300' },
  { id: '6', name: 'Coastal Sands', suburb: 'Gold Coast', state: 'QLD', priceMin: 480000, priceMax: 560000, type: 'Land', buildStatus: 'Ready', rentalYield: '-', availableLots: 22, tags: [], date: '13 Apr 2026', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', imgGrad: 'from-orange-200 to-orange-300' },
  { id: '7', name: 'Metro Quarter', suburb: 'Adelaide', state: 'SA', priceMin: 650000, priceMax: 890000, type: 'Apartment', buildStatus: 'O.T.P.', rentalYield: '4.50%', availableLots: 3, tags: ['SMSF'], date: '12 Apr 2026', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', imgGrad: 'from-indigo-200 to-indigo-300' },
  { id: '8', name: 'Greenfield Hts', suburb: 'Baldivis', state: 'WA', priceMin: 390000, priceMax: 460000, type: 'House and Land', buildStatus: 'Ready', rentalYield: '3.90%', availableLots: 8, tags: ['HIGH CAPITAL GROWTH'], date: '11 Apr 2026', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', imgGrad: 'from-green-200 to-green-300' },
  { id: '9', name: 'Ripley Central', suburb: 'Ripley', state: 'QLD', priceMin: 515000, priceMax: 620000, type: 'Town House', buildStatus: 'O.T.P.', rentalYield: '3.65%', availableLots: 5, tags: ['SMSF', 'HIGH CAPITAL GROWTH'], date: '10 Apr 2026', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80', imgGrad: 'from-rose-200 to-rose-300' },
  { id: '10', name: 'Springvale Rise', suburb: 'Cranbourne', state: 'VIC', priceMin: 598000, priceMax: 720000, type: 'House and Land', buildStatus: 'Ready', rentalYield: '3.55%', availableLots: 9, tags: ['HIGH CAPITAL GROWTH'], date: '09 Apr 2026', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', imgGrad: 'from-purple-200 to-purple-300' },
]

const TOTAL_RESULTS = 634
const TOTAL_PAGES = 64
const PER_PAGE_OPTS = ['10', '25', '50', '100']
const ORDER_OPTS = ['Default Order', 'Price: Low-High', 'Price: High-Low', 'Newest First', 'Lots Available']
const LOCATION_OPTS = ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT']

const TAG_STYLES: Record<string, string> = {
  'HIGH CAPITAL GROWTH': 'bg-orange-50 text-orange-600 ring-1 ring-orange-200',
  SMSF: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200',
}

const TYPE_DOT: Record<string, string> = {
  'House and Land': 'bg-orange-400',
  Duplex: 'bg-amber-400',
  'Town House': 'bg-teal-400',
  Apartment: 'bg-blue-400',
  Land: 'bg-green-400',
}

function formatPriceRange(min: number, max: number) {
  const formattedMin = `$${min.toLocaleString()}`
  return min === max ? formattedMin : `${formattedMin} - $${max.toLocaleString()}`
}

function getVisiblePages(totalPages: number): Array<number | '...'> {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', totalPages - 1, totalPages]
}

export default function ProjectsDashboardPage() {
  const [location, setLocation] = useState('')
  const [radiusEnabled, setRadiusEnabled] = useState(true)
  const [priceEnabled, setPriceEnabled] = useState(false)
  const [radius, setRadius] = useState(33)
  const [priceMin] = useState(515000)
  const [priceMax, setPriceMax] = useState(5600000)
  const [activeTags, setActiveTags] = useState<string[]>(['Listed'])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState('10')
  const [order, setOrder] = useState('Default Order')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      PROJECTS.filter((project) => {
        if (location && project.state !== location) return false
        if (search) {
          const query = search.toLowerCase()
          return project.name.toLowerCase().includes(query) || project.suburb.toLowerCase().includes(query)
        }
        return true
      }),
    [location, search],
  )

  const paged = filtered.slice((page - 1) * Number(perPage), page * Number(perPage))

  const cards: DashboardListItem[] = paged.map((project) => ({
    id: project.id,
    name: project.name,
    suburb: project.suburb,
    state: project.state,
    priceLabel: formatPriceRange(project.priceMin, project.priceMax),
    type: project.type,
    buildStatus: project.buildStatus,
    rentalYield: project.rentalYield,
    availableLots: project.availableLots,
    tags: project.tags,
    date: project.date,
    image: project.image,
    imgGrad: project.imgGrad,
  }))

  const mapItems: DashboardMapItem[] = paged.map((project) => ({
    id: project.id,
    name: project.name,
    suburb: project.suburb,
    state: project.state,
    priceLabel: formatPriceRange(project.priceMin, project.priceMax),
  }))

  const startResult = (page - 1) * Number(perPage) + 1
  const endResult = Math.min(page * Number(perPage), TOTAL_RESULTS)

  const clearAll = () => {
    setLocation('')
    setRadius(33)
    setPriceMax(5600000)
    setActiveTags(['Listed'])
    setSearch('')
  }

  return (
    <PageContainer>
      <div className="flex h-full min-h-0 flex-col gap-2.5">
      <FilterBar
        location={location}
        onLocationChange={setLocation}
        search={search}
        onSearchChange={setSearch}
        radiusEnabled={radiusEnabled}
        onRadiusEnabledChange={() => setRadiusEnabled((value) => !value)}
        radius={radius}
        onRadiusChange={setRadius}
        priceEnabled={priceEnabled}
        onPriceEnabledChange={() => setPriceEnabled((value) => !value)}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMaxChange={setPriceMax}
        activeTags={activeTags}
        onRemoveTag={(tag) => setActiveTags((prev) => prev.filter((value) => value !== tag))}
        onClear={clearAll}
        searchPlaceholder="Project, suburb..."
        locationOptions={LOCATION_OPTS}
      />

      <div className="min-h-0 flex-1">
        <SplitLayout
          listHeader={
            <ResultsHeader
              totalResults={TOTAL_RESULTS}
              startResult={startResult}
              endResult={endResult}
              perPage={perPage}
              onPerPageChange={(value) => {
                setPerPage(value)
                setPage(1)
              }}
              order={order}
              onOrderChange={setOrder}
              perPageOptions={PER_PAGE_OPTS}
              orderOptions={ORDER_OPTS}
              view={view}
              onViewChange={setView}
            />
          }
          listContent={
            <div className="space-y-4">
              {cards.map((card) => (
                <ListingCard
                  key={card.id}
                  item={card}
                  selected={selectedId === card.id}
                  onSelect={() => setSelectedId((current) => (current === card.id ? null : card.id))}
                  typeDotClass={TYPE_DOT[card.type] ?? 'bg-gray-400'}
                  tagStyles={TAG_STYLES}
                />
              ))}
            </div>
          }
          listFooter={
            <PaginationBar
              page={page}
              totalPages={TOTAL_PAGES}
              pages={getVisiblePages(TOTAL_PAGES)}
              onPageChange={setPage}
            />
          }
          mapContent={<MapPanel items={mapItems} />}
        />
      </div>
      </div>
    </PageContainer>
  )
}
