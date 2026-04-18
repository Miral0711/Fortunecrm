import { useState } from 'react'
import { Plus, MoreVertical, ChevronLeft, ChevronRight, FileText, Search } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Brochure {
  id: string
  title: string
  lot: string
  type: 'House and Land' | 'Duplex' | 'Town House Unit' | 'Apartment' | 'Land'
  color: string   // accent band color
  imgBg: string   // tailwind bg for placeholder
}

// ── Data ──────────────────────────────────────────────────────────────────────

const TYPE_COLORS: Record<Brochure['type'], string> = {
  'House and Land':  'bg-orange-500',
  'Duplex':          'bg-amber-400',
  'Town House Unit': 'bg-teal-500',
  'Apartment':       'bg-blue-500',
  'Land':            'bg-green-500',
}

const IMG_BIGS = [
  'from-slate-300 to-slate-400',
  'from-amber-200 to-amber-300',
  'from-sky-200 to-sky-300',
  'from-stone-200 to-stone-300',
  'from-orange-200 to-orange-300',
  'from-teal-200 to-teal-300',
  'from-indigo-200 to-indigo-300',
  'from-rose-200 to-rose-300',
]

const RAW: Omit<Brochure, 'color' | 'imgBg'>[] = [
  { id: '1',  title: 'Voltaire Estate',                  lot: 'Lot: 37',        type: 'House and Land'  },
  { id: '2',  title: 'Slacks Street',                    lot: 'Lot: 8 Unit 2',  type: 'Duplex'          },
  { id: '3',  title: 'Whiterock',                        lot: 'Lot: 2231',      type: 'House and Land'  },
  { id: '4',  title: 'Ripley Central Residences – Investor', lot: 'Lot: 18',   type: 'Town House Unit' },
  { id: '5',  title: 'Slacks Street',                    lot: 'Lot: 8 Unit 2',  type: 'Duplex'          },
  { id: '6',  title: 'Slacks Street',                    lot: 'Lot: 8 Unit 2',  type: 'Duplex'          },
  { id: '7',  title: 'The Springs Estate',               lot: 'Lot: 175',       type: 'House and Land'  },
  { id: '8',  title: 'Parkview',                         lot: 'Lot: 26',        type: 'Town House Unit' },
  { id: '9',  title: 'Greenfield Heights',               lot: 'Lot: 42',        type: 'House and Land'  },
  { id: '10', title: 'Coastal Sands',                    lot: 'Lot: 7',         type: 'Land'            },
  { id: '11', title: 'Metro Quarter',                    lot: 'Lot: 3B',        type: 'Apartment'       },
  { id: '12', title: 'Horizon Estate',                   lot: 'Lot: 91',        type: 'House and Land'  },
]

const BROCHURES: Brochure[] = RAW.map((r, i) => ({
  ...r,
  color: TYPE_COLORS[r.type],
  imgBg: IMG_BIGS[i % IMG_BIGS.length],
}))

const TOTAL_PAGES = 1297
const PER_PAGE    = 8

// ── Brochure card ─────────────────────────────────────────────────────────────

function BrochureCard({ b }: { b: Brochure }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <div className={`relative h-44 bg-gradient-to-br ${b.imgBg} flex flex-col justify-end overflow-hidden`}>
        {/* Simulated brochure preview */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <FileText className="w-16 h-16 text-gray-600" />
        </div>
        {/* House illustration placeholder */}
        <div className="absolute inset-0 flex items-end justify-center pb-6">
          <div className="w-28 h-16 bg-white/30 rounded-t-xl backdrop-blur-sm flex items-center justify-center">
            <div className="w-20 h-10 bg-white/40 rounded-t-lg" />
          </div>
        </div>
        {/* Type band */}
        <div className={`relative z-10 px-3 py-1.5 ${b.color}`}>
          <span className="text-[10px] font-semibold text-white uppercase tracking-wide">{b.type}</span>
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate">{b.title}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{b.lot}</p>
        </div>
        <div className="relative shrink-0 ml-2">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
              {['Preview', 'Download', 'Edit', 'Delete'].map(action => (
                <button
                  key={action}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                    action === 'Delete'
                      ? 'text-red-500 hover:bg-red-50'
                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const pages: (number | '...')[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '...', total - 1, total]

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e-${i}`} className="w-7 h-7 flex items-center justify-center text-xs text-gray-400">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
              page === p ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BrochuresPage() {
  const [page,   setPage]   = useState(1)
  const [search, setSearch] = useState('')

  const filtered = BROCHURES.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.lot.toLowerCase().includes(search.toLowerCase())
  )

  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="space-y-5">
      <PageHeader
        title="Brochures"
        breadcrumbs={[{ label: 'Marketing Tools' }, { label: 'Brochures' }]}
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Brochure
          </button>
        }
      />

      {/* Search bar */}
      <div className="relative w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search brochures..."
          className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 placeholder:text-gray-400"
        />
      </div>

      {/* Grid */}
      {paged.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-20 text-center">
          <p className="text-sm text-gray-400">No brochures match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {paged.map(b => <BrochureCard key={b.id} b={b} />)}
        </div>
      )}

      {/* Pagination */}
      <Pagination page={page} total={TOTAL_PAGES} onChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
    </div>
  )
}
