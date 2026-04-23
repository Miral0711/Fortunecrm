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

interface Lot {
  id: string
  name: string
  suburb: string
  state: string
  price: number
  type: 'House and Land' | 'Duplex' | 'Apartment' | 'Land' | 'Town House'
  buildStatus: 'O.T.P.' | 'Ready'
  availableLots: number
  rentalYield: string
  tags: string[]
  date: string
  image: string
  imgGrad: string
}

const LOTS: Lot[] = [
  { id: '1', name: 'Harlow Estate - 741', suburb: 'Tarneit', state: 'VIC', price: 878028, type: 'House and Land', buildStatus: 'O.T.P.', availableLots: 1, rentalYield: '3.43%', tags: ['HIGH CAPITAL GROWTH', 'SMSF'], date: '17 Apr 2026', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80', imgGrad: 'from-slate-300 to-slate-400' },
  { id: '2', name: 'Hamlet Estate - 39', suburb: 'Diggers Rest', state: 'VIC', price: 871477, type: 'House and Land', buildStatus: 'O.T.P.', availableLots: 1, rentalYield: '3.58%', tags: ['HIGH CAPITAL GROWTH', 'SMSF'], date: '17 Apr 2026', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', imgGrad: 'from-stone-300 to-stone-400' },
  { id: '3', name: 'Kinship - 135', suburb: 'Tarneit', state: 'VIC', price: 867145, type: 'House and Land', buildStatus: 'O.T.P.', availableLots: 4, rentalYield: '3.21%', tags: ['HIGH CAPITAL GROWTH'], date: '16 Apr 2026', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', imgGrad: 'from-amber-200 to-amber-300' },
  { id: '4', name: 'Horizon Estate - 22', suburb: 'Werribee', state: 'VIC', price: 720000, type: 'House and Land', buildStatus: 'Ready', availableLots: 12, rentalYield: '3.75%', tags: ['SMSF'], date: '15 Apr 2026', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', imgGrad: 'from-sky-200 to-sky-300' },
  { id: '5', name: 'Parkview - 26', suburb: 'Penrith', state: 'NSW', price: 810000, type: 'Duplex', buildStatus: 'O.T.P.', availableLots: 6, rentalYield: '4.10%', tags: ['HIGH CAPITAL GROWTH'], date: '14 Apr 2026', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80', imgGrad: 'from-teal-200 to-teal-300' },
  { id: '6', name: 'Coastal Sands - 8', suburb: 'Gold Coast', state: 'QLD', price: 515000, type: 'Land', buildStatus: 'Ready', availableLots: 22, rentalYield: '-', tags: [], date: '13 Apr 2026', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', imgGrad: 'from-orange-200 to-orange-300' },
  { id: '7', name: 'Metro Quarter - 14', suburb: 'Adelaide', state: 'SA', price: 680000, type: 'Apartment', buildStatus: 'O.T.P.', availableLots: 3, rentalYield: '4.50%', tags: ['SMSF'], date: '12 Apr 2026', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', imgGrad: 'from-indigo-200 to-indigo-300' },
  { id: '8', name: 'Greenfield Hts - 5', suburb: 'Baldivis', state: 'WA', price: 420000, type: 'House and Land', buildStatus: 'Ready', availableLots: 8, rentalYield: '3.90%', tags: ['HIGH CAPITAL GROWTH'], date: '11 Apr 2026', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80', imgGrad: 'from-green-200 to-green-300' },
  { id: '9', name: 'Ripley Central - 18', suburb: 'Ripley', state: 'QLD', price: 525000, type: 'Town House', buildStatus: 'O.T.P.', availableLots: 5, rentalYield: '3.65%', tags: ['SMSF', 'HIGH CAPITAL GROWTH'], date: '10 Apr 2026', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80', imgGrad: 'from-rose-200 to-rose-300' },
  { id: '10', name: 'Springvale Rise - 44', suburb: 'Cranbourne', state: 'VIC', price: 610000, type: 'House and Land', buildStatus: 'Ready', availableLots: 9, rentalYield: '3.55%', tags: ['HIGH CAPITAL GROWTH'], date: '09 Apr 2026', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', imgGrad: 'from-purple-200 to-purple-300' },
]

const TOTAL_RESULTS = 7432
const TOTAL_PAGES = 744
const PER_PAGE_OPTS = ['10', '25', '50', '100']
const ORDER_OPTS = ['Default Order', 'Price: Low-High', 'Price: High-Low', 'Newest First', 'Status']
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

function getVisiblePages(totalPages: number): Array<number | '...'> {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', totalPages - 1, totalPages]
}

export default function LotsDashboardPage() {
  const [location, setLocation] = useState('')
  const [radiusEnabled, setRadiusEnabled] = useState(true)
  const [priceEnabled, setPriceEnabled] = useState(false)
  const [radius, setRadius] = useState(20)
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
      LOTS.filter((lot) => {
        if (location && lot.state !== location) return false
        if (search) {
          const query = search.toLowerCase()
          return lot.name.toLowerCase().includes(query) || lot.suburb.toLowerCase().includes(query)
        }
        return true
      }),
    [location, search],
  )

  const paged = filtered.slice((page - 1) * Number(perPage), page * Number(perPage))

  const cards: DashboardListItem[] = paged.map((lot) => ({
    id: lot.id,
    name: lot.name,
    suburb: lot.suburb,
    state: lot.state,
    priceLabel: `$${lot.price.toLocaleString()}`,
    type: lot.type,
    buildStatus: lot.buildStatus,
    rentalYield: lot.rentalYield,
    availableLots: lot.availableLots,
    tags: lot.tags,
    date: lot.date,
    image: lot.image,
    imgGrad: lot.imgGrad,
  }))

  const mapItems: DashboardMapItem[] = paged.map((lot) => ({
    id: lot.id,
    name: lot.name,
    suburb: lot.suburb,
    state: lot.state,
    priceLabel: `$${lot.price.toLocaleString()}`,
  }))

  const startResult = (page - 1) * Number(perPage) + 1
  const endResult = Math.min(page * Number(perPage), TOTAL_RESULTS)

  const clearAll = () => {
    setLocation('')
    setRadius(20)
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
